import { useRef, useState } from "react"
import type { FormEvent } from "react"
import { toast } from "sonner"
import { Turnstile } from "@marsidev/react-turnstile"
import type { TurnstileInstance } from "@marsidev/react-turnstile"
import SectionHeading from "./Section"
import { TURNSTILE_SITE_KEY, WEB3FORMS_ACCESS_KEY } from "@/config"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type FormState = {
  nombre: string
  email: string
  empresa: string
  telefono: string
  mensaje: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialForm: FormState = {
  nombre: "",
  email: "",
  empresa: "",
  telefono: "",
  mensaje: "",
}

const contactStrip = "info@qbitsglobal.com · Respuesta en 48 h hábiles"

function FieldError({ message }: { message: string }) {
  return <p className="font-mono text-xs text-destructive">{message}</p>
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.nombre.trim()) {
    errors.nombre = "Ingresa tu nombre."
  }
  if (!form.email.trim()) {
    errors.email = "Ingresa tu correo."
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = "El correo no parece válido."
  }
  if (!form.empresa.trim()) {
    errors.empresa = "¿Qué empresa representas?"
  }
  if (form.telefono.trim() && !/^[+\d][\d\s().-]{6,}$/.test(form.telefono.trim())) {
    errors.telefono = "El teléfono no parece válido."
  }
  if (!form.mensaje.trim()) {
    errors.mensaje = "Cuéntanos brevemente tu reto."
  }
  return errors
}

export default function Contacto() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [captchaToken, setCaptchaToken] = useState<string>("")
  const [enviando, setEnviando] = useState(false)
  const turnstileRef = useRef<TurnstileInstance>(null)

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Revisa los campos marcados y vuelve a intentar.")
      return
    }
    if (!captchaToken) {
      toast.error("Completa la verificación de seguridad antes de enviar.")
      return
    }

    setEnviando(true)
    try {
      const verification = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ turnstile: captchaToken }),
      })

      const verificationData = await verification.json()
      if (!verification.ok || !verificationData.success) {
        throw new Error(
          verificationData.message ||
            "La verificación de seguridad no fue válida.",
        )
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Diagnóstico Qbits Global — ${form.empresa.trim()}`,
          from_name: form.nombre.trim(),
          botcheck: "",
          nombre: form.nombre.trim(),
          email: form.email.trim(),
          empresa: form.empresa.trim(),
          telefono: form.telefono.trim(),
          mensaje: form.mensaje.trim(),
        }),
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || "No se pudo enviar la solicitud.")
      }

      toast.success("¡Solicitud enviada! Te responderemos en 48 h hábiles.")
      setForm(initialForm)
      setCaptchaToken("")
      turnstileRef.current?.reset()
    } catch (err) {
      console.error(err)
      toast.error(
        "No pudimos enviar tu solicitud. Inténtalo de nuevo en un momento.",
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section
      id="contacto"
      className="relative overflow-hidden border-t border-line bg-bg-muted scroll-mt-20 py-20 md:py-28"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 md:px-8">
        <SectionHeading
          align="center"
          title={
            <>
              Solicita tu <span className="text-accent-2">diagnóstico</span> de
              arquitectura.
            </>
          }
          description="Cuéntanos cuál es tu reto. En las próximas 48 horas recibes un punto de vista técnico y comercial sobre tu sistema: claro, directo y accionable."
        />

        <p className="mt-8 border-t border-line pt-6 font-mono text-xs tracking-widest text-muted uppercase">
          {contactStrip}
        </p>

        <div className="mt-10 w-full max-w-2xl rounded-xl border border-line bg-panel p-6 md:p-8">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="nombre"
                  className="font-mono text-xs tracking-widest text-muted uppercase"
                >
                  Nombre *
                </Label>
                <Input
                  id="nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Ana Martínez"
                  value={form.nombre}
                  onChange={handleChange("nombre")}
                  aria-invalid={Boolean(errors.nombre)}
                  className="h-9 bg-white px-3"
                />
                {errors.nombre ? <FieldError message={errors.nombre} /> : null}
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="font-mono text-xs tracking-widest text-muted uppercase"
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="ana@empresa.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  aria-invalid={Boolean(errors.email)}
                  className="h-9 bg-white px-3"
                />
                {errors.email ? <FieldError message={errors.email} /> : null}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="empresa"
                  className="font-mono text-xs tracking-widest text-muted uppercase"
                >
                  Empresa *
                </Label>
                <Input
                  id="empresa"
                  type="text"
                  autoComplete="organization"
                  placeholder="Nombre de tu empresa"
                  value={form.empresa}
                  onChange={handleChange("empresa")}
                  aria-invalid={Boolean(errors.empresa)}
                  className="h-9 bg-white px-3"
                />
                {errors.empresa ? <FieldError message={errors.empresa} /> : null}
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="telefono"
                  className="font-mono text-xs tracking-widest text-muted uppercase"
                >
                  Teléfono / WhatsApp <span className="normal-case">(opcional)</span>
                </Label>
                <Input
                  id="telefono"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+57 300 123 4567"
                  value={form.telefono}
                  onChange={handleChange("telefono")}
                  aria-invalid={Boolean(errors.telefono)}
                  className="h-9 bg-white px-3"
                />
                {errors.telefono ? (
                  <FieldError message={errors.telefono} />
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="mensaje"
                className="font-mono text-xs tracking-widest text-muted uppercase"
              >
                Mensaje *
              </Label>
              <Textarea
                id="mensaje"
                rows={4}
                placeholder="¿Qué sistema, proceso o problema quieres optimizar?"
                value={form.mensaje}
                onChange={handleChange("mensaje")}
                aria-invalid={Boolean(errors.mensaje)}
                className="resize-none bg-white px-3"
              />
              {errors.mensaje ? <FieldError message={errors.mensaje} /> : null}
            </div>

            <div className="flex items-center justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken("")}
                onError={() => setCaptchaToken("")}
                options={{ language: "es", size: "flexible" }}
                className="overflow-hidden"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={enviando}
              className="mt-1 h-10 bg-accent-2 px-6 font-mono text-sm font-bold text-white hover:bg-accent-2-strong hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {enviando ? "Enviando…" : "Enviar solicitud →"}
            </Button>

            <p className="font-mono text-xs leading-relaxed text-muted/70">
              Al enviar, tu solicitud llega directo a nuestro equipo sin
              intermediarios. Sin compromiso: el diagnóstico es la puerta de
              entrada de una relación de ingeniería, no una venta.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
