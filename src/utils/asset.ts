export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  const baseWithSlash = base.endsWith("/") ? base : `${base}/`;
  const normalized = path.startsWith("/") ? path.slice(1) : path;

  // 将 .png/.jpg/.jpeg 路径映射到 /webp/ 目录下的 .webp 文件
  // 例如: images/foo/bar.png -> webp/images/foo/bar.webp
  if (/\.(png|jpe?g)$/i.test(normalized)) {
    const webpPath = `webp/${normalized.replace(/\.(png|jpe?g)$/i, ".webp")}`;
    return `${baseWithSlash}${webpPath}`;
  }

  return `${baseWithSlash}${normalized}`;
}
