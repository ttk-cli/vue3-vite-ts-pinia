declare namespace Types {
  type Query = {
    replace?: boolean
    [propName: string]: any
  }
}

declare namespace User {
  type UserInfo = {
    name: string
    token: string
  }
}
