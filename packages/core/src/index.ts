import type { Plugin } from 'vite'
import { supportScriptName } from './lib'

// wip
export interface UnocssToUniOptions {
  /**
   * Parse x.x to x-div-x
   * @default true
   */
  float?: boolean
}

export function unocssToUniProcess(str: string) {
  // dot
  if (str.includes('\.')) str = str.replace(/\\\./g, '-point-')
  // // div
  if (str.includes('\/')) str = str.replace(/\\\//g, '-div-')
  // colon
  if (str.includes('\:')) str = str.replace(/\\\:/g, '-c-')
  // percent
  if (str.includes('\%')) str = str.replace(/\\\%/g, '-pct-')
  // !important
  if (str.includes('\!')) str = str.replace(/\\\!/g, '-i-')
  // hex
  if (str.includes('\#')) str = str.replace(/\\\#/g, '-h-')
  // paren
  if (str.includes('\(')) str = str.replace(/\\\(/g, '-p-')
  if (str.includes('\)')) str = str.replace(/\\\)/g, '-q-')
  // square
  if (str.includes('\[')) str = str.replace(/\\\[/g, '-l-')
  if (str.includes('\]')) str = str.replace(/\\\]/g, '-r-')
  // x,x to x-comma-x
  if (str.includes('\\2c ')) str = str.replace(/\\2c\s/g, '-comma-')
  return str
}

export default function UnocssToUni(options: UnocssToUniOptions = {}): Plugin {
  return {
    name: 'vite:unocss-to-uni',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (!/\.vue$/.test(id)) return null
      const { float = true } = options
      if (float) return supportScriptName.call(this, code, id)
      return null
    },
  }
}
