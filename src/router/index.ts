import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/utils/router'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import { toLogin } from '@/link'
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (to.path === '/login') return toLogin()
  // const { path, query } = to
  // if (query.token) {
  //   sessionStorage.setItem('gys-token', query.token as string)
  //   delete query.token
  //   return next({ path, query })
  // }
  // const token = sessionStorage.getItem('gys-token')
  // if (!token) return next('/login')
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
