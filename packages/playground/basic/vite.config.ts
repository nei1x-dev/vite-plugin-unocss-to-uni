import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import UnocssToUni from 'vite-plugin-unocss-to-uni'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Inspect(),
    Unocss(),
    UnocssToUni(),
  ],
})
