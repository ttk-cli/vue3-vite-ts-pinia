import Axios, { AxiosRequestConfig } from 'axios'

import { API_BASE_URL } from '@/config/app'
import { getCommonParams } from '@/config/commonParams'
import { loadingClose, loadingShow } from '@/config/serviceLoading'

import { stringify } from './shared'

const axios = Axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // 请求超时 20s
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

type Method = 'get' | 'post'
const methods: Method[] = ['get', 'post']

methods.forEach(
  (method: Method) =>
    (axios[method] = (url: string, params: any = {}) => {
      const { isLoading, ...otherParams } = params
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
        if (fullParams.isLoading) loadingShow()
        axios(axiosOptions)
          .then(({ data }) => {
            const { fedLogout } = useStore('user')
            switch (data.errno) {
              case 0:
                resolve(data)
                break
              case 1000:
                ElMessage.error(`${data.msg}`)
                fedLogout()
                resolve(null)
                break

              default:
                ElMessage.error(`${data.msg}`)
                resolve(null)
                break
            }
          })
          .catch((error: any) => {
            if (error.response && error.response.data) {
              const msg = error.response.data.message
              ElMessage.error(`${msg}`)
            } else {
              ElMessage.error('服务器连接超时')
            }
            resolve(null)
          })
          .finally(() => {
            if (fullParams.isLoading) loadingClose()
          })
      })
    })
)
export default axios
