// https://github.com/unocss/unocss
import presetRemToPx from '@unocss/preset-rem-to-px'
import type { Preset } from 'unocss'
import { defineConfig, presetIcons, presetUno } from 'unocss'

export function createConfig() {
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
  })
}

export default createConfig()
