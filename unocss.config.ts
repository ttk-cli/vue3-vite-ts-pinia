// https://github.com/unocss/unocss
import presetRemToPx from '@unocss/preset-rem-to-px'
import { defineConfig, Preset, presetIcons, presetUno } from 'unocss'

export const createConfig = () => {
  return defineConfig({
    presets: [
      presetUno(),
      presetIcons({
        prefix: '',
        extraProperties: {
          display: 'inline-block',
          cursor: 'pointer',
          'font-size': '20px',
        },
      }),
      presetRemToPx({
        baseFontSize: 4,
      }) as Preset,
    ],
    include: [/\.vue$/, /pages.json$/],
  })
}

export default createConfig()
