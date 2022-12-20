export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface RequestType {
  url?: string
  method?: Method | string
  params: any
  data: any
  cancel: Function
}
export interface AxiosRequest {
  baseURL?: string
  url: string
  params?: any
  method?: Method | string
  headers?: any
}

export interface AxiosResponse {
  data: any
  headers: any
  request?: any
  status: number
  statusText: string
  config: AxiosRequest
}

export interface CustomResponse {
  readonly status: boolean | number | string
  readonly message: string
  data: any
}
