declare namespace Types {
  type AnyObj = {
    [propName: string]: any
  }
  type PickOne<T, K extends keyof T> = T[K]
}
