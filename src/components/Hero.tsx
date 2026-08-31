const heroMetrics = [
  { value: "2026", label: "Fundación" },
  { value: "7", label: "Especialidades" },
  { value: "B2B", label: "Empresas tech" },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden border-b border-line">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-20%,rgba(51,98,161,0.06),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-32">
        <div className="flex flex-col gap-8">
          <h1 className="animate-fade-up font-display text-4xl leading-[1.12] font-bold tracking-tight text-balance text-fg-strong md:text-6xl">
            La tecnología estática es un pasivo. La tecnología{" "}
            <span className="text-accent-2">dinámica</span> es el motor del
            crecimiento.
          </h1>

          <p className="animate-fade-up delay-100 max-w-xl text-lg leading-relaxed text-muted">
            Somos ingenieros de rentabilidad: diseñamos sistemas dinámicos,
            composables y autónomos que convierten la tecnología en crecimiento
            medible para empresas B2B.
          </p>

          <div className="animate-fade-up delay-200 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="rounded-md bg-accent-2 px-6 py-3 font-mono text-sm font-bold text-white transition-all hover:bg-accent-2-strong hover:shadow-md"
            >
              Solicita tu diagnóstico →
            </a>
            <a
              href="#adn"
              className="rounded-md border border-line px-6 py-3 font-mono text-sm font-medium text-fg transition-colors hover:border-accent-2 hover:text-accent-2"
            >
              Explora nuestro ADN
            </a>
          </div>

          <dl className="animate-fade-up delay-300 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-6">
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="flex flex-col gap-1">
                <dt className="order-2 font-mono text-xs tracking-widest text-muted uppercase">
                  {metric.label}
                </dt>
                <dd className="order-1 font-display text-2xl font-bold text-fg-strong">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="animate-fade-up delay-200 hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-panel-2 shadow-sm">
            <img
              src="/images/hero-team.jpg"
              alt="Equipo de Qbits Global colaborando en un proyecto de software"
              width={720}
              height={900}
              loading="eager"
              className="absolute inset-0 size-full object-cover"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(to_top,rgba(26,34,51,0.35),transparent_55%)]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
