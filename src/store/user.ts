export default defineStore({
  id: 'user',
  persist: {
    // 开启持久化
    enabled: true,
  },
  state: () => {
    return {
      userInfo: {
        name: '',
        token: '',
      },
    } as {
      userInfo: User.UserInfo
    }
  },
  getters: {
    logged: ({ userInfo }) => !!userInfo.token,
  },
  actions: {
    async setUserInfo(userInfo: User.UserInfo) {
      Object.assign(this.userInfo, userInfo)
    },
    //后端退出
    async logout() {
      // await apiUser.logout()
      this.fedLogout()
    },
    //前端退出
    fedLogout() {
      this.setUserInfo({
        name: '',
        token: '',
      })
      location.href = '/login'
    },
  },
})
