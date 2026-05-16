"use client";
import Link from "next/link";
import landingPages from "@/app/landing-pages.config";
import { usePathname } from "next/navigation";
import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import {
  SITE_FOOTER_LOGO_URL,
  INSTAGRAM_URL,
  ADDRESS_LINES,
  HOURS_LINES,
} from "@/app/components/site-config";

export function SiteFooter() {
  const pathname = usePathname();
  // ... otros hooks si los hay
  if (landingPages.includes(pathname)) return <></>;
  return (
    <footer className="bg-white pt-32 pb-12 border-t border-[#f1e4dc]">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
        <div>
          {/* Considera usar <Image /> de next/image para optimización */}
          <Image
            src={SITE_FOOTER_LOGO_URL}
            alt="Glow Skin by Sofía Nieto Aesthetics: logo con iniciales GS y perfil facial minimalista"
            width={160}
            height={160}
            className="mb-8 h-28 w-28 object-contain object-left sm:h-32 sm:w-32"
            loading="lazy"
            decoding="async"
          />
          <p className="text-[#7d5a44] text-sm leading-relaxed mb-10 opacity-70">
            Elevando el estándar de la estética facial en Barranquilla con un
            enfoque humano y científico.
          </p>
          <div className="flex gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-[#fbf6f3] flex items-center justify-center text-[#5c3a21] hover:bg-[#5c3a21] hover:text-white"
            >
              <Image
                src="/icons/logo-instagram.svg"
                alt="Instagram"
                width={22}
                height={22}
                loading="lazy"
                decoding="async"
              />
            </a>
            <button
              type="button"
              aria-label="WhatsApp"
              onClick={() => {
                if (typeof window !== "undefined") {
                  // @ts-expect-error
                  if (window.__LEAD_FORMS__?.openContact)
                    window.__LEAD_FORMS__.openContact();
                }
              }}
              className="w-10 h-10 rounded-full bg-[#fbf6f3] flex items-center justify-center text-[#5c3a21] hover:bg-[#5c3a21] hover:text-white transition-all"
            >
              <Image
                src="/icons/logo-whatsapp.svg"
                alt="WhatsApp"
                width={22}
                height={22}
                priority={false}
              />
            </button>
            <a
              href="tel:+573008883486"
              aria-label="Llamar"
              className="w-10 h-10 rounded-full bg-[#fbf6f3] flex items-center justify-center text-[#5c3a21] hover:bg-[#5c3a21] hover:text-white transition-all"
            >
              <Image
                src="/icons/call-outline.svg"
                alt="Llamar"
                width={22}
                height={22}
                priority={false}
              />
            </a>
          </div>
        </div>
        <div>
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#a5846e] mb-8">
            Tratamientos
          </p>
          <div className="flex flex-col gap-4 text-sm font-medium text-[#7d5a44]">
            <Link
              href="/#servicios"
              className="hover:text-[#5c3a21] transition-colors"
            >
              Limpieza Profunda
            </Link>
            <Link
              href="/#servicios"
              className="hover:text-[#5c3a21] transition-colors"
            >
              Control Acné
            </Link>
            <Link
              href="/#servicios"
              className="hover:text-[#5c3a21] transition-colors"
            >
              Peeling Químico
            </Link>
          </div>
        </div>
        <div>
          <p className="font-bold text-[10px] uppercase tracking-widest text-[#a5846e] mb-8">
            Navegación
          </p>
          <div className="flex flex-col gap-4 text-sm font-medium text-[#7d5a44]">
            <Link
              href="/#filosofia"
              className="hover:text-[#5c3a21] transition-colors"
            >
              Nosotros
            </Link>
            <Link
              href="/casos"
              className="hover:text-[#5c3a21] transition-colors"
            >
              Resultados
            </Link>
            <Link
              href="/precios"
              className="hover:text-[#5c3a21] transition-colors"
            >
              Precios
            </Link>
            <Link
              href="/blog"
              className="hover:text-[#5c3a21] transition-colors"
            >
              Blog
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
