import { storeToRefs } from 'pinia'

const storeFiles = import.meta.globEager('../store/*.ts')
const storeExports: Types.AnyObj = {}

for (const fileName in storeFiles) {
  const { default: storeObject } = storeFiles[fileName]
  if (storeObject.$id) {
    storeExports[storeObject.$id] = storeObject
  }
}

export function useStore(storeName: string) {
  if (!Object.keys(storeExports).includes(storeName)) {
    throw 'Unknown pinia store name: ' + storeName
  }

  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)

  return { ...store, ...storeRefs }
}
