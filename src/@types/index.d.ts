declare namespace App {
  type Tab = {
    title: string
    name: string
  }
  type Tabs = Tab[]
}
declare namespace User {
  type UserInfo = {
    name: string
    token: string
  }
}

declare namespace Axios {
  type RequestConfig = AxiosRequestConfig<any> & {
    myParams: any
  }
}
