import piniaPluginPersist from 'pinia-plugin-persist'
import { StoreToRefs } from 'vue'
import appStore from './app'
import userStore from './user'
import testStore from './test'

const storeExports = {
  app: appStore,
  user: userStore,
  test: testStore,
}
export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as unknown as StoreToRefs<
    ReturnType<PickOne<typeof storeExports, T>>
  >
}

const store = createPinia()
store.use(piniaPluginPersist)

export default store
