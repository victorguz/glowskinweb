'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_LOGO_URL } from '@/app/components/site-config';
import { LeadTrigger } from '@/app/components/marketing/LeadTrigger';

const NAV_LINKS: { label: string; href: string; match: (path: string) => boolean }[] = [
  { label: 'Servicios', href: '/#servicios', match: () => false },
  { label: 'Nosotros', href: '/nosotros', match: (p) => p === '/nosotros' },
  { label: 'Precios', href: '/precios', match: (p) => p === '/precios' },
  { label: 'Blog', href: '/blog', match: (p) => p.startsWith('/blog') },
  { label: 'Resultados', href: '/casos', match: (p) => p === '/casos' || p === '/casos2' },
];

function getScrollY() {
  if (typeof window === 'undefined') return 0;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(800);

  useEffect(() => {
    const update = () => {
      setScrollY(getScrollY());
      setViewportH(window.innerHeight);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  /** En /nosotros el hero es 100vh: texto claro solo ahí; al bajar, blur + marrón como el resto del sitio. */
  const nosotrosPastHero = pathname === '/nosotros' && scrollY > viewportH * 0.9;
  const useGlassNav =
    pathname === '/nosotros' ? nosotrosPastHero : scrollY > 80;
  const onDarkHero = pathname === '/nosotros' && !nosotrosPastHero;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const linkClass = (active: boolean) =>
    onDarkHero
      ? active
        ? 'text-white border-b border-[#d4b499] pb-0.5'
        : 'text-white/90 hover:text-white transition-all'
      : active
        ? 'text-[#5c3a21] border-b border-[#a5846e] pb-0.5'
        : 'text-[#7d5a44] hover:text-[#5c3a21] transition-all';

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${useGlassNav
            ? 'bg-white/80 backdrop-blur-xl border-b border-[#a5846e]/10 py-3 shadow-lg'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="h-10 md:h-12 shrink-0">
              <img
                src={SITE_LOGO_URL}
                alt="Glow Skin"
                className={`h-full w-auto transition-[filter] duration-500 ${onDarkHero ? 'brightness-0 invert' : ''}`}
              />
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold">
              {NAV_LINKS.map(({ label, href, match }) => {
                const isActive = match(pathname);
                return href.startsWith('/#') ? (
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
            <LeadTrigger
              mode="contact"
              className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-colors ${
                onDarkHero ? 'text-white/90 hover:text-white' : 'text-[#a5846e] hover:text-[#5c3a21]'
              }`}
            >
              ESCRÍBENOS
            </LeadTrigger>
            <LeadTrigger
              mode="booking"
              className={`px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all shadow-xl transform active:scale-95 ${
                onDarkHero
                  ? 'bg-[#f7f0eb] text-[#4a3221] hover:bg-white shadow-black/20'
                  : 'bg-[#5c3a21] text-white hover:bg-[#a5846e] shadow-[#5c3a21]/20'
              }`}
            >
              Reservar Ahora
            </LeadTrigger>
          </div>

          <button
            type="button"
            className={`lg:hidden p-2 transition-colors ${onDarkHero ? 'text-white' : 'text-[#5c3a21]'}`}
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center transition-all duration-700 lg:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-8 right-8 p-3 bg-[#fbf6f3] rounded-full"
          aria-label="Cerrar menú"
        >
          <X size={32} />
        </button>
        <div className="flex flex-col gap-8 text-center px-6">
          {NAV_LINKS.map(({ label, href }) => {
            const isAnchor = href.startsWith('/#');
            return isAnchor ? (
              <a
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif text-[#5c3a21]"
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-serif text-[#5c3a21]"
              >
                {label}
              </Link>
            );
          })}
          <LeadTrigger
            mode="booking"
            className="mt-8 bg-[#5c3a21] text-white px-12 py-5 rounded-full text-lg font-bold"
          >
            Agenda tu Cita
          </LeadTrigger>
        </div>
      </div>
    </>
  );
}
