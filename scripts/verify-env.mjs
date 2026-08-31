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

if (
  env.VITE_WEB3FORMS_ACCESS_KEY ||
  process.env.VITE_WEB3FORMS_ACCESS_KEY
) {
  console.error(
    "[verify-env] VITE_WEB3FORMS_ACCESS_KEY no debe vivir en el bundle del cliente. Quítala de .env y de las variables del proyecto; se configura como secreto del Worker (wrangler pages secret put WEB3FORMS_ACCESS_KEY).",
  )
  process.exit(1)
}

console.log("[verify-env] OK: sin claves sensibles en el bundle.")