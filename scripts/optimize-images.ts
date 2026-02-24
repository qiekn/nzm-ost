/**
 * 图片优化脚本
 * 将 PNG/JPG 图片转换为 WebP 格式，可选调整尺寸
 * 输出到 public/webp/ 目录，保留原始目录结构
 *
 * 用法:
 *   pnpm exec tsx scripts/optimize-images.ts [options] [path]
 *
 * 选项:
 *   --max-width=N   限制最大宽度（如 --max-width=800）
 *   --quality=N     WebP 质量 1-100（默认 80）
 *   --dry-run       预览模式，不实际转换
 *   --delete-src    删除原始文件（默认保留）
 *
 * 示例:
 *   pnpm exec tsx scripts/optimize-images.ts public/images
 *   pnpm exec tsx scripts/optimize-images.ts --max-width=800 --quality=85 public/images/kunlun
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const WEBP_DIR = path.join(PUBLIC_DIR, "webp");

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"];

interface Options {
  maxWidth?: number;
  quality: number;
  dryRun: boolean;
  deleteSrc: boolean;
  targetPath: string;
}

function parseArgs(): Options {
  const args = process.argv.slice(2);
  const options: Options = {
    quality: 80,
    dryRun: false,
    deleteSrc: false,
    targetPath: "public/images",
  };

  for (const arg of args) {
    if (arg.startsWith("--max-width=")) {
      options.maxWidth = parseInt(arg.split("=")[1], 10);
    } else if (arg.startsWith("--quality=")) {
      options.quality = parseInt(arg.split("=")[1], 10);
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--delete-src") {
      options.deleteSrc = true;
    } else if (!arg.startsWith("--")) {
      options.targetPath = arg;
    }
  }

  return options;
}

function isImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.includes(ext);
}

function getAllImageFiles(dir: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllImageFiles(fullPath));
    } else if (entry.isFile() && isImageFile(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

// 计算输出路径: public/images/foo/bar.png -> public/webp/images/foo/bar.webp
function getWebpOutputPath(srcPath: string): string {
  const cwd = process.cwd();
  const absolutePath = path.resolve(cwd, srcPath);
  const publicPath = path.resolve(cwd, PUBLIC_DIR);

  const relativePath = path.relative(publicPath, absolutePath);
  const webpRelativePath = relativePath.replace(/\.(png|jpe?g)$/i, ".webp");
  return path.join(cwd, WEBP_DIR, webpRelativePath);
}

async function convertImage(
  srcPath: string,
  options: Options,
): Promise<{ saved: number; skipped: boolean }> {
  const webpPath = getWebpOutputPath(srcPath);

  // 跳过未变更的：webp 已存在且比源文件新
  if (fs.existsSync(webpPath)) {
    const srcMtime = fs.statSync(srcPath).mtimeMs;
    const webpMtime = fs.statSync(webpPath).mtimeMs;
    if (webpMtime >= srcMtime) {
      return { saved: 0, skipped: true };
    }
  }

  const originalSize = fs.statSync(srcPath).size;

  if (options.dryRun) {
    console.log(`[DRY-RUN] Would convert: ${srcPath} -> ${webpPath}`);
    return { saved: 0, skipped: false };
  }

  // 确保输出目录存在
  const outputDir = path.dirname(webpPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let pipeline = sharp(srcPath);

  // 调整尺寸（如果指定了 maxWidth）
  if (options.maxWidth) {
    const metadata = await sharp(srcPath).metadata();
    if (metadata.width && metadata.width > options.maxWidth) {
      pipeline = pipeline.resize(options.maxWidth, null, {
        withoutEnlargement: true,
      });
    }
  }

  // 转换为 WebP
  await pipeline
    .webp({ quality: options.quality, alphaQuality: 100 })
    .toFile(webpPath);

  const newSize = fs.statSync(webpPath).size;
  const saved = originalSize - newSize;
  const percent = ((saved / originalSize) * 100).toFixed(1);

  console.log(
    `[OK] ${srcPath} -> ${path.relative(process.cwd(), webpPath)} ` +
      `(${formatBytes(originalSize)} -> ${formatBytes(newSize)}, -${percent}%)`,
  );

  // 删除原始文件（如果指定）
  if (options.deleteSrc) {
    fs.unlinkSync(srcPath);
  }

  return { saved, skipped: false };
}

async function main() {
  const options = parseArgs();
  const targetDir = path.resolve(process.cwd(), options.targetPath);

  console.log("=".repeat(50));
  console.log("图片优化工具 - PNG/JPG to WebP");
  console.log("=".repeat(50));
  console.log(`目标目录: ${targetDir}`);
  console.log(`输出目录: ${path.resolve(process.cwd(), WEBP_DIR)}`);
  console.log(`质量: ${options.quality}`);
  if (options.maxWidth) console.log(`最大宽度: ${options.maxWidth}px`);
  if (options.dryRun) console.log("模式: 预览（不实际转换）");
  if (options.deleteSrc) console.log("删除原始文件: 是");
  console.log("=".repeat(50));

  const imageFiles = getAllImageFiles(targetDir);

  if (imageFiles.length === 0) {
    console.log("未找到 PNG/JPG 文件");
    return;
  }

  console.log(`找到 ${imageFiles.length} 个图片文件\n`);

  let totalSaved = 0;
  let converted = 0;
  let skipped = 0;

  for (const file of imageFiles) {
    try {
      const result = await convertImage(file, options);
      if (result.skipped) {
        skipped++;
      } else {
        totalSaved += result.saved;
        converted++;
      }
    } catch (err) {
      console.error(`[ERROR] ${file}: ${err}`);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`完成! 转换: ${converted}, 跳过: ${skipped}`);
  if (totalSaved > 0) {
    console.log(`总共节省: ${formatBytes(totalSaved)}`);
  }
}

main().catch(console.error);
