export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  const baseWithSlash = base.endsWith("/") ? base : `${base}/`;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${baseWithSlash}${normalized}`;
}
