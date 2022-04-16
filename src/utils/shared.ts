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

export const remove = (arr: any[], el: any) => {
  const i = arr.indexOf(el)
  if (i > -1) {
    arr.splice(i, 1)
  }
  return arr
}

export const removeItem = (arr: any[], el: any, val: any) => {
  const i = arr.findIndex((i) => i[el] === val)
  if (i > -1) {
    arr.splice(i, 1)
  }
  return arr
}
