import piniaPluginPersist from 'pinia-plugin-persist'
import { StoreToRefs } from 'vue'
// if: pinia-auto-refs
import appStore from './app'
import testStore from './test'
import userStore from './user'

const storeExports = {
  app: appStore,
  test: testStore,
  user: userStore,
}
// endif
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
