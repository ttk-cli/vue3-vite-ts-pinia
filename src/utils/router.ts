import type { RouteRecordRaw } from 'vue-router'

// import meta from '../pages.json'
// import { isValidKey } from './shared'

// type ViewsType = keyof typeof modules.views

// const modules = {
//   pages: import.meta.globEager('../pages/**/index.vue'),
//   views: import.meta.globEager('../views/**/index.vue'),
// }

// function setPages() {
//   const files = modules.pages
//   for (const key in files) {
//     const name = (key.match(/(?<=^.*\/pages\/)\S*(?=\/index.vue)/) || [''])[0]
//     const route: RouteRecordRaw = {
//       path: getPath(name),
//       name,
//       component: files[key].default,
//     }
//     if (name === '') {
//       route.children = setViews()
//     }
//     routes.push(route)
//   }
// }

// function setViews() {
//   const files = modules.views
//   const filePaths = Object.keys(files)
//   const views = []
//   for (const name in meta) {
//     if (isValidKey(meta, name)) {
//       const filePath = filePaths.find((path) => path.includes(name)) as ViewsType
//       const route: RouteRecordRaw = {
//         path: getPath(name),
//         name,
//         component: files[filePath].default,
//         meta: meta[name],
//       }
//       views.push(route)
//     }
//   }
//   return views
// }

// function getPath(name: string) {
//   let path
//   switch (name) {
//     case 'dashboard':
//       path = '/'
//       break
//     case 'notFound':
//       path = '/:pathMatch(.*)*'
//       break

//     default:
//       path = `/${name}`
//       break
//   }
//   return path
// }

const routes: RouteRecordRaw[] = []
// setPages()

export default routes
