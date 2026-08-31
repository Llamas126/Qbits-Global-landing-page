import SectionHeading from "./Section"

const valueProps = [
  {
    title: "Tecnología como inversión",
    body: "Cada sistema produce valor medible, sin sumar costos de mantenimiento.",
  },
  {
    title: "Arquitecturas composables",
    body: "Módulos que se combinan y evolucionan sin reescribir tu negocio.",
  },
  {
    title: "Autonomía operativa",
    body: "La automatización libera a tu equipo para lo estratégico.",
  },
]

export default function Overview() {
  return (
    <section id="overview" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <SectionHeading
            align="center"
            title={
              <>
                Donde otros ven un problema de software, nosotros vemos una{" "}
                <span className="text-accent-2">arquitectura comercial</span>{" "}
                esperando ser optimizada.
              </>
            }
          />

          <div className="mt-10 w-full max-w-2xl border-t border-accent-2/40" />

          <p className="mt-10 text-lg leading-relaxed text-fg">
            Qbits Global es una firma de ingeniería de software, SaaS y
            automatización con base en Barranquilla. Trabajamos como socios:
            entendemos tu modelo de negocio y medimos cada esfuerzo por su
            impacto comercial.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-panel-2 shadow-sm">
            <img
              src="/images/overview-product.jpg"
              alt="Equipo de Qbits Global revisando métricas de un producto"
              width={800}
              height={600}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          </div>

          <ul className="flex flex-col divide-y divide-line">
            {valueProps.map((prop) => (
              <li key={prop.title} className="group flex flex-col gap-1 py-5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-accent-2" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-fg-strong">
                    {prop.title}
                  </h3>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-muted">
                  {prop.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
