import type { AxiosRequestConfig } from 'axios'
import Axios from 'axios'

import { stringify } from './shared'
import { API_BASE_URL } from '@/config/app'
import { getCommonParams } from '@/config/commonParams'
import { loadingClose, loadingShow } from '@/config/serviceLoading'

const axios = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

const methods = ['get', 'post'] as const
const MAX_RETRIES = 3 // 最大重试次数

methods.forEach(
  (method) =>
    (axios[method] = (url: string, params: any = {}) => {
      const { isLoading = false, isHideError = false, retries = 0, ...otherParams } = params
      const fullParams = { ...getCommonParams(), ...otherParams }
      const axiosOptions: AxiosRequestConfig = {
        method,
        url,
      }
      if (method === 'get') {
        axiosOptions.params = fullParams
      } else {
        axiosOptions.data = stringify(fullParams)
      }

      return new Promise<any>((resolve) => {
        if (isLoading) loadingShow()
        axios(axiosOptions)
          .then(({ data }) => {
            const { fedLogout } = useStore('user')
            switch (data.errno) {
              case 0:
                resolve(data)
                break
              case 1000:
                !isHideError && ElMessage.error(`${data.msg}`)
                fedLogout()
                resolve(null)
                break

              default:
                !isHideError && ElMessage.error(`${data.msg}`)
                resolve(null)
                break
            }
          })
          .catch(async (error: any) => {
            // 只对网络原因失败重试
            if (retries > 0) {
              resolve(
                await axios[method](url, {
                  ...params,
                  retries: Math.min(retries - 1, MAX_RETRIES),
                }),
              )
              return
            }
            if (error.response && error.response.data) {
              const msg = error.response.data.message
              !isHideError && ElMessage.error(`${msg}`)
            } else {
              !isHideError && ElMessage.error('服务器连接超时')
            }
            resolve(null)
          })
          .finally(() => {
            if (isLoading) loadingClose()
          })
      })
    }),
)
export default axios
