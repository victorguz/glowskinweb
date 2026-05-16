"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { SITE_LOGO_URL } from "@/app/components/site-config";
import { BookingCtaButtons } from "@/app/components/marketing/BookingCtaButtons";

const NAV_LINKS: {
  label: string;
  href: string;
  match: (path: string) => boolean;
}[] = [
  { label: "Servicios", href: "/servicios", match: (p) => p === "/servicios" },
  { label: "Nosotros", href: "/nosotros", match: (p) => p === "/nosotros" },
  { label: "Precios", href: "/precios", match: (p) => p === "/precios" },
  { label: "Blog", href: "/blog", match: (p) => p.startsWith("/blog") },
  {
    label: "Resultados",
    href: "/casos",
    match: (p) => p === "/casos" || p === "/casos2",
  },
];

function getScrollY() {
  if (typeof window === "undefined") return 0;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(800);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      setScrollY(getScrollY());
      setViewportH(window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  /** En /nosotros el hero es 100vh: texto claro solo ahí; al bajar, blur + marrón como el resto del sitio. */
  const nosotrosPastHero =
    pathname === "/nosotros" && scrollY > viewportH * 0.9;
  const useGlassNav =
    pathname === "/nosotros" ? nosotrosPastHero : scrollY > 80;
  const onDarkHero = pathname === "/nosotros" && !nosotrosPastHero;

  // Evita setState directo en efecto: usa un flag para evitar render en el primer montaje
  useEffect(() => {
    let first = true;
    if (first) {
      first = false;
      return;
    }
    setIsMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const linkClass = (active: boolean) =>
    onDarkHero
      ? active
        ? "text-white border-b border-[#d4b499] pb-0.5"
        : "text-white/90 hover:text-white transition-all"
      : active
        ? "text-[#5c3a21] border-b border-[#a5846e] pb-0.5"
        : "text-[#7d5a44] hover:text-[#5c3a21] transition-all";

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          useGlassNav
            ? "bg-white/80 backdrop-blur-xl border-b border-[#a5846e]/10 py-3 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="h-10 md:h-12 shrink-0">
              <Image
                src={SITE_LOGO_URL}
                alt="Glow Skin"
                height={48}
                width={160}
                className={`h-full w-auto transition-[filter] duration-500 ${onDarkHero ? "brightness-0 invert" : ""}`}
                priority
                unoptimized={SITE_LOGO_URL.startsWith("http")}
              />
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
              {NAV_LINKS.map(({ label, href, match }) => {
                const isActive = match(pathname);
                return href.startsWith("/#") ? (
                  <a key={href} href={href} className={linkClass(isActive)}>
                    {label}
                  </a>
                ) : (
                  <Link key={href} href={href} className={linkClass(isActive)}>
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <BookingCtaButtons
              className="flex items-center gap-3"
              reserveHereClassName={`px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all shadow-xl transform active:scale-95 ${
                onDarkHero
                  ? "bg-[#f7f0eb] text-[#4a3221] hover:bg-white shadow-black/20"
                  : "bg-[#5c3a21] text-white hover:bg-[#a5846e] shadow-[#5c3a21]/20"
              }`}
              reserveWhatsappClassName={`px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all border ${
                onDarkHero
                  ? "border-white/40 text-white hover:bg-white/10"
                  : "border-[#5c3a21]/30 text-[#5c3a21] hover:bg-[#f7f0eb]"
              }`}
            />
          </div>

          <button
            type="button"
            className={`lg:hidden p-2 transition-colors ${onDarkHero ? "text-white" : "text-[#5c3a21]"}`}
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile menu — dos pantallas deslizantes */}
      <div
        className={`fixed inset-0 bg-white z-[60] flex flex-col overflow-hidden transition-all duration-500 lg:hidden ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Header fijo con botón cerrar / volver */}
        <div className="relative flex items-center justify-between px-8 pt-10 pb-4 shrink-0">
          {mobileServicesOpen ? (
            <button
              type="button"
              onClick={() => setMobileServicesOpen(false)}
              className="flex items-center gap-2 text-[#7d5a44] text-sm font-bold uppercase tracking-widest"
              aria-label="Volver"
            >
              <ChevronDown size={18} className="rotate-90" />
              Volver
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              setMobileServicesOpen(false);
            }}
            className="p-3 bg-[#fbf6f3] rounded-full"
            aria-label="Cerrar menú"
          >
            <X size={28} />
          </button>
        </div>

        {/* Carrusel de dos pantallas */}
        <div
          className="flex flex-1 min-h-0 transition-transform duration-500 ease-in-out"
          style={{
            width: "200%",
            transform: mobileServicesOpen
              ? "translateX(-50%)"
              : "translateX(0)",
          }}
        >
          {/* Pantalla 1: menú principal */}
          <div className="w-1/2 flex flex-col overflow-y-auto overscroll-contain px-8 pb-12">
            {NAV_LINKS.map(({ label, href }) => {
              const isAnchor = href.startsWith("/#");
              return (
                <div key={href} className="border-b border-[#d4b499]/15 py-5">
                  {isAnchor ? (
                    <a
                      href={href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="block text-4xl font-serif text-[#5c3a21]"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="block text-4xl font-serif text-[#5c3a21]"
                    >
                      {label}
                    </Link>
                  )}
                </div>
              );
            })}

            <BookingCtaButtons
              className="mt-10 flex flex-col gap-3"
              reserveHereClassName="bg-[#5c3a21] text-white px-10 py-4 rounded-full text-sm font-bold text-center uppercase tracking-[0.2em]"
              reserveWhatsappClassName="border border-[#5c3a21]/30 text-[#5c3a21] px-10 py-4 rounded-full text-sm font-bold text-center uppercase tracking-[0.2em]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
