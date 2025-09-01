import { readdir, mkdir, stat } from 'node:fs/promises'
import { dirname, join, extname, basename } from 'node:path'
import sharp from 'sharp'

const SRC = 'public/_src'        // put original JPG/PNG here
const OUT = 'public/img'         // optimized output
const SIZES = [480, 768, 1080, 1440]   // responsive widths
const QUAL = 82

async function walk(dir) {
  const out = []
  for (const f of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, f.name)
    if (f.isDirectory()) out.push(...await walk(p))
    else out.push(p)
  }
  return out
}

async function ensure(p) { await mkdir(p, { recursive: true }) }

async function buildOne(file) {
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return
  const name = basename(file, ext)
  const rel = file.replace(SRC, '').replace(basename(file), '')
  const outDir = join(OUT, rel)
  await ensure(outDir)

  for (const w of SIZES) {
    const base = sharp(file).resize({ width: w, withoutEnlargement: true })
    await base.webp({ quality: QUAL }).toFile(join(outDir, `${name}-${w}.webp`))
    await base.avif({ quality: QUAL - 7 }).toFile(join(outDir, `${name}-${w}.avif`))
  }
  // original-size fallback
  const meta = await sharp(file).metadata()
  const w = meta.width || 2000
  await sharp(file).resize({ width: Math.min(w, 1600) }).toFile(join(outDir, `${name}.jpg`))
}

const files = await walk(SRC)
await Promise.all(files.map(buildOne))
console.log(`Optimized ${files.length} source files`)