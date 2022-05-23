import 'element-plus/es/components/message/style/css'

import Axios from 'axios'
import { ElMessage } from 'element-plus'

import { getCommonParams } from '@/config/commonParams'
import env from '@/config/env'
import { loadingClose, loadingShow } from '@/config/serviceLoading'

import { stringify } from './shared'

const axios = Axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20000, // 请求超时 20s
  responseType: 'json',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (config) => {
    const { fullParams } = config
    if (fullParams.isLoading) loadingShow()
    delete fullParams.isLoading
    if (config.method === 'get') {
      config.params = fullParams
    } else {
      config.data = stringify(fullParams)
    }
    delete config.fullParams
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  ({ data }) => {
    loadingClose()
    const { fedLogout } = useStore('user')
    switch (data.errno) {
      case 0:
        return data
      case 1000:
        ElMessage.error(`${data.msg}`)
        return fedLogout()

      default:
        ElMessage.error(`${data.msg}`)
        break
    }
  },
  (error: { response: { data: { message: any } } }) => {
    loadingClose()
    if (error.response && error.response.data) {
      const msg = error.response.data.message
      ElMessage.error(`${msg}`)
    } else {
      ElMessage.error('服务器连接超时')
    }
    return Promise.reject(error)
  }
)

type Method = 'get' | 'post'
const methods: Method[] = ['get', 'post']

methods.forEach(
  (method: Method) =>
    (axios[method] = (url: string, params: any = {}) => {
      const fullParams = { ...getCommonParams(), ...params }
      const axiosOpts = {
        method,
        fullParams,
        url,
      }
      return new Promise<any>((resolve, reject) => {
        axios(axiosOpts)
          .then((res: any) => {
            return resolve(res)
          })
          .catch((err: any) => {
            console.log(err)
          })
      })
    })
)
export default axios
