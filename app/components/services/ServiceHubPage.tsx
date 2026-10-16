import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingCtaButtons } from "@/app/components/marketing/BookingCtaButtons";
import {
  getEnrichedPricingForService,
  type EnrichedPricingItem,
} from "@/lib/content/pricing-enriched";
import { parsePriceToNumber } from "@/lib/content/service-seo";
import { getServiceBySlug } from "@/lib/content/service-utils";
import { getServiceHref } from "@/lib/routing/service-routes";
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from "@/lib/seo/site";
import {
  ServiceFaqAccordion,
  type FaqItem,
} from "./ServiceFaqAccordion";
import { ServiceBreadcrumbs, ServiceLocalTrust } from "./ServiceSeoBlocks";

/** Una forma de contratar el tratamiento (p. ej. "1 sesión" o "Protocolo de 3 sesiones"). */
export type HubOption = { id: string; label?: string };

export type HubCard = {
  /** Para quién es / qué busca quien lo elige. */
  forWhom: string;
  what: string;
  plan: string;
  /** Servicios de `SERVICES_DATA` con su precio; el primero da el nombre y el enlace. */
  options: HubOption[];
};

export type HubConfig = {
  path: string;
  breadcrumbName: string;
  eyebrow: string;
  h1: string;
  h1Highlight: string;
  subtitle: string;
  /** Contexto del botón de reserva (ver `whatsapp-messages.ts`). */
  ctaContext: string;
  introTitle: string;
  intro: ReactNode;
  cardsTitle: string;
  cards: HubCard[];
  /** Opcional: "si buscas X, mira Y". */
  choose?: { goal: string; serviceId: string }[];
  chooseTitle?: string;
  careTitle: string;
  care: ReactNode[];
  careExtra?: ReactNode;
  faq: FaqItem[];
  ctaTitle: string;
  reading: { href: string; title: string }[];
};

type ResolvedOption = {
  id: string;
  label?: string;
  name: string;
  pricing?: EnrichedPricingItem;
};

type ResolvedCard = Omit<HubCard, "options"> & {
  options: ResolvedOption[];
  name: string;
  href: string;
};

function resolveCards(cards: HubCard[]): ResolvedCard[] {
  return cards.flatMap((card) => {
    const options = card.options.flatMap((o) => {
      const pair = getServiceBySlug(o.id);
      if (!pair) return [];
      return [
        {
          ...o,
          name: pair.service.name,
          pricing: getEnrichedPricingForService(pair.service.name),
        },
      ];
    });
    if (options.length === 0) return [];
    return [{ ...card, options, name: options[0].name, href: getServiceHref(options[0].id) }];
  });
}

function buildJsonLd(config: HubConfig, cards: ResolvedCard[]) {
  const site = getSiteUrl();
  const url = `${site}${config.path}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${site}/servicios` },
      { "@type": "ListItem", position: 3, name: config.breadcrumbName, item: url },
    ],
  };

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${config.breadcrumbName} en ${LOCAL_SEO.city}`,
    itemListElement: cards.map((c, i) => {
      const offers = c.options.flatMap((o) => {
        const price = o.pricing ? parsePriceToNumber(o.pricing.price) : null;
        return price
          ? [
              {
                "@type": "Offer",
                name: o.label ?? o.name,
                price: String(price),
                priceCurrency: "COP",
                url: `${site}${getServiceHref(o.id)}`,
              },
            ]
          : [];
      });
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: c.name,
          url: `${site}${c.href}`,
          areaServed: { "@type": "City", name: LOCAL_SEO.city },
          provider: { "@type": "BeautySalon", "@id": `${site}/#local`, name: SITE_NAME },
          ...(offers.length ? { offers } : {}),
        },
      };
    }),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return [breadcrumb, list, faq];
}

const linkClass =
  "underline decoration-[#d4b499] decoration-2 underline-offset-4 hover:text-[#7d5a44]";

/** Enlace de texto con el estilo de los artículos, para usar dentro de `intro` y `care`. */
export function HubLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}

/**
 * Página de grupo de servicios (p. ej. "Peeling facial en Barranquilla"): reúne varios
 * servicios con su precio real, explica cómo elegir y enlaza a cada uno.
 */
export function ServiceHubPage({ config }: { config: HubConfig }) {
  const cards = resolveCards(config.cards);
  const jsonLd = buildJsonLd(config, cards);

  return (
    <>
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <div className="min-h-screen overflow-x-hidden bg-[#f7f0eb] font-sans text-[#4a3221] selection:bg-[#d4b499] selection:text-white">
        <section className="relative pt-48 pb-24 text-center">
          <div className="container mx-auto px-6">
            <ServiceBreadcrumbs serviceName={config.breadcrumbName} />
            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">
              {config.eyebrow}
            </p>
            <div className="mx-auto mb-8 h-px w-24 bg-[#d4b499]" />
            <h1 className="font-serif text-5xl leading-none tracking-tight text-[#4a3221] md:text-8xl">
              {config.h1}
              <span className="font-script -mt-2 block text-4xl lowercase text-[#d4b499] md:-mt-6 md:text-8xl">
                {config.h1Highlight}
              </span>
            </h1>
            <div className="mx-auto mt-8 mb-10 h-px w-24 bg-[#d4b499]" />
            <p className="mx-auto max-w-2xl text-lg font-medium italic leading-relaxed text-[#7d5a44] text-balance md:text-2xl">
              {config.subtitle}
            </p>
            <div className="mt-12">
              <BookingCtaButtons
                className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                suggestedTreatments={[config.breadcrumbName]}
                whatsappContext={config.ctaContext}
                reserveHereClassName="rounded-full bg-[#4a3221] px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#f7f0eb] shadow-xl transition-all hover:bg-[#d4b499]"
                reserveWhatsappClassName="rounded-full border border-[#4a3221]/20 bg-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#4a3221] shadow-lg transition-all hover:bg-[#f7f0eb]"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[#d4b499]/15 bg-white py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 font-serif text-3xl leading-tight tracking-tight text-[#4a3221] md:text-4xl">
                {config.introTitle}
              </h2>
              <div className="space-y-5 text-base font-medium leading-relaxed text-[#4a3221]/90 md:text-lg">
                {config.intro}
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label={config.cardsTitle}
          className="container mx-auto px-6 py-20 lg:px-24"
        >
          <h2 className="mb-12 text-center font-serif text-3xl tracking-tight text-[#4a3221] md:text-5xl">
            {config.cardsTitle}
          </h2>
          <ul className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {cards.map((c) => (
              <li
                key={c.options[0].id}
                className="flex flex-col rounded-[2rem] border border-[#d4b499]/30 bg-white p-8 shadow-sm md:p-10"
              >
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#a5846e]">
                  {c.forWhom}
                </p>
                <h3 className="font-serif text-2xl leading-tight tracking-tight text-[#4a3221] md:text-3xl">
                  {c.name}
                </h3>
                <p className="mt-4 text-base font-medium leading-relaxed text-[#4a3221]/85">
                  {c.what}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#7d5a44]">{c.plan}</p>
                <div className="mt-6 flex flex-wrap items-end justify-between gap-4 pt-2">
                  <div className="space-y-3">
                    {c.options.map((o) =>
                      o.pricing ? (
                        <div key={o.id}>
                          {o.label ? (
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#a5846e]">
                              {o.label}
                            </p>
                          ) : null}
                          <p className="whitespace-nowrap font-serif text-3xl text-[#4a3221]">
                            {o.pricing.price}
                          </p>
                          {o.pricing.priceNote ? (
                            <p className="text-xs font-semibold text-[#7d5a44]">
                              {o.pricing.priceNote}
                            </p>
                          ) : null}
                        </div>
                      ) : null,
                    )}
                  </div>
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-2 border-b border-[#d4b499]/60 text-sm font-semibold text-[#4a3221] transition-colors hover:text-[#a5846e]"
                  >
                    Ver el servicio
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-[#7d5a44]">
            <Link
              href="/precios"
              className="border-b border-[#d4b499]/50 font-semibold transition-colors hover:text-[#4a3221]"
            >
              Ver todos los precios
            </Link>
          </p>
        </section>

        {config.choose && config.choose.length > 0 ? (
          <section className="border-y border-[#d4b499]/15 bg-white py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-24">
              <div className="mx-auto max-w-3xl">
                <h2 className="mb-6 font-serif text-3xl leading-tight tracking-tight text-[#4a3221] md:text-4xl">
                  {config.chooseTitle ?? "Cuál elegir"}
                </h2>
                <ul className="space-y-4 text-base font-medium leading-relaxed text-[#4a3221]/90 md:text-lg">
                  {config.choose.map((c) => {
                    const pair = getServiceBySlug(c.serviceId);
                    if (!pair) return null;
                    return (
                      <li key={c.serviceId} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                        <span className="font-semibold">{c.goal}</span>
                        <span aria-hidden className="hidden text-[#d4b499] sm:inline">
                          →
                        </span>
                        <HubLink href={getServiceHref(c.serviceId)}>{pair.service.name}</HubLink>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-6 text-base font-medium text-[#4a3221]/80">
                  La decisión final se toma en la valoración, mirando tu piel.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section
          className={`${
            config.choose && config.choose.length > 0 ? "" : "border-y border-[#d4b499]/15 bg-white "
          }py-16 md:py-24`}
        >
          <div className="container mx-auto px-6 lg:px-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 font-serif text-3xl leading-tight tracking-tight text-[#4a3221] md:text-4xl">
                {config.careTitle}
              </h2>
              <ul className="list-disc space-y-3 pl-6 text-base font-medium leading-relaxed text-[#4a3221]/90 marker:text-[#d4b499] md:text-lg">
                {config.care.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {config.careExtra ? (
                <p className="mt-6 text-base font-medium leading-relaxed text-[#4a3221]/80">
                  {config.careExtra}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <ServiceFaqAccordion items={config.faq} />

        <section
          aria-label="Reserva tu valoración"
          className="container mx-auto px-6 pb-8 pt-4 text-center lg:px-24"
        >
          <h2 className="font-serif text-3xl tracking-tight text-[#4a3221] md:text-4xl">
            {config.ctaTitle}
          </h2>
          <div className="mt-8">
            <BookingCtaButtons
              suggestedTreatments={[config.breadcrumbName]}
              whatsappContext={config.ctaContext}
              reserveHereText="Reservar mi valoración"
              reserveWhatsappText="Escribir por WhatsApp"
            />
          </div>
        </section>

        <ServiceLocalTrust />

        <section
          aria-label="Para seguir leyendo"
          className="container mx-auto px-6 pb-24 lg:px-24"
        >
          <h2 className="mb-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#a5846e]">
            Para seguir leyendo
          </h2>
          <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {config.reading.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  className="block h-full rounded-[1.5rem] border border-[#d4b499]/30 bg-white p-6 font-serif text-xl leading-tight tracking-tight text-[#4a3221] transition-colors hover:bg-[#fbf6f3]"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}</style>
    </>
  );
}
