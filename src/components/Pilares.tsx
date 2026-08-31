import type { SVGProps } from "react"
import SectionHeading from "./Section"

type IconProps = SVGProps<SVGSVGElement>

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
}

function TrendingUpIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M22 7 13.5 15.5 8.5 10.5 2 17" />
      <path d="M16 7h6v6" />
    </svg>
  )
}

function GridIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
      <path d="m8.5 11.5 2.5 2.5 4.5-4.5" />
    </svg>
  )
}

function NodesIcon(props: IconProps) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="5" cy="6" r="3" />
      <circle cx="19" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M7.6 7.6 10.8 15.4" />
      <path d="M16.4 7.6 13.2 15.4" />
      <path d="M8 6h8" />
    </svg>
  )
}

const pillars = [
  {
    index: "01",
    title: "Ingeniería de Rentabilidad",
    body: "Cada línea de código se justifica por su impacto en el negocio: margen, velocidad y retorno. Medimos el software por lo que produce, no por lo que cuesta.",
    icon: TrendingUpIcon,
  },
  {
    index: "02",
    title: "Arquitectura Composable",
    body: "Sistemas modulares e interoperables que evolucionan con la empresa, sin costos de reescritura ni acoplamiento.",
    icon: GridIcon,
  },
  {
    index: "03",
    title: "Rigor y Gobierno TI · MGGTI",
    body: "Gobierno y gestión TI alineados a la Metodología General de Gobierno de TI: procesos auditables, decisiones trazables y operación predecible.",
    icon: ShieldCheckIcon,
  },
  {
    index: "04",
    title: "Generación de Confianza",
    body: "Transparencia, métricas y accountability. La confianza de nuestros clientes se construye en cada entrega, no en cada promesa.",
    icon: NodesIcon,
  },
]

export default function Pilares() {
  return (
    <section id="pilares" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title={
            <>
              Cuatro pilares sostienen{" "}
              <span className="text-accent-2">cada entrega</span>.
            </>
          }
          description="Ingeniería con criterio comercial, arquitectura que respira, gobierno riguroso y confianza que se gana."
        />

        <ol className="mx-auto mt-14 max-w-5xl divide-y divide-line">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <li
                key={pillar.index}
                className="group flex flex-col gap-6 py-9 sm:flex-row sm:gap-8"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-line bg-panel-2 text-accent-2 transition-all group-hover:border-accent-2 group-hover:shadow-md">
                  <Icon />
                </span>
                <div className="flex flex-col gap-3 border-l-2 border-accent-2 pl-6">
                  <p className="font-mono text-xs tracking-widest text-muted uppercase">
                    pilar {pillar.index}
                  </p>
                  <h3 className="font-display text-xl font-bold text-fg-strong md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {pillar.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}