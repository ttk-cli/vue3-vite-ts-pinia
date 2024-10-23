import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImportTypes from 'auto-import-types'
import PiniaAutoRefs from 'pinia-auto-refs'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'

// eslint-disable-next-line node/prefer-global/process
const env = process.argv[process.argv.length - 1]
const config = loadEnv(env, './')
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    AutoImportTypes(),
    PiniaAutoRefs(),
    AutoImport({
      dts: 'src/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/helper/pinia-auto-refs': ['useStore'],
        },
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: 'readonly', // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
      // ui库解析器
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    Unocss(),
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Layouts({
      defaultLayout: 'default',
    }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: config.VITE_API_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
  },
  css: {
    preprocessorOptions: { scss: { charset: false } },
  },
  esbuild: {
    drop: env === 'prod' ? ['console', 'debugger'] : [],
  },
})
