import type { ReactNode } from "react"

type SectionHeadingProps = {
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
}

export default function SectionHeading({
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass =
    align === "center" ? "items-center text-center" : "items-start text-left"

  return (
    <header className={`flex flex-col gap-4 ${alignClass}`}>
      <h2 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  )
}