import { readFileSync } from "node:fs"
import { resolve } from "node:path"

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

const siteKey = env.VITE_TURNSTILE_SITE_KEY
if (!siteKey) {
  console.error(
    "[verify-env] Falta VITE_TURNSTILE_SITE_KEY en .env. Sin ella el antispam (Cloudflare Turnstile) no se renderiza en producción.",
  )
  process.exit(1)
}

if (env.VITE_WEB3FORMS_ACCESS_KEY) {
  console.error(
    "[verify-env] VITE_WEB3FORMS_ACCESS_KEY no debe vivir en el bundle del cliente. Quítala de .env; se configura como secreto del Worker (wrangler pages secret put WEB3FORMS_ACCESS_KEY).",
  )
  process.exit(1)
}

console.log(
  "[verify-env] OK: VITE_TURNSTILE_SITE_KEY presente y sin claves sensibles en el bundle.",
)