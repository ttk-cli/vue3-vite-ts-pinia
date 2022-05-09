// auto import by 'pinia-auto-refs'
import appStore from '@/store/app'
import testStore from '@/store/test'
import userStore from '@/store/user'

import { ToRef, StoreToRefs } from 'vue'
declare module 'vue' {
  export type StoreToRefs<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
  }
}
declare type PickOne<T, K extends keyof T> = T[K]

const storeExports = {
  app: appStore,
  test: testStore,
  user: userStore,
}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as unknown as StoreToRefs<
    ReturnType<PickOne<typeof storeExports, T>>
  >
}
