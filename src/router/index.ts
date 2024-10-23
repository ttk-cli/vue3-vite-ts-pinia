import 'nprogress/nprogress.css'

import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'

import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})

router.beforeEach((to, _from, next) => {
  NProgress.start()
  if (to.path === '/login') return next()
  const { logged } = useStore('user')
  if (!logged.value) return next('/login')
  const { addTab } = useStore('app')
  if (to.meta.title) {
    const tab = { title: to.meta.title, name: to.name } as App.Tab
    addTab(tab)
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
