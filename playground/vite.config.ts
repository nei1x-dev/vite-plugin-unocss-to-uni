import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import { UnocssToUni, unocssToUniProcess } from 'vite-plugin-unocss-to-uni'
import {
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      shortcuts: [
        ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
        ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          warn: true,
          // 其他选项
          prefix: 'i-',
          extraProperties: {
            display: 'inline-block',
          },
        }),
        presetWebFonts({
          fonts: {
            sans: 'DM Sans',
            serif: 'DM Serif Display',
            mono: 'DM Mono',
          },
        }),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ],
      postprocess: (t) => {
        t.selector = unocssToUniProcess(t.selector)
        return t
      },
    }),
    UnocssToUni(),
    Inspect(),
  ],
})
