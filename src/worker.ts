const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"
const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

const REQUIRED_FIELDS = ["nombre", "email", "empresa", "mensaje"] as const

interface Env {
  ASSETS: { fetch: typeof fetch }
  TURNSTILE_SECRET_KEY: string
  WEB3FORMS_ACCESS_KEY: string
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  })
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return json(400, {
      success: false,
      message: "Solicitud inválida. Inténtalo de nuevo.",
    })
  }

  const captchaToken =
    typeof payload.turnstile === "string" ? payload.turnstile.trim() : ""
  if (!captchaToken) {
    return json(400, {
      success: false,
      message: "Completa la verificación de seguridad antes de enviar.",
    })
  }

  for (const field of REQUIRED_FIELDS) {
    const value = payload[field]
    if (typeof value !== "string" || !value.trim()) {
      return json(400, {
        success: false,
        message: "Revisa los campos marcados y vuelve a intentar.",
      })
    }
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.WEB3FORMS_ACCESS_KEY) {
    return json(500, {
      success: false,
      message: "No pudimos enviar tu solicitud. Inténtalo más tarde.",
    })
  }

  const verify = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
    method: "POST",
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: captchaToken,
      remoteip: request.headers.get("CF-Connecting-IP") || "",
    }),
  })

  const verification = (await verify.json()) as { success: boolean }
  if (!verification.success) {
    return json(400, {
      success: false,
      message:
        "La verificación de seguridad no fue válida. Inténtalo de nuevo.",
    })
  }

  const web3forms = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: env.WEB3FORMS_ACCESS_KEY,
      subject: `Diagnóstico Qbits Global — ${(payload.empresa as string).trim()}`,
      from_name: (payload.nombre as string).trim(),
      nombre: (payload.nombre as string).trim(),
      email: (payload.email as string).trim(),
      empresa: (payload.empresa as string).trim(),
      telefono: (
        typeof payload.telefono === "string" ? payload.telefono : ""
      ).trim(),
      mensaje: (payload.mensaje as string).trim(),
    }),
  })

  const data = (await web3forms.json().catch(() => ({}))) as {
    success?: boolean
  }

  if (!web3forms.ok || !data.success) {
    return json(502, {
      success: false,
      message:
        "No pudimos enviar tu solicitud. Inténtalo de nuevo en un momento.",
    })
  }

  return json(200, { success: true, message: "SUCCESS" })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleContact(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}