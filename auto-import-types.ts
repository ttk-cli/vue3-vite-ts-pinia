import { promises as fs } from 'fs'
import { resolve } from 'path'

type Options = Partial<{
  dtsDir: string
  filepath: string
  globalsPropValue: boolean | 'readonly' | 'readable' | 'writable' | 'writeable'
}>

const defaultOptions = {
  dtsDir: 'src/@types',
  filepath: '.eslintrc-auto-import-types.json',
  globalsPropValue: true,
}

export default function (options: Options = {}) {
  Object.assign(options, defaultOptions)

  const { dtsDir, filepath, globalsPropValue } = options
  const dirPath = resolve(__dirname, dtsDir)

  async function generateConfigFiles() {
    const filesPath = await fs.readdir(dirPath)
    const eslintConfigs = { globals: {} }
    const dtsArr = []
    for (const filePath of filesPath) {
      const file = await fs.readFile(dirPath + '\\' + filePath, 'utf-8')
      const dts = file.match(/(?<=declare (namespace|type|interface) )[a-zA-Z0-9]*/g)
      dts && dtsArr.push(...dts)
    }
    for (const dts of dtsArr) {
      eslintConfigs.globals[dts] = globalsPropValue
    }
    fs.writeFile(filepath, JSON.stringify(eslintConfigs, null, 2), 'utf-8')
  }

  generateConfigFiles()
  return {
    name: 'auto-import-types',
    handleHotUpdate(ctx) {
      if (ctx.file.includes(dtsDir)) {
        generateConfigFiles()
      }
    },
  }
}
