import sharp from "sharp"
import { readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, "..", "public")
const svg = await readFile(join(publicDir, "favicon.svg"))

const sizes = {
  "favicon-16x16.png": 16,
  "favicon-32x32.png": 32,
  "favicon-48x48.png": 48,
  "apple-touch-icon.png": 180,
  "android-chrome-192x192.png": 192,
  "android-chrome-512x512.png": 512,
}

for (const [name, size] of Object.entries(sizes)) {
  await sharp(svg).resize(size, size).png().toFile(join(publicDir, name))
  console.log(`generated ${name} (${size}px)`)
}

const icoSizes = [16, 32, 48]
const pngs = await Promise.all(
  icoSizes.map((size) => sharp(svg).resize(size, size).png().toBuffer()),
)

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(icoSizes.length, 4)

const entries = []
const payloads = []
let offset = 6 + icoSizes.length * 16

for (let i = 0; i < icoSizes.length; i += 1) {
  const entry = Buffer.alloc(16)
  entry.writeUInt8(icoSizes[i] >= 256 ? 0 : icoSizes[i], 0)
  entry.writeUInt8(icoSizes[i] >= 256 ? 0 : icoSizes[i], 1)
  entry.writeUInt8(0, 2)
  entry.writeUInt8(0, 3)
  entry.writeUInt16LE(1, 4)
  entry.writeUInt16LE(32, 6)
  entry.writeUInt32LE(pngs[i].length, 8)
  entry.writeUInt32LE(offset, 12)
  entries.push(entry)
  payloads.push(pngs[i])
  offset += pngs[i].length
}

await writeFile(
  join(publicDir, "favicon.ico"),
  Buffer.concat([header, ...entries, ...payloads]),
)
console.log("generated favicon.ico (16/32/48px)")