import { resolve } from "node:path"
import { readFileSync } from "node:fs"

let env = {}
try {
  const raw = readFileSync(resolve(".env"), "utf8")
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/)
    if (match) {
      env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2").trim()
    }
  }
} catch {
  env = {}
}

const localSecret = env.TURNSTILE_SECRET_KEY
const exposeViaVite = Object.keys(process.env).some((key) => {
  if (!key.startsWith("VITE_")) return false
  const val = process.env[key]
  return (
    /TURNSTILE_SECRET/.test(key) ||
    (typeof val === "string" && /TURNSTILE_SECRET/.test(val))
  )
})

if (localSecret || exposeViaVite) {
  console.error(
    "[verify-env] TURNSTILE_SECRET_KEY no debe ir al bundle del cliente. No la declares en .env ni como variable VITE_*; se configura como secreto del Worker (wrangler secret put TURNSTILE_SECRET_KEY --name qbits-global).",
  )
  process.exit(1)
}

console.log("[verify-env] OK: sin secretos expuestos al bundle.")