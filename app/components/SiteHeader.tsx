'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_LOGO_URL, WA_LINK } from '@/app/components/site-config';

const NAV_LINKS: { label: string; href: string; match: (path: string) => boolean }[] = [
  { label: 'Servicios', href: '/#servicios', match: () => false },
  { label: 'Nosotros', href: '/nosotros', match: (p) => p === '/nosotros' },
  { label: 'Precios', href: '/precios', match: (p) => p === '/precios' },
  { label: 'Resultados', href: '/casos', match: (p) => p === '/casos' || p === '/casos2' },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    active
      ? 'text-[#5c3a21] border-b border-[#a5846e] pb-0.5'
      : 'hover:text-[#5c3a21] transition-all';

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-[#a5846e]/10 py-3 shadow-lg'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="h-10 md:h-12 shrink-0">
              <img src={SITE_LOGO_URL} alt="Glow Skin" className="h-full w-auto" />
            </Link>
            <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-[#7d5a44]">
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
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#a5846e] hover:text-[#5c3a21] transition-colors"
            >
              ESCRÍBENOS
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#5c3a21] text-white px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#a5846e] transition-all shadow-xl shadow-[#5c3a21]/20 transform active:scale-95"
            >
              Reservar Ahora
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-[#5c3a21]"
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
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 bg-[#5c3a21] text-white px-12 py-5 rounded-full text-lg font-bold"
          >
            Agenda tu Cita
          </a>
        </div>
      </div>
    </>
  );
}
