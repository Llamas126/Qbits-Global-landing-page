import type { SVGProps } from "react"
import SectionHeading from "./Section"

type IconProps = SVGProps<SVGSVGElement>

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
}

function CodeIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
    </svg>
  )
}

function LayersIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m12 2 9.5 5.5L12 13 2.5 7.5 12 2Z" />
      <path d="m2.5 12.5 9.5 5.5 9.5-5.5" />
      <path d="m2.5 17.5 9.5 5.5 9.5-5.5" opacity="0.5" />
    </svg>
  )
}

function TransformIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M21 12a9 9 0 0 1-15.6 6.4L3 16" />
      <path d="M3 12a9 9 0 0 1 15.6-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}

function BoltIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H13L13 2Z" />
    </svg>
  )
}

function LinkIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
      <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
    </svg>
  )
}

function BoxIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 2 2 7v10l10 5 10-5V7l-10-5Z" />
      <path d="M2 7l10 5 10-5" />
      <path d="M12 12v10" />
    </svg>
  )
}

function ComposeIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" opacity="0.5" />
    </svg>
  )
}

const services = [
  {
    index: "01",
    title: "Desarrollo a Medida",
    body: "Web, móvil y APIs hechas para tu lógica real, no plantillas.",
    icon: CodeIcon,
  },
  {
    index: "02",
    title: "Plataformas SaaS",
    body: "Productos multiusuario con facturación, roles y métricas.",
    icon: LayersIcon,
  },
  {
    index: "03",
    title: "Transformación Digital",
    body: "De procesos heredados a operación con datos en tiempo real.",
    icon: TransformIcon,
  },
  {
    index: "04",
    title: "Automatización de Procesos",
    body: "Workflows y agentes que liberan capacidad productiva.",
    icon: BoltIcon,
  },
  {
    index: "05",
    title: "Soluciones B2B",
    body: "Portales, integraciones y tableros para servir a otras empresas.",
    icon: LinkIcon,
  },
  {
    index: "06",
    title: "Agroindustria y Logística",
    body: "Trazabilidad y productividad del campo a la puerta.",
    icon: BoxIcon,
  },
  {
    index: "07",
    title: "Arquitectura Composable",
    body: "La base de todo: módulos que crecen y se reemplazan sin reescribir.",
    icon: ComposeIcon,
    featured: true,
  },
]

export default function Services() {
  return (
    <section
      id="adn"
      className="relative border-y border-line bg-bg-muted scroll-mt-20 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title={
              <>
                Siete especialidades, <br className="hidden md:block" />
                un mismo <span className="text-accent-2">criterio</span>.
              </>
            }
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted md:text-right">
            Cada especialidad comparte la misma obsesión: construir sistemas que
            produzcan.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.index}
                className={`group flex flex-col gap-4 rounded-xl border bg-panel p-6 transition-all hover:-translate-y-1 hover:border-accent-2 hover:shadow-md ${
                  service.featured
                    ? "border-accent-2/50 lg:col-span-2 lg:flex-row lg:items-center lg:gap-8 lg:p-8"
                    : "border-line"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-lg border border-line bg-panel-2 text-accent-2 transition-colors group-hover:border-accent-2/60">
                    <Icon />
                  </span>
                  <span className="font-mono text-xs tracking-widest text-muted">
                    {service.index}
                  </span>
                </div>
                <div className="flex flex-col gap-1 lg:max-w-3xl">
                  <h3 className="font-display text-lg font-bold text-fg-strong">
                    {service.title}
                  </h3>
                  <p className={`text-sm leading-relaxed text-muted`}>
                    {service.body}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
