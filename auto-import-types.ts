import { promises as fs } from 'fs'
import { resolve } from 'path'

type Options = Partial<{
  typesPath: string
  filepath: string
  globalsPropValue: boolean | 'readonly' | 'readable' | 'writable' | 'writeable'
}>

const defaultOptions = {
  typesPath: 'src/@types',
  filepath: '.eslintrc-auto-import-types.json',
  globalsPropValue: true,
}

export default function (options: Options = {}) {
  Object.assign(options, defaultOptions)

  const { typesPath, filepath, globalsPropValue } = options
  const dirPath = resolve(__dirname, typesPath)

  async function generateConfigFiles() {
    const filesPath = await fs.readdir(dirPath)
    const eslintConfigs = { globals: {} }
    const namespaces = []
    for (const filePath of filesPath) {
      const file = await fs.readFile(dirPath + '\\' + filePath, 'utf-8')
      namespaces.push(...file.match(/(?<=namespace )[\S]*/g))
    }
    for (const namespace of namespaces) {
      eslintConfigs.globals[namespace] = globalsPropValue
    }
    fs.writeFile(filepath, JSON.stringify(eslintConfigs, null, 2), 'utf-8')
  }

  generateConfigFiles()
  return {
    name: 'auto-import-types',
    handleHotUpdate(ctx) {
      if (ctx.file.includes(typesPath)) {
        generateConfigFiles()
      }
    },
  }
}
