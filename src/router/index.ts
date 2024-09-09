import 'nprogress/nprogress.css'

import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'

import routes from '~pages'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue'),
    },
    {
      path: '/',
      name: 'index',
      redirect: '/dashboard',
      component: () => import('../pages/index.vue'),
      children: [
        ...routes,
        { path: '/404', name: '404', component: () => import('../pages/404.vue') },
        { path: '/:catchAll(.*)', redirect: '/404' },
      ],
    },
  ],
})

router.beforeEach((to, _from, next) => {
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
