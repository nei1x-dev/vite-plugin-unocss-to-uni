# vite-plugin-unocss-to-uni

[![Version](https://img.shields.io/npm/v/vite-plugin-unocss-to-uni.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/vite-plugin-unocss-to-uni.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/vite-plugin-unocss-to-uni)

> A Vite plugin that supports [UnoCSS](https://github.com/unocss/unocss) in [uni-app](https://github.com/dcloudio/uni-app), which can transform some `class` that mini-program can't use.


## `class` transform

| form | to      | sample                 |
| ---- | ------- | ---------------------- |
| `\.` | `-point-` | `p-0.5` -> `p-0-point-5` |
| `\/` | `-div-` | `p-1/2` -> `p-1-div-2` |
| `\:` | `-c-` | `dark:text-green-500` -> `dark-c-text-green-500` |
| `\%` | `-pct` | `opacity-10%` -> `opacity-10-pct` |
| `\!` | `i-` | `!bg-black` -> `i-bg-black` |
| `\#` | `-h-` | `bg-#121212` -> `bg--h-121212` |
| `\(` | `p-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hslp-2.7,81.9%,69.6%)]` |
| `\)` | `-q` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7,81.9%,69.6%-q]` |
| `\[` | `l-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-l-hsl(2.7,81.9%,69.6%)]` |
| `\]` | `-r` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7,81.9%,69.6%)-r` |
| `\,` | `-comma-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7-comma-81.9%-comma-69.6%)]` |

## Usage

### Prepare

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand atomic CSS engine.
- Make sure that the version is less than or equal to 0.35.0 (WIP)

### Install

```bash
pnpm add -D vite-plugin-unocss-to-uni
```

### Configure `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
...
import Unocss from 'unocss/vite'
import { UnocssToUni } from 'vite-plugin-unocss-to-uni'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    Unocss(),
    // Make sure it's behind Unocss
    UnocssToUni(),
  ],
})

```

### Configure `unocss.config.ts`

```typescript{}
import {
  defineConfig,
  presetIcons,
  presetUno,
  ...
} from 'unocss'
import { unocssToUniProcess } from 'vite-plugin-unocss-to-uni'

export default defineConfig({
  ...
  presets: [
    // https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/preflights.ts
    // The miniprogram does not support the `*` selector.
    {
      ...presetUno(),
      preflights: undefined,
    },
    ...
  ],
  ...
  postprocess: (t) => {
    t.selector = unocssToUniProcess(t.selector)
    return t
  },
})
```



## Example
[ColorTimetable](https://github.com/zguolee/ColorTimetable)

## License
MIT
