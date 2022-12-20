import axios, { AxiosRequestConfig, Method } from 'axios'

// 定义接口
interface RequestType {
  url?: string
  method?: Method | string
  params: any
  data: any
  cancel: Function
}

// 取消重复请求
const request: Array<RequestType> = []
const CancelToken = axios.CancelToken

// axios 实例
const Axios = axios.create({
  timeout: 15000, // 设置超时时间 15s,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  baseURL: `${process.env.API_ROOT}`
})

// 移除重复请求
const removeRepeatRequest = (config: AxiosRequestConfig) => {
  for (const key in request) {
    const item: number = +key
    const list: RequestType = request[key]
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      request.splice(item, 1)
    }
  }
}

// 添加请求拦截器
Axios.interceptors.request.use(
  (config) => {
    removeRepeatRequest(config)
    config.cancelToken = new CancelToken((c) => {
      request.push({
        url: config.url,
        method: config.method,
        params: config.params,
        data: config.data,
        cancel: c
      })
    })
    // // 请求携带token
    // const token = localStorage.getItem('id_token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    //   config.headers['X-CSRF'] = token
    // } else {
    //   delete config.headers.Authorization
    //   delete config.headers['X-CSRF']
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  (res) => {
    removeRepeatRequest(res.config)
    return res
  },
  (error) => {
    console.log('[Axios.Reject] : ', error)
    if (error.response?.status) {
      if (error.response?.status === 401) {
        // TODO: if you need some api request to backend server, pls call logout api
      }
      const message = errorCode(error.response?.status)
      if (message) console.error(message)
      return error.response
    }
    return Promise.reject(error)
  }
)

const errorCode = (status: number): string => {
  let message = ''
  // 状态码判断
  switch (status) {
    case 400:
      message = '错误请求'
      break
    case 401:
      message = '未授权，请重新登录'
      break
    case 403:
      message = '拒绝访问'
      break
    case 404:
      message = '请求错误,未找到该资源'
      break
    case 405:
      message = '请求方法未允许'
      break
    case 408:
      message = '请求超时'
      break
    case 500:
      message = '服务器端出错'
      break
    case 501:
      message = '网络未实现'
      break
    case 502:
      message = '网络错误'
      break
    case 503:
      message = '服务不可用'
      break
    case 504:
      message = '网络超时'
      break
    case 505:
      message = 'http版本不支持该请求'
      break
    default:
      message = `未知错误${status}`
  }
  return message
}

export default Axios
