# 逆战：未来 游戏音乐原声带

[![GitHub Pages](https://github.com/qiekn/nzm-ost/actions/workflows/deploy.yml/badge.svg)](https://github.com/qiekn/nzm-ost/actions/workflows/deploy.yml)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-passing-brightgreen?logo=cloudflare)](https://nzm-ost.pages.dev)
[![Built with Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code%20Opus%204.6-blueviolet?logo=anthropic)](https://claude.ai/code)
在线访问：[GitHub Pages](https://qiekn.github.io/nzm-ost) | [Cloudflare Pages](https://nzm-ost.pages.dev)

一次偶然，把游戏效果音调到了 30%, 背景音乐保持为 100% 。然后打了一局昆仑神宫，备受震撼。
伟大的《逆战未来》音频团队，给您们磕一个了，请继续保持昆仑神宫的水准 (~~我什么都会做的，不是~~)！

## 技术选型

- **框架**: React 19 + TypeScript (strict mode)
- **构建**: Vite 7 + @vitejs/plugin-react
- **样式**: Tailwind CSS
- **包管理**: pnpm

## 开发

```bash
pnpm install          # 安装依赖
pnpm run dev          # 启动开发服务器
pnpm run build        # 生产构建
pnpm run preview      # 预览生产构建
pnpm run lint         # ESLint 检查
```

## 快捷键

| 按键 | 功能 |
|------|------|
| `Space` | 播放 / 暂停 |
| `H` 或 `\` | 隐藏 / 显示 UI（全屏欣赏背景视频） |

## 🎧 关于音频资产 (Audio Assets)

本仓库不提供原始的高保真音频文件下载，所有音频资源均通过解包途径获得，仅供学习交流。

以下是本项目音频处理的完整路径：

### 1. 资源获取：从底层到前端

游戏底层使用 Audiokinetic Wwise 引擎，音频资产被封装为 `.wem` 格式。

**Step 1: 解包与提取** 通过 FModel 提取出原始的 `.wem` 文件集合（例如：`A_DragonPeak_Glacier_Explore_Loop.wem`）。

**Step 2: 格式转换 (vgmstream)**
使用 vgmstream-cli 工具，将 `.wem` 文件解码为标准的无损 `.wav` 格式。

```bash
vgmstream-cli -o output.wav input.wem
```

### 2. 格式选型：为什么是 Ogg Vorbis？

> 一切都是 `Trade Off`  —— 为了在极致音质和极小体积之间找到完美平衡，本项目最终选择了 Ogg Vorbis (q=6)

- **WAV 无损原生不可行**：
   将 WAV 文件直接部署到 Web (尤其是 GitHub Pages) 是极不明智的选择。一个 16-bit/48kHz 的 WAV 文件，3分钟大约需要 50MB，昆仑神宫一个地图的 WAV 文件就占据超过 500MB。
   
- **听觉透明 (Transparent Audio)**
   Ogg q=6 对应的目标动态码率 (VBR) 约为 192 kbps。在音频编码界，这一级别的 Vorbis 被公认为达到了"听觉透明"的标准。这意味着，除非你是受过专业训练的"金耳朵"，并且使用极其昂贵的 Hi-Fi 监听设备进行反复的 A/B 盲测，否则根本无法分辨它和无损 WAV 的区别。媲美 Apple Music (AAC 256kbps) 的极佳听感。
   
- **极高压缩比**
   一首 50MB 的 WAV 原曲，经过 q=6 压缩后，体积可减至 4MB - 5MB（缩小约 90%）。

