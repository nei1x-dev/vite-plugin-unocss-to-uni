import type { Plugin } from 'vite'
import { escape } from './lib'

export function unocssToUniProcess(str: string) {
  // dot
  if (str.includes('\.'))
    str = str.replace(/\\\./g, '-point-')
  // // div
  if (str.includes('\/'))
    str = str.replace(/\\\//g, '-div-')
  // colon
  if (str.includes('\:'))
    str = str.replace(/\\\:/g, '-c-')
  // percent
  if (str.includes('\%'))
    str = str.replace(/\\\%/g, '-pct')
  // !important
  if (str.includes('\!'))
    str = str.replace(/\\\!/g, 'i-')
  // hex
  if (str.includes('\#'))
    str = str.replace(/\\\#/g, '-h-')
  // paren
  if (str.includes('\('))
    str = str.replace(/\\\(/g, 'p-')
  if (str.includes('\)'))
    str = str.replace(/\\\)/g, '-q')
  // square
  if (str.includes('\['))
    str = str.replace(/\\\[/g, 'l-')
  if (str.includes('\]'))
    str = str.replace(/\\\]/g, '-r')
  // x,x to x-comma-x
  if (str.includes('\\2c '))
    str = str.replace(/\\2c\s/g, '-comma-')
  return str
}

export default function UnocssToUni(): Plugin {
  return {
    name: 'vite:unocss-to-uni',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (!/\.vue$/.test(id))
        return null
      return escape.call(this, code, id)
    },
  }
}
