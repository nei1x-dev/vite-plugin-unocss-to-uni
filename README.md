# vite-plugin-unocss-to-uni

[![Version](https://img.shields.io/npm/v/vite-plugin-unocss-to-uni.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/vite-plugin-unocss-to-uni.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/vite-plugin-unocss-to-uni)

> `vite-plugin-unocss-to-uni` 是一个 [UnoCSS](https://github.com/unocss/unocss) 到 `UniApp` 的转换器，可以将 [UnoCSS](https://github.com/unocss/unocss) 中 [Tailwind / Windi CSS](https://github.com/unocss/unocss/tree/main/packages/preset-wind) 预处理的样式转换为小程序可用的样式。


## 小程序 `class` 名处理

| form | to      | sample                 |
| ---- | ------- | ---------------------- |
| `\.` | `-point-` | `p-0.5` -> `p-0-point-5` |
| `\/` | `-div-` | `p-1/2` -> `p-1-div-2` |
| `\:` | `-c-` | `dark:text-green-500` -> `dark-c-text-green-500` |
| `\%` | `-pct-` | `opacity-10%` -> `opacity-10-pct-` |
| `\!` | `-i-` | `!bg-black` -> `-i-bg-black` |
| `\#` | `-h-` | `bg-#121212` -> `bg--h-121212` |
| `\(` | `-p-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl-p-2.7,81.9%,69.6%)]` |
| `\)` | `-p-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7,81.9%,69.6%-p-]` |
| `\[` | `-p-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg--l-hsl(2.7,81.9%,69.6%)]` |
| `\]` | `-p-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7,81.9%,69.6%)-r-` |
| `\,` | `-comma-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7-comma-81.9%-comma-69.6%)]` |

<br>

## 使用

### 准备

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

### 安装

```bash
pnpm add -D vite-plugin-unocss-to-uni
```

### 配置 `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
...
import Unocss from 'unocss/vite'
import UnocssToUni from 'vite-plugin-unocss-to-uni'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    Unocss(),
    // 确保在 Unocss 之后
    UnocssToUni(),
  ],
})

```

### 配置 `unocss.config.ts`

```typescript
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
    presetUno(),
    ...
  ],
  ...
  postprocess: (t) => {
    t.selector = unocssToUniProcess(t.selector)
    return t
  },
})
```

之后就可以使用了，比如：

```html
<template>
  <div class="flex flex-col justify-center items-center">
    <div class="text-green-500 text-2xl i-carbon-campsite" />
    <div class="border bg-blue-200 px-2 !bg-red-500">
      0123456789
    </div>
    <div class="bg-[hsl(2.7,81.9%,69.6%)] py-3.5">
      py-3.5
    </div>
    <p
      class="font-medium text-xs p-2.5"
      :class="1 ? 'text-10px leading-tight p-2.5' : 'm-3.5'"
    >
      p-2.5
    </p>
  </div>
</template>
```

## 示例项目
[ColorTimetable](https://github.com/zguolee/ColorTimetable)

## License
MIT