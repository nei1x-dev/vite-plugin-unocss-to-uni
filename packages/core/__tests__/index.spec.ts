import { promises as fs } from 'fs'
import path from 'path'
import { describe, expect, test } from 'vitest'
import plugin from '../src/index'
import { supportScriptName } from '../src/lib'

const createVitePlugin = () => {
  const { name, transform } = plugin()
  return { name, transform: transform as any }
}

describe('plugin test.', () => {
  test('make sure name.', async() => {
    const { name } = await createVitePlugin()
    expect(name).toEqual('vite:unocss-to-uni')
  })

  test('not a vue file.', async() => {
    const { transform } = await createVitePlugin()
    const ret = await transform('code', 'index.html')
    expect(ret).toBe(null)
  })

  test('disable float.', async() => {
    const { transform } = plugin({ float: false })
    const ret = await (transform as any)('code', 'index.vue')
    expect(ret).toBe(null)
  })

  test('normal.', async() => {
    const content = await fs.readFile(
      path.resolve(__dirname, './fixtures/test.vue'),
    )
    const transformContent = await fs.readFile(
      path.resolve(__dirname, './fixtures/test-transform.vue'),
    )
    const ret = supportScriptName(content.toString(), 'test.vue')
    expect(ret?.code).toEqual(transformContent.toString())
  })
})
