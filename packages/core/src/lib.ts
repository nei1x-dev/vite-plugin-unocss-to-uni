import { parse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// class="m-0.5 p-2.5"
function classTransform(originStr: string, targetStr: string) {
  const reg = new RegExp(escapeRegExp(targetStr))
  let replaceStr = targetStr
  // dot
  if (targetStr.includes('.'))
    replaceStr = replaceStr.replace(/\./g, '-point-')
  // // div
  if (targetStr.includes('/')) replaceStr = replaceStr.replace(/\//g, '-div-')
  // colon
  if (targetStr.includes(':')) replaceStr = replaceStr.replace(/\:/g, '-c-')
  // percent
  if (targetStr.includes('%')) replaceStr = replaceStr.replace(/\%/g, '-pct-')
  // !important
  if (targetStr.includes('!')) replaceStr = replaceStr.replace(/\!/g, '-i-')
  // hex
  if (targetStr.includes('#')) replaceStr = replaceStr.replace(/\#/g, '-h-')
  // paren
  if (targetStr.includes('(')) replaceStr = replaceStr.replace(/\(/g, '-p-')
  if (targetStr.includes(')')) replaceStr = replaceStr.replace(/\)/g, '-q-')
  // square
  if (targetStr.includes('[')) replaceStr = replaceStr.replace(/\[/g, '-l-')
  if (targetStr.includes(']')) replaceStr = replaceStr.replace(/\]/g, '-r-')
  // x,x to x-comma-x
  if (targetStr.includes(','))
    replaceStr = replaceStr.replace(/\,/g, '-comma-')
  return originStr.replace(reg, replaceStr)
}

// :class="'p-2.5 m-0.5'"
function class2Transform(originStr: string, targetStr: string) {
  const classMatches = targetStr.match(/'((?!( : |':')).)+'/g)
  if (classMatches?.length) {
    classMatches.forEach((classMatch) => {
      originStr = classTransform(originStr, classMatch)
    })
  }
  return originStr
}

export function classNameTransform(code: string, id: string) {
  let s: MagicString | undefined
  const { descriptor } = parse(code)
  if (!descriptor.template?.content) return null
  let strTemp = code
  const matches = code.match(/:?class=\".*\"/g)
  if (matches?.length) {
    matches.forEach((match) => {
      if (!match.includes(':class')) {
        strTemp = classTransform(strTemp, match)
      }
      else if (match.startsWith(':class')) {
        strTemp = class2Transform(strTemp, match)
      }
      else {
        const classSplit = match.split(':class')
        strTemp = classTransform(strTemp, classSplit[0])
        strTemp = class2Transform(strTemp, classSplit[1])
      }
    })
  }
  const str = () => s || (s = new MagicString(strTemp))
  return {
    map: str().generateMap({ file: id }),
    code: str().toString(),
  }
}
