#!/usr/bin/env node
// Scan a directory tree for images that are 4:5 or exactly 1200x1500
// and for text files containing "4x5" or "1200". Generates filtered-images.html
// with a visual grid and a sidebar report.

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

// Optional sharp for image dimensions (fallback to skipping if unavailable)
let sharp = null;
try {
  const mod = await import('sharp');
  sharp = mod.default || mod;
} catch (_) {
  // sharp not available; we'll skip image dimension probing
}

const extsImage = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const extsText = new Set(['.html','.htm','.md','.txt','.tsx','.ts','.jsx','.js','.css','.json','.xml','.yml','.yaml']);
const defaultIgnore = new Set(['.git','node_modules','dist','build','.next','.vercel','Library','System','Applications','Caches','.DS_Store']);

function is4x5(w, h) { return w * 5 === h * 4; }

function arg(flag, fallback) {
  const i = process.argv.indexOf(flag);
  if (i !== -1 && i + 1 < process.argv.length) return process.argv[i+1];
  return fallback;
}

const root = path.resolve(arg('--root', process.cwd()));
const maxFiles = parseInt(arg('--max', '0'), 10) || 0; // 0 = unlimited
const onlyNames = process.argv.includes('--only-names');
const followSymlinks = process.argv.includes('--follow');
const copyTo = arg('--copy-to', '');

/** Walk directory */
async function *walk(dir) {
  let dirents;
  try {
    dirents = await fsp.readdir(dir, { withFileTypes: true });
  } catch (e) {
    return; // permission denied or not a dir
  }
  for (const d of dirents) {
    if (defaultIgnore.has(d.name)) continue;
    const full = path.join(dir, d.name);
    if (d.isDirectory()) {
      yield * walk(full);
    } else if (d.isSymbolicLink() && followSymlinks) {
      try {
        const s = await fsp.stat(full);
        if (s.isDirectory()) { yield * walk(full); } else if (s.isFile()) { yield full; }
      } catch {}
    } else if (d.isFile()) {
      yield full;
    }
  }
}

/** Read small text files safely */
async function readTextSafe(file, lim = 2 * 1024 * 1024) {
  try {
    const stat = await fsp.stat(file);
    if (stat.size > lim) return null;
    const buf = await fsp.readFile(file);
    return buf.toString('utf8');
  } catch { return null; }
}

/** Probe image dimensions */
async function probeDims(file) {
  if (!sharp) return null;
  try {
    const meta = await sharp(file).metadata();
    if (meta && meta.width && meta.height) return { width: meta.width, height: meta.height };
    return null;
  } catch { return null; }
}

const matches = { images: [], texts: [] };
let scanned = 0;

console.log(`Scanning: ${root}`);

for await (const fp of walk(root)) {
  scanned++;
  if (maxFiles && scanned > maxFiles) break;
  const ext = path.extname(fp).toLowerCase();
  if (extsImage.has(ext)) {
    if (onlyNames) {
      const bn = path.basename(fp).toLowerCase();
      if (bn.includes('4x5') || bn.includes('1200')) {
        matches.images.push({ file: fp, width: null, height: null });
      }
    } else {
      const dims = await probeDims(fp);
      if (dims && (is4x5(dims.width, dims.height) || (dims.width === 1200 && dims.height === 1500))) {
        matches.images.push({ file: fp, ...dims });
      } else {
        // Also include filenames hinting at 4x5/1200
        const bn = path.basename(fp).toLowerCase();
        if (bn.includes('4x5') || bn.includes('1200')) {
          matches.images.push({ file: fp, width: dims?.width ?? null, height: dims?.height ?? null });
        }
      }
    }
  } else if (extsText.has(ext)) {
    const txt = await readTextSafe(fp);
    if (!txt) continue;
    const lines = txt.split(/\r?\n/);
    const found = [];
    for (let i = 0; i < lines.length; i++) {
      const L = lines[i];
      if (/(^|\b)(4x5|1200)($|\b)/i.test(L)) {
        found.push({ line: i + 1, text: L.length > 200 ? L.slice(0, 200) + '…' : L });
      }
    }
    if (found.length) matches.texts.push({ file: fp, hits: found });
  }
}

// Optionally copy matched images into a destination folder, preserving structure under root
let copied = 0;
if (copyTo) {
  const destRoot = path.resolve(copyTo);
  await fsp.mkdir(destRoot, { recursive: true }).catch(()=>{});
  for (const m of matches.images) {
    try {
      const rel = path.relative(root, m.file);
      const outPath = path.join(destRoot, rel);
      await fsp.mkdir(path.dirname(outPath), { recursive: true });
      await fsp.copyFile(m.file, outPath);
      copied++;
    } catch {}
  }
}

console.log(`Scanned ${scanned} files -> ${matches.images.length} images, ${matches.texts.length} text files with hits.${copyTo ? ` Copied: ${copied}` : ''}`);

function htmlEscape(s) {
  return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

const outPath = path.join(process.cwd(), 'filtered-images.html');
const toFileUrl = (p) => (process.platform === 'win32' ? 'file:///' + p.replaceAll('\\','/') : 'file://' + p);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Filtered Media Report — 4:5 or 1200×1500</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body{margin:0;display:grid;grid-template-columns:320px 1fr;min-height:100vh;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#0b0e18;color:#e6e8f2}
    aside{border-right:1px solid #242844;padding:16px;background:#11142a}
    main{padding:16px}
    h1{font-size:16px;margin:0 0 8px}
    .muted{color:#a8acc4}
    .tile{border:1px solid #242844;border-radius:10px;overflow:hidden;background:#0f1220}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
    .tile img{width:100%;display:block;aspect-ratio:4/5;object-fit:cover;background:#0a0d1a}
    code{background:#151935;border:1px solid #242844;padding:2px 6px;border-radius:6px}
    .file{margin:10px 0;padding:10px;border:1px solid #242844;border-radius:8px;background:#0f1220}
    .hit{color:#cfd5ff;font-size:12px;margin-top:6px}
    a{color:#9f7aea;text-decoration:none}
  </style>
</head>
<body>
  <aside>
    <h1>Report</h1>
    <div class="muted">Root: <code>${htmlEscape(root)}</code></div>
    <div class="muted">Scanned: ${scanned.toLocaleString()} files</div>
    <div>Images matched: <strong>${matches.images.length}</strong></div>
    <div>Text files with hits: <strong>${matches.texts.length}</strong></div>
    ${copyTo ? `<div>Copied to: <code>${htmlEscape(path.resolve(copyTo))}</code> <span class="muted">(${copied} files)</span></div>` : ''}
    <div style="margin-top:12px" class="muted">Text hits (4x5 / 1200):</div>
    <div style="max-height:60vh;overflow:auto">
      ${matches.texts.map(t => `<div class="file"><div><a href="${toFileUrl(t.file)}">${htmlEscape(t.file)}</a></div>${t.hits.slice(0,5).map(h => `<div class="hit">L${h.line}: ${htmlEscape(h.text)}</div>`).join('')}${t.hits.length>5?`<div class="hit">… +${t.hits.length-5} more</div>`:''}</div>`).join('')}
    </div>
  </aside>
  <main>
    <h1>Images (4:5 or 1200×1500)</h1>
    <div class="grid">
      ${matches.images.map(m => `<div class="tile"><a href="${toFileUrl(m.file)}"><img src="${toFileUrl(m.file)}" alt="${htmlEscape(path.basename(m.file))}" /></a><div style="padding:8px;font-size:12px;color:#a8acc4">${m.width??'?'}×${m.height??'?'} — ${htmlEscape(m.file)}</div></div>`).join('')}
    </div>
  </main>
</body>
</html>`;

await fsp.writeFile(outPath, html, 'utf8');
console.log(`Wrote ${outPath}`);
