import 'nprogress/nprogress.css'

// 进度条
import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

import routes from '@/utils/router'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') return next()
  const { logged } = useStore('user')
  if (!logged.value) return next('/login')
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
