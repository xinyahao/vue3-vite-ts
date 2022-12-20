import axios, { AxiosRequestConfig } from 'axios'
import { RequestType } from './../types/axios'

// Cancel repeat requests
const request: Array<RequestType> = []
const CancelToken = axios.CancelToken

// axios
const Axios = axios.create({
  timeout: 15000, // set Timeout 15s,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  baseURL: `${process.env.API_ROOT}`
})

// Remove repeat requests
const removeRepeatRequest = (config: AxiosRequestConfig) => {
  for (const key in request) {
    const item: number = +key
    const list: RequestType = request[key]
    // The request already exists
    if (
      list.url === config.url &&
      list.method === config.method &&
      JSON.stringify(list.params) === JSON.stringify(config.params) &&
      JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      list.cancel('The operation is too frequent, please try again later')
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
    // // Request to carry tokens
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
  switch (status) {
    case 400:
      message = 'Bad Request'
      break
    case 401:
      message = 'Unauthorized, please log in again'
      break
    case 403:
      message = '403 Forbidden'
      break
    case 404:
      message = '404 not found'
      break
    case 405:
      message = 'Method Not Allowed'
      break
    case 408:
      message = 'Request Timeout'
      break
    case 500:
      message = 'Server Error'
      break
    case 501:
      message = 'Not Implemented'
      break
    case 502:
      message = 'Network error'
      break
    case 503:
      message = 'Service Unavailable'
      break
    case 504:
      message = 'Network timeout'
      break
    case 505:
      message = 'HTTP Version Not Supported'
      break
    default:
      message = `Unknown error${status}`
  }
  return message
}

export default Axios
