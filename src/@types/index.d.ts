declare namespace App {
  type tab = {
    title: string
    name: string
  }
  type Tabs = tab[]
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
