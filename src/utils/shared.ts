export function lastItem<T>(arr: T[]) {
  return arr[arr.length - 1]
}

export function isValidKey(
  object: object,
  key: string | number | symbol
): key is keyof typeof object {
  return key in object
}

export function stringify(obj: Object, prefix = '&') {
  let str = ''
  for (const key in obj) {
    if (isValidKey(obj, key)) {
      str += `${key}=${obj[key]}${prefix}`
    }
  }
  return str.slice(0, -1)
}
