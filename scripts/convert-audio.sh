#!/usr/bin/env bash
# 批量将 public/soundtrack/ 下的 wav 文件转为 ogg (Vorbis)
# 用法: bash scripts/convert-audio.sh
# 依赖: ffmpeg

set -uo pipefail

QUALITY=6          # OGG Vorbis 质量 0-10，6 ≈ ~192kbps，音质好体积小
SRC_DIR="public/soundtrack"

if ! command -v ffmpeg &>/dev/null; then
  echo "错误: 未找到 ffmpeg，请先安装"
  exit 1
fi

count=0
skipped=0

shopt -s globstar nullglob

for wav_file in "$SRC_DIR"/**/*.wav; do
  ogg_file="${wav_file%.wav}.ogg"

  # 如果 ogg 已存在且比 wav 新，跳过
  if [[ -f "$ogg_file" && "$ogg_file" -nt "$wav_file" ]]; then
    skipped=$((skipped + 1))
    continue
  fi

  echo "转码: $wav_file → $ogg_file"
  ffmpeg -y -i "$wav_file" -c:a libvorbis -q:a "$QUALITY" "$ogg_file" 2>/dev/null
  count=$((count + 1))
done

echo ""
echo "完成: 转码 ${count} 个文件，跳过 ${skipped} 个（已是最新）"
