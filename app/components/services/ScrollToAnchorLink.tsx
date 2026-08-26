"use client";

type ScrollToAnchorLinkProps = {
  targetId: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Ancla que fuerza un scroll suave explícito en vez de depender del salto
 * nativo del navegador. Clarity registraba "Ver detalles" como dead click en
 * ~47% de las sesiones de /servicios/limpieza-facial — el link sí funcionaba,
 * pero el salto instantáneo del navegador no daba suficiente señal visual de
 * que el tap tuvo efecto. El fallback href="#id" se conserva para no-JS.
 */
export function ScrollToAnchorLink({
  targetId,
  className,
  children,
}: ScrollToAnchorLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={className}
      onClick={(event) => {
        const target = document.getElementById(targetId);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </a>
  );
}
