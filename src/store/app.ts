const defaultTab: App.Tab = { title: '控制台', name: '/' }

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
      if (this.tabs.some((t) => t.name === tab.name)) return
      this.tabs.push(tab)
    },
    removeTab(name: string) {
      this.tabs = this.tabs.filter((t) => t.name !== name)
      if (this.tabs.length === 0) {
        this.addTab()
      }
    },
    removeOtherTab(name: string) {
      this.tabs = this.tabs.filter((t) => t.name === name)
    },
    removeRightTab(name: string) {
      const index = this.tabs.findIndex((i) => i.name === name)
      this.tabs = this.tabs.slice(0, index + 1)
    },
    removeAllTab() {
      this.tabs = [defaultTab]
    },
  },
})
