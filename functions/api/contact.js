const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit"
const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"

const REQUIRED_FIELDS = ["nombre", "email", "empresa", "mensaje"]

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  })
}

export async function onRequestPost(context) {
  const { request, env } = context

  let payload
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

  const verification = await verify.json()
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
      subject: `Diagnóstico Qbits Global — ${payload.empresa.trim()}`,
      from_name: payload.nombre.trim(),
      nombre: payload.nombre.trim(),
      email: payload.email.trim(),
      empresa: payload.empresa.trim(),
      telefono: (typeof payload.telefono === "string" ? payload.telefono : "").trim(),
      mensaje: payload.mensaje.trim(),
    }),
  })

  const data = await web3forms.json().catch(() => ({}))

  if (!web3forms.ok || !data.success) {
    return json(502, {
      success: false,
      message:
        "No pudimos enviar tu solicitud. Inténtalo de nuevo en un momento.",
    })
  }

  return json(200, { success: true, message: "SUCCESS" })
}