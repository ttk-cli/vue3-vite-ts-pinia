import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  persist: {
    // 开启持久化
    enabled: true,
  },
  state: () => {
    return {
      isCollapse: false,
    }
  },
  actions: {
    updateCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
})
