const links = [
  { href: "#overview", label: "Overview" },
  { href: "#adn", label: "ADN" },
  { href: "#pilares", label: "Pilares" },
  { href: "#compania", label: "Compañía" },
  { href: "#contacto", label: "Contacto" },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <a href="#inicio" className="group flex items-center gap-3">
          <span className="flex size-10 items-center justify-center overflow-hidden rounded-lg border border-line bg-accent-light transition-shadow group-hover:shadow-md">
            <img
              src="/qbits-isotipo.svg"
              alt="Qbits Global"
              width={40}
              height={40}
              className="size-8"
              loading="eager"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-fg-strong">
            Qbits <span className="text-muted">Global</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-accent-2"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="rounded-md bg-accent-2 px-4 py-2 font-mono text-sm font-bold text-white transition-all hover:bg-accent-2-strong hover:shadow-md"
        >
          Solicitar diagnóstico
        </a>
      </nav>
    </header>
  )
}