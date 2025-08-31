// Utilities for Bagman portal content
// Lists files inside src/assets/bagman/website-files using Vite's import.meta.glob

export type BagmanFile = { id: string; name: string; ext: string; url: string };

const FILE_GLOB = import.meta.glob(
  [
    '@/assets/bagman/website-files/**/*.{png,jpg,jpeg,webp,svg,gif}',
    '@/assets/bagman/website-files/**/*.{pdf,ai,psd}',
    '@/assets/bagman/website-files/**/*.{txt,md,json}',
    // Catch-all for any other deliverables placed here
    '@/assets/bagman/website-files/**/*.*',
  ],
  // Return file URLs for all matches (works for unknown extensions like .md)
  { eager: true, import: 'default', query: '?url' }
) as Record<string, string>;

export function getBagmanFiles(): BagmanFile[] {
  const out: BagmanFile[] = [];
  for (const [path, url] of Object.entries(FILE_GLOB)) {
    // Extract filename and extension
    const parts = path.split('/');
    const file = parts[parts.length - 1] || path;
    const dot = file.lastIndexOf('.');
    const name = dot > 0 ? file.substring(0, dot) : file;
    const ext = dot > 0 ? file.substring(dot + 1).toLowerCase() : '';
    out.push({ id: path, name, ext, url });
  }
  return out;
}
