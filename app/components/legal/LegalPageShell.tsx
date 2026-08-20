import Link from "next/link";
import type { ReactNode } from "react";

interface LegalPageShellProps {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  children: ReactNode;
}

const LEGAL_LINKS = [
  { href: "/terminos-y-condiciones", label: "Términos y Condiciones" },
  { href: "/politica-de-privacidad", label: "Política de Privacidad" },
  { href: "/politica-de-cookies", label: "Política de Cookies" },
] as const;

/**
 * Contenedor visual compartido por las páginas legales.
 * Mantiene la paleta de marca y una tipografía cómoda de leer en textos largos.
 */
export function LegalPageShell({
  eyebrow,
  title,
  intro,
  lastUpdated,
  children,
}: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221]">
      <section className="border-b border-[#f1e4dc] bg-white pt-40 pb-16">
        <div className="container mx-auto max-w-3xl px-6">
          <span className="mb-6 inline-block rounded-full bg-[#fbf6f3] px-5 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#a5846e]">
            {eyebrow}
          </span>
          <h1 className="mb-6 font-serif text-4xl leading-tight tracking-tight text-[#4a3221] md:text-5xl">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-[#7d5a44]">
            {intro}
          </p>
          <p className="mt-8 text-xs font-medium uppercase tracking-widest text-[#a5846e]">
            Última actualización: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-3xl px-6">
          <article className="legal-prose space-y-10">{children}</article>

          <nav
            aria-label="Otros documentos legales"
            className="mt-20 rounded-[2rem] border border-[#f1e4dc] bg-white p-8"
          >
            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-[#a5846e]">
              Documentos relacionados
            </p>
            <div className="flex flex-col gap-3 text-sm font-medium text-[#7d5a44] sm:flex-row sm:flex-wrap sm:gap-8">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-[#5c3a21]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

/** Sección numerada con título accesible y ancla estable. */
export function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="mb-4 font-serif text-2xl leading-snug text-[#5c3a21]">
        {title}
      </h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-[#6b4c37]">
        {children}
      </div>
    </section>
  );
}

/** Lista con viñetas con el estilo de marca. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="ml-1 space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a288]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
