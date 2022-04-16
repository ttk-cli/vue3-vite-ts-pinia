import meta from '../pages.json'
import { RouteRecordRaw } from 'vue-router'

type MetaType = keyof typeof meta
type ModulesType = keyof typeof modules

const modules = {
  pages: import.meta.globEager('../pages/**/index.vue'),
  views: import.meta.globEager('../views/**/index.vue'),
}

const arr: string[] = []
function setRoute(path: ModulesType, routes: Array<RouteRecordRaw> = []): RouteRecordRaw[] {
  const files = modules[path]
  for (const key in files) {
    const name = key.slice(9, -10)
    const pRoute = arr.find((i) => name.startsWith(i))
    const obj = {
      path: getPath(name),
      name: getName(name),
      component: files[key].default,
      children: [] as RouteRecordRaw[],
      meta: meta[getName(name)],
    }
    if (!pRoute) {
      if (!name) obj.children = setRoute('views')
      routes.push(obj)
    } else {
      const parent = routes.find((i) => i.name === pRoute) as RouteRecordRaw
      parent?.children?.push(obj)
    }
    arr.push(name)
  }
  return routes
}

function getName(name: string) {
  const i = name.lastIndexOf('/')
  return (i === -1 ? name : name.slice(i + 1)) as MetaType
}

function getPath(name: string) {
  let path
  switch (name) {
    case 'dashboard':
      path = '/'
      break
    case 'notFound':
      path = '/:pathMatch(.*)*'
      break

    default:
      path = '/' + name
      break
  }
  const i = path.lastIndexOf('/')
  return i === 0 ? path : path.slice(i)
}

const routes = setRoute('pages')

export default routes
