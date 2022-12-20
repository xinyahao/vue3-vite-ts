import { CustomResponse } from '@/types/axios'
import HttpRequest from '@/utils/http'

const URL_USER_LINK = ''

type checkUserType = {
  username: string
}

export const checkUser = (params: checkUserType): Promise<CustomResponse> => {
  return HttpRequest.postReq({ params, url: URL_USER_LINK })
}
