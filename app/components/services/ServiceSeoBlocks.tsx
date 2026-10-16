import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import {
  ADDRESS_LINES,
  HOURS_LINES,
  PHONE_DISPLAY,
} from "@/app/components/site-config";
import { getEnrichedPricingForService } from "@/lib/content/pricing-enriched";
import {
  getAllCategoryServices,
  type CategoryServicePair,
} from "@/lib/content/service-utils";
import { getServiceHref } from "@/lib/routing/service-routes";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Glow Skin Carrera 50 # 74-120 Barranquilla",
)}`;

/** Páginas de grupo y los servicios que reúnen (un servicio puede estar en varias). */
const SERVICE_HUBS: { href: string; label: string; ids: Set<string> }[] = [
  {
    href: "/peeling-facial",
    label: "Ver todos los peelings que hacemos",
    ids: new Set([
      "limpieza-seborreguladora",
      "tratamiento-despigmentante",
      "antiox-peel-pro",
      "hydraglow-antiox-peel",
    ]),
  },
  {
    href: "/rejuvenecimiento-facial",
    label: "Ver las opciones de rejuvenecimiento facial",
    ids: new Set([
      "microneedling-exosomas",
      "microneedling-exosomas-3-sesiones",
      "protocolo-pdrn",
      "protocolo-pdrn-3-sesiones",
      "antiox-peel-pro",
      "tratamiento-regenerative-plus",
    ]),
  },
];

/** Migas de pan visibles (el JSON-LD equivalente va en la página). */
export function ServiceBreadcrumbs({ serviceName }: { serviceName: string }) {
  return (
    <nav
      aria-label="Migas de pan"
      className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#a5846e]"
    >
      <ol className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <Link href="/" className="transition-colors hover:text-[#4a3221]">
            Inicio
          </Link>
        </li>
        <li aria-hidden>›</li>
        <li>
          <Link
            href="/servicios"
            className="transition-colors hover:text-[#4a3221]"
          >
            Servicios
          </Link>
        </li>
        <li aria-hidden>›</li>
        <li aria-current="page" className="text-[#4a3221]">
          {serviceName}
        </li>
      </ol>
    </nav>
  );
}

/** Línea visible de ciudad dentro del H1: "… en Barranquilla". */
export function CityLine() {
  return (
    <span className="mt-6 block font-sans text-[11px] font-black uppercase tracking-[0.45em] text-[#a5846e] md:text-sm">
      en Barranquilla
    </span>
  );
}

/** Precio, sesiones, duración y frecuencia, tomados de la lista de precios. */
export function ServicePriceCard({ serviceName }: { serviceName: string }) {
  const item = getEnrichedPricingForService(serviceName);
  if (!item) return null;

  const facts = [
    { label: "Sesiones", value: item.sessionsSummary },
    { label: "Duración", value: item.durationSummary },
    { label: "Frecuencia", value: item.frequencySummary },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <section
      aria-label={`Precio de ${serviceName}`}
      className="container mx-auto -mt-16 px-6 pb-4 lg:px-24"
    >
      <div className="relative z-10 mx-auto max-w-4xl rounded-[2rem] border border-[#d4b499]/30 bg-white p-8 shadow-[0_30px_80px_rgba(74,50,33,0.10)] md:p-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-end md:justify-between">
          <div className="shrink-0 text-center md:text-left">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#a5846e]">
              Precio
            </p>
            <p className="whitespace-nowrap font-serif text-5xl tracking-tight text-[#4a3221] md:text-6xl">
              {item.price}
            </p>
            {item.priceNote ? (
              <p className="mt-2 text-sm font-semibold text-[#7d5a44]">
                {item.priceNote}
              </p>
            ) : null}
          </div>
          {facts.length > 0 ? (
            <dl className="grid w-full gap-4 text-center sm:grid-cols-3 md:max-w-xl md:text-left">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a5846e]">
                    {f.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold leading-snug text-[#4a3221]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        <p className="mt-8 text-center text-sm text-[#7d5a44] md:text-left">
          <Link
            href="/precios"
            className="border-b border-[#d4b499]/50 font-semibold transition-colors hover:text-[#4a3221]"
          >
            Ver todos los precios
          </Link>
        </p>
      </div>
    </section>
  );
}

/** Quién atiende y dónde: señales de confianza y de ubicación para la búsqueda local. */
export function ServiceLocalTrust() {
  return (
    <section
      aria-label="Quién te atiende y dónde"
      className="container mx-auto px-6 py-20 lg:px-24"
    >
      <div className="mx-auto grid max-w-5xl gap-10 rounded-[2rem] border border-[#d4b499]/30 bg-white p-8 md:grid-cols-2 md:p-12">
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#a5846e]">
            Quién te atiende
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-[#4a3221] md:text-4xl">
            Sofía Nieto
          </h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#7d5a44]">
            Cosmetóloga y cosmiatra
          </p>
          <p className="mt-5 text-base font-medium leading-relaxed text-[#4a3221]/85">
            Glow Skin se dedica a lo facial. Cada tratamiento empieza con una
            valoración, y te explicamos qué se hace y por qué antes de empezar.
          </p>
          <p className="mt-5 text-sm">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 border-b border-[#d4b499]/50 font-semibold text-[#4a3221] transition-colors hover:text-[#a5846e]"
            >
              Conoce a Sofía
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </p>
        </div>
        <div>
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#a5846e]">
            Dónde estamos
          </p>
          <ul className="space-y-4 text-base font-medium text-[#4a3221]">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#d4b499]" aria-hidden />
              <span>
                {ADDRESS_LINES[0]}
                <br />
                {ADDRESS_LINES[1]}
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-[#d4b499]" aria-hidden />
              <span>
                {HOURS_LINES[1]}, {HOURS_LINES[0]}
              </span>
            </li>
            <li className="pl-8 text-sm text-[#7d5a44]">WhatsApp: {PHONE_DISPLAY}</li>
          </ul>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-[#d4b499]/50 font-semibold text-[#4a3221] transition-colors hover:text-[#a5846e]"
            >
              Ver en Google Maps
            </a>
            <Link
              href="/blog/como-llegar-glow-skin"
              className="border-b border-[#d4b499]/50 font-semibold text-[#4a3221] transition-colors hover:text-[#a5846e]"
            >
              Cómo llegar
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/** Servicios relacionados: primero los de la misma categoría. Enlazado interno con el nombre del servicio. */
export function RelatedServices({ current }: { current: CategoryServicePair }) {
  const all = getAllCategoryServices().filter(
    ({ service }) =>
      service.id !== current.service.id &&
      getServiceHref(service.id) === `/servicios/${service.id}`,
  );
  const sameCategory = all.filter((p) => p.categoryId === current.categoryId);
  const others = all.filter((p) => p.categoryId !== current.categoryId);
  const picks = [...sameCategory, ...others].slice(0, 3);
  if (picks.length === 0) return null;

  return (
    <section
      aria-label="Servicios relacionados"
      className="container mx-auto px-6 pb-24 lg:px-24"
    >
      <h2 className="mb-10 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#a5846e]">
        También te puede interesar
      </h2>
      <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {picks.map(({ service, categoryTitle }) => {
          const price = getEnrichedPricingForService(service.name);
          return (
            <li key={service.id}>
              <Link
                href={getServiceHref(service.id)}
                className="block h-full rounded-[1.5rem] border border-[#d4b499]/30 bg-white p-6 transition-colors hover:bg-[#fbf6f3]"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a5846e]">
                  {categoryTitle}
                </span>
                <span className="mt-3 block font-serif text-2xl leading-tight tracking-tight text-[#4a3221]">
                  {service.name}
                </span>
                {price ? (
                  <span className="mt-3 block text-sm font-semibold text-[#7d5a44]">
                    {price.price}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
      {SERVICE_HUBS.filter((h) => h.ids.has(current.service.id)).map((h) => (
        <p key={h.href} className="mt-8 text-center text-sm first:mt-10">
          <Link
            href={h.href}
            className="inline-flex items-center gap-2 border-b border-[#d4b499]/50 font-semibold text-[#4a3221] transition-colors hover:text-[#a5846e]"
          >
            {h.label}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </p>
      ))}
    </section>
  );
}
