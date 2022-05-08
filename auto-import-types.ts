import { promises as fs } from 'fs'

type Options = Partial<{
  target: string
  filepath: string
  globalsPropValue: boolean | 'readonly' | 'readable' | 'writable' | 'writeable'
}>

const defaultOptions = {
  target: '@/@types',
  filepath: '.eslintrc-auto-import-types.json',
  globalsPropValue: true,
}

export default function (options?: Options) {
  // eslint-disable-next-line no-param-reassign
  options = Object.assign(defaultOptions, options)
  return {
    name: 'auto-import-types',
    async config(config) {
      const { target, filepath, globalsPropValue } = options
      // console.log(config.resolve.alias['@'])
      // console.log(target.replace('@/', config.resolve.alias['@'] + '\\'))
      const dirPath = target.replace('@/', config.resolve.alias['@'] + '\\')
      const filesPath = await fs.readdir(dirPath)
      const eslintConfigs = { globals: {} }
      const namespaces = []
      for (const filePath of filesPath) {
        const file = await fs.readFile(dirPath + '\\' + filePath, 'utf-8')
        namespaces.push(...file.match(/(?<=namespace )[a-zA-Z]*/g))
      }
      for (const namespace of namespaces) {
        eslintConfigs.globals[namespace] = globalsPropValue
      }
      fs.writeFile(filepath, JSON.stringify(eslintConfigs, null, 2), 'utf-8')
    },
  }
}
