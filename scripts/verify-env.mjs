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

if (env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY) {
  console.error(
    "[verify-env] TURNSTILE_SECRET_KEY no debe vivir en el bundle del cliente ni en VITE_*. Se configura como secreto del Worker (wrangler secret put TURNSTILE_SECRET_KEY --name qbits-global).",
  )
  process.exit(1)
}

console.log("[verify-env] OK: sin secretos en el bundle.")