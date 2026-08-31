import SectionHeading from "./Section"

export default function MisionVision() {
  return (
    <section id="compania" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title={
            <>
              Una misión clara, <br className="hidden md:block" />
              una visión <span className="text-accent-2">2031</span>.
            </>
          }
        />

        <div className="mt-14 grid overflow-hidden rounded-2xl border border-line md:grid-cols-2 md:divide-x md:divide-line">
          <article className="flex flex-col gap-5 bg-panel-2 p-8 md:p-10">
            <h3 className="font-display text-xl font-bold text-fg-strong md:text-2xl">
              Motores de rentabilidad
            </h3>
            <p className="text-base leading-relaxed text-muted">
              Diseñamos, construimos y operamos sistemas que funcionan como{" "}
              <span className="font-medium text-accent-2">
                motores de rentabilidad
              </span>
              : dinámicos, composables y autónomos, para empresas que quieren
              crecer de forma medible en{" "}
              <span className="font-medium text-fg">
                Colombia y América Latina
              </span>
              .
            </p>
          </article>

          <article className="relative flex flex-col gap-5 bg-panel p-8 md:p-10">
            <h3 className="font-display text-xl font-bold text-fg-strong md:text-2xl">
              Holding de referencia
            </h3>
            <p className="text-base leading-relaxed text-muted">
              Ser el holding que consolida talento, producto y capital desde
              Barranquilla, con sistemas que mueven industrias enteras en{" "}
              <span className="font-medium text-fg">
                Colombia y América Latina
              </span>
              .
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}