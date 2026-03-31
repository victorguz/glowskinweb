import Link from 'next/link';
import { MapPin, Clock, Camera, Users } from 'lucide-react';
import {
  SITE_FOOTER_LOGO_URL,
  INSTAGRAM_URL,
  ADDRESS_LINES,
  HOURS_LINES,
} from '@/app/components/site-config';

export function SiteFooter() {
  return (
    <footer className="bg-white pt-32 pb-12 border-t border-[#f1e4dc]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div>
          <div className="mb-8 inline-flex rounded-2xl bg-black p-4 shadow-sm ring-1 ring-black/10">
            <img
              src={SITE_FOOTER_LOGO_URL}
              alt="Glow Skin by Sofía Nieto Aesthetics: logo con iniciales GS y perfil facial minimalista sobre fondo negro"
              width={160}
              height={160}
              className="h-28 w-28 object-contain sm:h-32 sm:w-32"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-[#7d5a44] text-sm leading-relaxed mb-10 opacity-70">
            Elevando el estándar de la estética facial en Barranquilla con un enfoque humano y
            científico.
          </p>
          <div className="flex gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-[#fbf6f3] flex items-center justify-center text-[#5c3a21] hover:bg-[#5c3a21] hover:text-white transition-all"
            >
              <Camera size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-[#fbf6f3] flex items-center justify-center text-[#5c3a21] hover:bg-[#5c3a21] hover:text-white transition-all"
            >
              <Users size={18} />
            </a>
          </div>
        </div>
        <div>
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#a5846e] mb-8">
            Tratamientos
          </p>
          <div className="flex flex-col gap-4 text-sm font-medium text-[#7d5a44]">
            <Link href="/#servicios" className="hover:text-[#5c3a21] transition-colors">
              Limpieza Profunda
            </Link>
            <Link href="/#servicios" className="hover:text-[#5c3a21] transition-colors">
              Control Acné
            </Link>
            <Link href="/#servicios" className="hover:text-[#5c3a21] transition-colors">
              Peeling Químico
            </Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#a5846e] mb-8">
            Navegación
          </p>
          <div className="flex flex-col gap-4 text-sm font-medium text-[#7d5a44]">
            <Link href="/#filosofia" className="hover:text-[#5c3a21] transition-colors">
              Nosotros
            </Link>
            <Link href="/casos" className="hover:text-[#5c3a21] transition-colors">
              Resultados
            </Link>
            <Link href="/precios" className="hover:text-[#5c3a21] transition-colors">
              Precios
            </Link>
          </div>
        </div>
        <div className="bg-[#fbf6f3] p-10 rounded-[2.5rem] border border-[#f1e4dc]">
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#5c3a21] mb-6">
            Ubicación
          </p>
          <div className="flex items-start gap-4 mb-8">
            <MapPin size={20} className="text-[#a5846e] shrink-0" />
            <p className="text-sm font-medium text-[#7d5a44]">
              {ADDRESS_LINES[0]} <br /> {ADDRESS_LINES[1]}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <Clock size={20} className="text-[#a5846e] shrink-0" />
            <p className="text-sm font-medium text-[#7d5a44]">
              {HOURS_LINES[0]} <br /> {HOURS_LINES[1]}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
