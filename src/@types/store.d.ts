declare interface App {
  isCollapse: boolean
  tabs: Tab[]
}
declare namespace App {
  interface Tab {
    title: string
    name: string
  }
}

declare interface User {
  userInfo: UserInfo
}
declare namespace User {
  interface UserInfo {
    name: string
    token: string
  }
}

declare interface Test {
  name: string
  token: string
}
