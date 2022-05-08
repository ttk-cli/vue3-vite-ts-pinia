import { promises as fs } from 'fs'
import { resolve } from 'path'

type Options = Partial<{
  storeDir: string
  entryFile: string
}>

const defaultOptions = {
  storeDir: 'src/store',
  entryFile: 'src/store/index.ts',
}

export default function (options: Options = {}) {
  Object.assign(options, defaultOptions)

  const { storeDir, entryFile } = options
  const storePath = resolve(__dirname, storeDir)

  async function generateConfigFiles() {
    let storesPath = await fs.readdir(storePath)
    let ctx = await fs.readFile(entryFile, 'utf-8')
    if (entryFile.startsWith(storeDir)) {
      storesPath = storesPath.filter((i) => !entryFile.endsWith(i))
    }
    const storeNames = storesPath.map((i) => i.replace('.ts', ''))
    ctx = ctx.replace(/(?<=\/\/ if: pinia-auto-refs)[\s\S]*(?=\/\/ endif)/, () => {
      let res = '\n'
      for (const storeName of storeNames) {
        res += `import ${storeName}Store from './${storeName}'\n`
      }
      res += '\n'
      res += 'const storeExports = {\n'
      for (const storeName of storeNames) {
        res += `  ${storeName}: ${storeName}Store,\n`
      }
      res += '}\n'
      return res
    })
    fs.writeFile(entryFile, ctx, 'utf-8')
  }

  generateConfigFiles()
  return {
    name: 'pinia-auto-refs',
    handleHotUpdate(ctx) {
      if (ctx.file.includes(storeDir)) {
        generateConfigFiles()
      }
    },
  }
}
