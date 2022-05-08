import piniaPluginPersist from 'pinia-plugin-persist'
import userStore from './user'
import testStore from './test'
import appStore from './app'

const storeExports = {
  app: useAppStroe,
  user: useUserStroe,
  test: useTestStroe,
}

function useAppStroe() {
  const store = appStore()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs }
}

function useUserStroe() {
  const store = userStore()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs }
}

function useTestStroe() {
  const store = testStore()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs }
}

// @ts-ignore
export function useStore(storeName: 'app'): ReturnType<typeof useAppStroe>
// eslint-disable-next-line no-redeclare
export function useStore(storeName: 'user'): ReturnType<typeof useUserStroe>
// eslint-disable-next-line no-redeclare
export function useStore(storeName: 'test'): ReturnType<typeof useTestStroe>
// eslint-disable-next-line no-redeclare
export function useStore(storeName: keyof typeof storeExports) {
  return storeExports[storeName]()
}

const store = createPinia()
store.use(piniaPluginPersist)

export default store
