export default defineStore({
  id: 'test',
  persist: {
    // 开启持久化
    enabled: true,
  },
  state: () => {
    return {
      name: '张三',
      token: 'token...',
    }
  },
  getters: {
    fullName: ({ name }) => {
      return name + '丰'
    },
  },
  actions: {
    updateName(name: string) {
      this.name = name
    },
  },
})
