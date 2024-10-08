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
    }
  },
  getters: {
    logged: ({ userInfo }) => !!userInfo.token,
  },
  actions: {
    setUserInfo(userInfo: User.UserInfo) {
      this.userInfo = userInfo
    },
    // 后端退出
    async logout() {
      // await apiUser.logout()
      this.fedLogout()
    },
    // 前端退出
    fedLogout() {
      this.setUserInfo({
        name: '',
        token: '',
      })
      location.href = '/login'
    },
  },
})
