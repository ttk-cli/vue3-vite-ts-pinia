export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => objectToString.call(value)
export const isArray = Array.isArray
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'

export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'
// eslint-disable-next-line ts/no-unsafe-function-type
export const isFunction = (val: unknown): val is Function => typeof val === 'function'
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function toRawType(value: unknown): string {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}

export function isPlainObject(val: unknown): val is object {
  return toTypeString(val) === '[object Object]'
}

export function isIntegerKey(key: unknown) {
  return isString(key) && key !== 'NaN' && key[0] !== '-' && `${Number.parseInt(key, 10)}` === key
}
