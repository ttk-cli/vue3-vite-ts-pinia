import { ToRef } from 'vue'

declare module 'vue' {
  declare type StoreToRefs<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
  }
}
