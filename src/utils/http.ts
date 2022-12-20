import Axios from './axios'
import { AxiosRequest, CustomResponse } from '@/types/axios'

class HttpRequest {
  /**
   * get请求
   * @param params  参数
   * @param url   请求地址
   */

  private apiAxios({
    params,
    url,
    method
  }: AxiosRequest): Promise<CustomResponse> {
    const m: string = method.toLowerCase()
    if (m === 'get') {
      return new Promise((resolve, reject) => {
        Axios.get(url, { params })
          .then((res: any) => {
            this.resultCode(res, resolve)
          })
          .catch((err: any) => {
            reject(err.message)
          })
      })
    }
    if (m !== 'delete') {
      return new Promise((resolve, reject) => {
        Axios[m](url, params)
          .then((res: any) => {
            this.resultCode(res, resolve)
          })
          .catch((err: any) => {
            reject(err.message)
          })
      })
    }
    return new Promise((resolve, reject) => {
      Axios.delete(url, {
        data: params
      })
        .then((res: any) => {
          this.resultCode(res, resolve)
        })
        .catch((err: any) => {
          reject(err.message)
        })
    })
  }

  /**
   * GET类型的网络请求
   */
  public getReq({ headers, url, params }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'GET', url, params })
  }

  /**
   * POST类型的网络请求
   */
  public postReq({ headers, url, params }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'POST', url, params })
  }

  /**
   * PUT类型的网络请求
   */
  public putReq({ headers, url, params }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'PUT', url, params })
  }

  /**
   * DELETE类型的网络请求
   */
  public deleteReq({ headers, url, params }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'DELETE', url, params })
  }

  /**
   * PATCH类型的网络请求
   */
  public patchReq({ headers, url, params }: AxiosRequest) {
    return this.apiAxios({ headers, method: 'PATCH', url, params })
  }

  /**
   *
   * @param res
   * @param resolve
   */
  public resultCode(res: any, resolve: any) {
    if (res.status > 0) {
      resolve(res.data)
    } else {
      this.errorCode(res)
    }
  }

  /**
   * 服务端状态处理
   * @param res
   */
  public errorCode(res: any) {
    // 状态码判断
    switch (res.status) {
      case 1001:
        break
      case 1002:
        break
      default:
    }
  }
}
export default new HttpRequest()
