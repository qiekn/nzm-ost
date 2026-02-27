# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

nzm-ost — 逆战：未来 游戏原声带（OST）Web 播放器。基于 React 19 + Vite 7 + TypeScript（strict mode）+ Tailwind CSS v4。

## Commands

```bash
# 包管理器：pnpm
pnpm install          # 安装依赖
pnpm run dev          # 启动开发服务器（Vite，含 HMR）
pnpm run build        # 生产构建（tsc -b && vite build）
pnpm run preview      # 预览生产构建
pnpm run lint         # ESLint 检查
pnpm run webp         # PNG/JPG → WebP 转换（输出到 public/webp/）
```

## Architecture

- **入口**: `index.html` → `src/main.tsx` → `src/App.tsx`
- **构建工具**: Vite 7 + `@vitejs/plugin-react`（Babel，支持 Fast Refresh）
- **类型检查**: TypeScript strict 模式，构建前通过 `tsc -b` 检查
- **样式**: Tailwind CSS v4（通过 `@tailwindcss/vite` 插件），自定义主题色定义在 `index.css` 的 `@theme` 中（gold、gold-light、gold-dim、accent）
- **图标**: `@phosphor-icons/react`
- **ESLint**: Flat config 格式（ESLint 9.x）+ typescript-eslint，`no-unused-vars` 规则忽略大写或下划线开头的变量
- **i18n**: 自定义 React Context（`src/i18n/`），支持中文（zh）和英文（en），使用 `useLang()` hook
- **部署**: GitHub Pages（通过 GitHub Actions），同时支持 Cloudflare Pages

- **路由**: `react-router-dom`，`/` 主页、`/klsg` 昆仑神宫、`/jjgc` 精绝古城

### 目录结构

```
src/
├── components/       # UI 组件（Header, ChapterNav, CoverArt, TrackList, PlayerBar）
├── pages/            # 页面组件（HomePage, MapPlayerPage）
├── hooks/            # useAudioPlayer — 核心音频播放状态管理
├── utils/            # asset() 工具函数
├── data/             # 音乐数据定义（types.ts, kunlun.ts, jingjue.ts）
└── i18n/             # 国际化（context.tsx, zh.ts, en.ts）

public/
├── images/           # 原始图片（PNG/JPG）
├── webp/             # WebP 转换输出（gitignore，构建时生成）
├── videos/           # 背景视频
└── soundtrack/       # 音频文件（OGG Vorbis）
```

### 数据流

```
App → LangProvider (i18n)
    → BrowserRouter
      → HomePage (地图选择 → /klsg, /jjgc)
      → MapPlayerPage (mapData)
        → Header (语言切换, 返回主页)
        → ChapterNav (章节选择 → setActiveChapterIndex)
        → CoverArt (当前章节封面)
        → TrackList (曲目选择 → useAudioPlayer.playSource)
        → PlayerBar (播放控制 → useAudioPlayer.*)
```

## Conventions

- 使用 ES Module（`"type": "module"`）
- Git commit 格式: `<type>: <description>`，type 包括 feat, fix, update, refactor, docs, test, chore, init
- JSX 中引用 `public/` 下的图片、音频、视频等静态资源时，必须通过 `asset()` 函数（`src/utils/asset.ts`）包装路径，不要硬编码绝对路径。`asset()` 会自动处理 base path 前缀（GitHub Pages 部署需要 `/nzm-ost/` 前缀）和 PNG/JPG 到 WebP 的路径映射。示例：`src={asset("/images/logo/golden.png")}`
- 音乐数据（`src/data/*.ts`）中的路径保持纯字符串，`asset()` 在组件消费时调用
- 图片资源先放 `public/images/`，通过 `pnpm run webp` 生成 WebP 到 `public/webp/`

## Music Data Conventions

- 音频文件格式为 OGG Vorbis（`.ogg`），不要使用 `.wem.wav` 或 `.wem.ogg` 等中间格式后缀
- Boss 战的 segment 顺序：`countdown`（倒计时） → `spawn`（登场） → `loop`/`intro`（战斗阶段） → `transition` → `end`（死亡）。countdown 是 boss 战开始前的倒计时，必须放在 spawn 之前
- `MapData.background` 为播放页静态背景图，`MapData.backgroundVideo` 为可选的背景视频。如果 `backgroundVideo` 为空，则只显示背景图片，不渲染 `<video>` 元素
- 每个地图的章节 cover/navImage/titleImage 应使用该章节对应的图片，不要统一用同一张图
