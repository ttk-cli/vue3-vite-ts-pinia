// 类型推断
export const isArray = (val: any) => Array.isArray(val)

export const isObject = (val: any) => typeInference(val, 'Object')

export const typeInference = (val: any, type: string) =>
  Object.prototype.toString.call(val).slice(8, -1) === type

// 数组
export function lastItem(arr: any[]) {
  return arr[arr.length - 1]
}

export const clone = (json: any) => {
  return JSON.parse(JSON.stringify(json))
}

//对象
export function isValidKey(
  object: object,
  key: string | number | symbol
): key is keyof typeof object {
  return key in object
}

export const stringify = (obj: Object, prefix = '&') => {
  let str = ''
  for (const key in obj) {
    if (isValidKey(obj, key)) {
      str += `${key}=${obj[key]}${prefix}`
    }
  }
  return str.slice(0, -1)
}
