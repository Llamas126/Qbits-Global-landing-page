const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

interface Env {
  ASSETS: { fetch: typeof fetch }
  TURNSTILE_SECRET_KEY: string
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

async function handleVerification(request: Request, env: Env): Promise<Response> {
  let payload: { turnstile?: string }
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

  if (!env.TURNSTILE_SECRET_KEY) {
    return json(500, {
      success: false,
      message: "No pudimos verificar tu solicitud. Inténtalo más tarde.",
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

  return json(200, { success: true, message: "SUCCESS" })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === "/api/contact" && request.method === "POST") {
      return handleVerification(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}