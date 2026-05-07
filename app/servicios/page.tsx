import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/content/services';
import { formatServicePrice } from '@/lib/content/service-utils';
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from '@/lib/seo/site';

const description = `Protocolos faciales en ${LOCAL_SEO.city}: limpiezas, acné, manchas, regeneración y más en ${SITE_NAME}. Dirección ${LOCAL_SEO.addressStreet}.`;

export const metadata: Metadata = {
  title: 'Servicios',
  description,
  keywords: ['servicios estética Barranquilla', 'tratamientos faciales', SITE_NAME, 'Alto Prado'],
  alternates: { canonical: `${getSiteUrl()}/servicios` },
  openGraph: {
    title: `Servicios | ${SITE_NAME} ${LOCAL_SEO.city}`,
    description,
    url: `${getSiteUrl()}/servicios`,
    locale: 'es_CO',
  },
};

export default function ServiciosIndexPage() {
  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] selection:bg-[#d4b499] selection:text-white">
      <section className="relative flex items-center justify-center pb-20 pt-48 text-center">
        <div className="container relative z-10 mx-auto px-6">
          <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">Glow Skin</span>
          <div className="mb-8 h-px w-24 bg-[#d4b499] mx-auto" />
          <h1 className="font-serif text-5xl leading-none tracking-tight text-[#4a3221] md:text-[8rem]">
            Servicios
          </h1>
          <div className="mx-auto mt-8 mb-10 h-px w-24 bg-[#d4b499]" />
          <p className="mx-auto max-w-2xl text-lg font-medium italic leading-relaxed tracking-wide text-[#7d5a44] text-balance md:text-xl">
            
            Elige el protocolo que tu piel necesita; cada ficha incluye detalles y precio orientativo.
            
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 pb-40 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-28">
          {SERVICES_DATA.categories.map((category) => (
            <div key={category.id}>
              <div className="mb-10 text-center md:text-left">
                <h2 className="font-serif text-3xl tracking-tight text-[#4a3221] md:text-4xl">{category.title}</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm font-medium text-[#7d5a44] opacity-90 md:mx-0">
                  {category.description}
                </p>
                <div className="mx-auto mt-6 h-px w-16 bg-[#d4b499] md:mx-0" />
              </div>
              <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {category.services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/servicios/${service.id}`}
                      className="group flex h-full flex-col justify-between gap-4 rounded-[2rem] border border-[#d4b499]/20 bg-white p-8 shadow-sm transition-all hover:border-[#d4b499]/45 hover:shadow-lg"
                    >
                      <div>
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <h3 className="text-left font-serif text-xl leading-snug text-[#4a3221] transition-colors group-hover:text-[#5c3a21] md:text-2xl">
                            {service.name}
                          </h3>
                          <ChevronRight
                            size={22}
                            className="mt-1 shrink-0 text-[#d4b499] transition-transform group-hover:translate-x-0.5"
                            aria-hidden
                          />
                        </div>
                        <p className="text-left text-sm font-medium leading-relaxed text-[#7d5a44] opacity-90">
                          {service.description}
                        </p>
                      </div>
                      <p className="text-left font-serif text-lg italic text-[#d4b499]">
                        {formatServicePrice(service.price, service.currency)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>
    </div>
  );
}
