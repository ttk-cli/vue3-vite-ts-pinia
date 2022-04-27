import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    isLoading?: boolean
    [propName: string]: any
  }
}
