const defaultTab: App.Tab = { title: 'dashboard', fullPath: '/' }

export default defineStore({
  id: 'app',
  persist: {
    // 开启持久化
    enabled: true,
  },
  state: () => {
    return {
      isCollapse: false,
      tabs: [defaultTab],
    }
  },
  actions: {
    updateCollapse() {
      this.isCollapse = !this.isCollapse
    },
    addTab(tab: App.Tab = defaultTab) {
      if (this.tabs.some((t) => t.fullPath === tab.fullPath)) return
      this.tabs.push(tab)
    },
    removeTab(fullPath: string) {
      this.tabs = this.tabs.filter((t) => t.fullPath !== fullPath)
      if (this.tabs.length === 0) {
        this.addTab()
      }
    },
    removeOtherTab(fullPath: string) {
      this.tabs = this.tabs.filter((t) => t.fullPath === fullPath)
    },
    removeRightTab(fullPath: string) {
      const index = this.tabs.findIndex((i) => i.fullPath === fullPath)
      this.tabs = this.tabs.slice(0, index + 1)
    },
    removeAllTab() {
      this.tabs = [defaultTab]
    },
  },
})
