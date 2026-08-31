export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel-2/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="flex flex-col gap-3">
          <a href="#inicio" className="group flex items-center gap-3">
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-lg border border-line bg-accent-light transition-shadow group-hover:shadow-md">
              <img
                src="/qbits-isotipo.svg"
                alt="Qbits Global"
                width={40}
                height={40}
                className="size-8"
                loading="lazy"
              />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-fg-strong">
              Qbits <span className="text-muted">Global</span>
            </span>
          </a>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Ingenieros de rentabilidad. Sistemas dinámicos, composables y
            autónomos.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-16 gap-y-3" aria-label="Footer">
          <a
            href="#overview"
            className="text-sm text-muted transition-colors hover:text-accent-2"
          >
            Overview
          </a>
          <a
            href="#adn"
            className="text-sm text-muted transition-colors hover:text-accent-2"
          >
            ADN
          </a>
          <a
            href="#pilares"
            className="text-sm text-muted transition-colors hover:text-accent-2"
          >
            Pilares
          </a>
          <a
            href="#compania"
            className="text-sm text-muted transition-colors hover:text-accent-2"
          >
            Compañía
          </a>
          <a
            href="#contacto"
            className="text-sm text-muted transition-colors hover:text-accent-2"
          >
            Contacto
          </a>
          <a
            href="mailto:info@qbitsglobal.com"
            className="text-sm text-muted transition-colors hover:text-accent-2"
          >
            info@qbitsglobal.com
          </a>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Qbits Global S.A.S.
          </p>
          <p className="font-mono text-xs text-muted">
            Hecho con rigor en Barranquilla, Colombia.
          </p>
        </div>
      </div>
    </footer>
  )
}