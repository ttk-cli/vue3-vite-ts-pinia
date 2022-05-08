declare type AnyObj = {
  [propName: string]: any
}
declare type PickOne<T, K extends keyof T> = T[K]
