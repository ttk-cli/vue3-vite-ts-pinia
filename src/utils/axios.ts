import Axios from 'axios'
import env from '@/config/env'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { commonParams } from '@/config/commonParams'
import { stringify } from './shared'
import { useUserStore } from '@/store/user'
import { loadingClose, loadingShow } from '@/config/serviceLoading'

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
    const { myparams } = config
    if (myparams.isLoading) loadingShow()
    delete myparams.isLoading
    if (config.method === 'get') {
      config.params = myparams
    } else {
      config.data = stringify(myparams)
    }
    delete config.myparams
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
    const userStore = useUserStore()
    switch (data.errno) {
      case 0:
        return data
      case 1000:
        ElMessage.error(`${data.msg}`)
        return userStore.fedLogout()

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
    (axios[method] = (url: string, myparams: any = {}) => {
      Object.assign(myparams, commonParams)
      const axiosOpts = {
        method,
        myparams,
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
