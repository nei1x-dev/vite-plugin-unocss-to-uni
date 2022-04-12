import { promises as fs } from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'
import { UnocssToUni } from '../src/index'
import { classProcess } from '../src/lib'

const createVitePlugin = () => {
  const { name, transform } = UnocssToUni()
  return { name, transform: transform as any }
}

describe('unocss to uni test.', () => {
  test('make sure name.', async() => {
    const { name } = await createVitePlugin()
    expect(name).toEqual('vite:unocss-to-uni')
  })

  test('not a vue file.', async() => {
    const { transform } = await createVitePlugin()
    const ret = await transform('code', 'index.html')
    expect(ret).toBe(null)
  })

  test('normal.', async() => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test.vue'),
    )
    expect(classProcess(content.toString())).toMatchInlineSnapshot(`
      "<script setup lang=\\"ts\\">
      // This starter template is using Vue 3 <script setup> SFCs
      // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
      </script>
      
      <template>
        <div class=\\"flex flex-col justify-center items-center\\">
          <div class=\\"text-green-500 text-2xl i-carbon-campsite\\" />
          <div class=\\"border bg-blue-200 px-2 i-bg-red-500\\">
            0123456789
          </div>
          <div class=\\"p-1\\" :class=\\"'text-yellow-500'\\">
            abckefghijklmnopqrstuvwxyz
          </div>
          <div class=\\"bg-l-hslp-2-point-7-comma-81-point-9-pct-comma-69-point-6-pct-q-r py-3-point-5\\" :class=\\"expectTrue(b) ? 'm-0-point-2' : ''\\">
            py-3.5
          </div>
          <p class=\\"font-medium text-xs p-2-point-5\\" :class=\\"1 ? 'text-10px leading-tight p-2-point-5' : 'm-3-point-5'\\">
            p-2.5
          </p>
          <div class=\\"m-1-point-5 p-1\\" :class=\\"'text-yellow-500 p-2-point-5'\\">
            abckefghijklmnopqrstuvwxyz
          </div>
          <button class=\\"btn\\">
            123
          </button>
        </div>
      </template>
      "
    `)
  })
})
