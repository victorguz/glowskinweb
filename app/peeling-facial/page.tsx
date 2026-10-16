import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingCtaButtons } from "@/app/components/marketing/BookingCtaButtons";
import {
  ServiceBreadcrumbs,
  ServiceLocalTrust,
} from "@/app/components/services/ServiceSeoBlocks";
import {
  ServiceFaqAccordion,
  type FaqItem,
} from "@/app/components/services/ServiceFaqAccordion";
import { getEnrichedPricingForService } from "@/lib/content/pricing-enriched";
import { compactPrice, parsePriceToNumber } from "@/lib/content/service-seo";
import { getServiceBySlug } from "@/lib/content/service-utils";
import { getServiceHref } from "@/lib/routing/service-routes";
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from "@/lib/seo/site";

const PATH = "/peeling-facial";
const TITLE = `Peeling facial en ${LOCAL_SEO.city}: tipos y precios | ${SITE_NAME}`;
const DESCRIPTION = `Peeling facial en ${LOCAL_SEO.city}: seborregulador, despigmentante y antioxidante. Precios, sesiones y cuidados. Reserva tu valoración.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "peeling facial Barranquilla",
    "peeling facial precio",
    "peeling despigmentante",
    "peeling antioxidante",
    "peeling seborregulador",
    SITE_NAME,
  ],
  alternates: { canonical: `${getSiteUrl()}${PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${getSiteUrl()}${PATH}`,
    locale: "es_CO",
  },
};

/**
 * Los peelings que hace Glow Skin, con los datos que ya publican las páginas de
 * servicio y la lista de precios (el precio se lee de ahí, no se repite aquí).
 */
const PEELINGS = [
  {
    id: "limpieza-seborreguladora",
    forWhom: "Piel grasa y acné comedogénico activo",
    what: "Limpieza facial con peeling seborregulador: un peeling químico pensado para regular la producción de sebo, con extracción cuidadosa de comedones y activos calmantes al final.",
    plan: "Para acné comedogénico, 6 a 8 sesiones recomendadas.",
  },
  {
    id: "tratamiento-despigmentante",
    forWhom: "Manchas, melasma y marcas posinflamatorias",
    what: "Renovación celular controlada con peelings químicos (o micropunciones, según tu diagnóstico) para atenuar las manchas y unificar el tono. Se define el ritmo de ácidos según tu fototipo y tu historia solar.",
    plan: "3 sesiones, una cada 15 días.",
  },
  {
    id: "antiox-peel-pro",
    forWhom: "Piel opaca, textura irregular y falta de luminosidad",
    what: "Peeling antioxidante de renovación celular. Se aplica junto con una limpieza facial Glow Skin para que los activos se absorban mejor.",
    plan: "Se recomienda cada 4 a 6 semanas.",
  },
  {
    id: "hydraglow-antiox-peel",
    forWhom: "Hidratación y luminosidad en una sola visita",
    what: "HydraGlow (limpieza con tecnología Hydrafacial) combinado con Antiox Peel Pro: hidratación en capas y mejora de textura, uniformidad y vitalidad.",
    plan: "Se recomienda cada 6 a 8 semanas.",
  },
] as const;

function peelingCards() {
  return PEELINGS.flatMap((p) => {
    const pair = getServiceBySlug(p.id);
    if (!pair) return [];
    const pricing = getEnrichedPricingForService(pair.service.name);
    return [{ ...p, name: pair.service.name, pricing }];
  });
}

function buildFaq(cards: ReturnType<typeof peelingCards>): FaqItem[] {
  const priceOf = (id: string) =>
    cards.find((c) => c.id === id)?.pricing?.price;
  const money = (id: string) => {
    const p = priceOf(id);
    return p ? compactPrice(p) : null;
  };

  const priceParts = [
    money("antiox-peel-pro") && `Antiox Peel Pro, ${money("antiox-peel-pro")}`,
    money("limpieza-seborreguladora") &&
      `limpieza anti-acné con peeling seborregulador, ${money("limpieza-seborreguladora")}`,
    money("hydraglow-antiox-peel") &&
      `HydraGlow + Antiox Peel Pro, ${money("hydraglow-antiox-peel")}`,
    money("tratamiento-despigmentante") &&
      `tratamiento despigmentante, ${money("tratamiento-despigmentante")} (incluye 3 sesiones)`,
  ].filter(Boolean);

  return [
    {
      question: "¿Cuánto cuesta un peeling facial en Barranquilla?",
      answer: `${
        priceParts.length ? `En Glow Skin: ${priceParts.join("; ")}. ` : ""
      }Puedes ver la lista completa en la página de precios.`,
    },
    {
      question: "¿Duele un peeling facial?",
      answer:
        "Durante la aplicación puedes sentir un ligero hormigueo, cosquilleo o ardor. Se tolera bien y se calma rápido con los activos que se aplican al final.",
    },
    {
      question: "¿Cuántas sesiones necesito?",
      answer:
        "Depende del peeling y de tu piel. Para acné comedogénico recomendamos de 6 a 8 sesiones; el tratamiento despigmentante son 3 sesiones, una cada 15 días; y Antiox Peel Pro se recomienda cada 4 a 6 semanas.",
    },
    {
      question: "¿Cuándo veré resultados?",
      answer:
        "En el peeling seborregulador los primeros cambios se notan desde la primera sesión. En el despigmentante, desde la segunda, y el resultado más uniforme se consolida al terminar las 3. Cada piel responde distinto y los resultados no son definitivos.",
    },
    {
      question: "¿Qué cuidados debo tener después de un peeling?",
      answer:
        "Evita el sol directo durante 48 horas, usa protector solar todos los días y sigue las indicaciones de productos que te demos. Después del peeling seborregulador, espera 24 horas para maquillarte y usa solo productos no comedogénicos. Con el despigmentante, la protección solar estricta es indispensable: sin ella, el sol puede reactivar la producción de melanina y revertir el avance.",
    },
    {
      question: "¿Sirve para melasma o solo para manchas de acné?",
      answer:
        "Para ambos. Ajustamos el activo y su concentración según si tu mancha es melasma, hiperpigmentación posinflamatoria u otro tipo, evaluado en el diagnóstico inicial.",
    },
    {
      question: "¿Puedo hacerme un peeling si tengo piel sensible?",
      answer:
        "En general sí: el ritmo y la concentración de los ácidos se ajustan según tu fototipo y tu sensibilidad, que se evalúan antes de empezar. Cuéntanos qué productos usas y cómo reacciona tu piel.",
    },
    {
      question: "¿Cómo sé cuál peeling me corresponde?",
      answer:
        "Se decide en la valoración, según tu tipo de piel y lo que quieres lograr. Por eso empezamos mirando tu piel y no eligiendo el peeling por moda.",
    },
  ];
}

function buildJsonLd(
  cards: ReturnType<typeof peelingCards>,
  faq: FaqItem[],
) {
  const site = getSiteUrl();
  const url = `${site}${PATH}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site },
      { "@type": "ListItem", position: 2, name: "Servicios", item: `${site}/servicios` },
      { "@type": "ListItem", position: 3, name: "Peeling facial", item: url },
    ],
  };

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Peelings faciales en ${LOCAL_SEO.city}`,
    itemListElement: cards.map((c, i) => {
      const price = c.pricing ? parsePriceToNumber(c.pricing.price) : null;
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: c.name,
          url: `${site}${getServiceHref(c.id)}`,
          areaServed: { "@type": "City", name: LOCAL_SEO.city },
          provider: { "@type": "BeautySalon", "@id": `${site}/#local`, name: SITE_NAME },
          ...(price
            ? {
                offers: {
                  "@type": "Offer",
                  price: String(price),
                  priceCurrency: "COP",
                  url: `${site}${getServiceHref(c.id)}`,
                },
              }
            : {}),
        },
      };
    }),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return [breadcrumb, list, faqLd];
}

export default function PeelingFacialPage() {
  const cards = peelingCards();
  const faq = buildFaq(cards);
  const jsonLd = buildJsonLd(cards, faq);

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
            <ServiceBreadcrumbs serviceName="Peeling facial" />
            <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">
              Peelings
            </p>
            <div className="mx-auto mb-8 h-px w-24 bg-[#d4b499]" />
            <h1 className="font-serif text-5xl leading-none tracking-tight text-[#4a3221] md:text-8xl">
              Peeling facial
              <span className="font-script -mt-2 block text-4xl lowercase text-[#d4b499] md:-mt-6 md:text-8xl">
                en Barranquilla
              </span>
            </h1>
            <div className="mx-auto mt-8 mb-10 h-px w-24 bg-[#d4b499]" />
            <p className="mx-auto max-w-2xl text-lg font-medium italic leading-relaxed text-[#7d5a44] text-balance md:text-2xl">
              Qué peelings hacemos en Glow Skin, para qué sirve cada uno, cuántas
              sesiones se recomiendan y cuánto cuestan.
            </p>
            <div className="mt-12">
              <BookingCtaButtons
                className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                suggestedTreatments={["Peeling facial"]}
                whatsappContext="Peeling facial"
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
                Qué es un peeling facial
              </h2>
              <div className="space-y-5 text-base font-medium leading-relaxed text-[#4a3221]/90 md:text-lg">
                <p>
                  Un peeling es la aplicación controlada de ácidos o activos sobre
                  la piel para renovar su superficie. Según el activo y la
                  concentración, se usa para regular el sebo, atenuar manchas o
                  devolver luminosidad y mejorar la textura.
                </p>
                <p>
                  No es lo mismo que una limpieza facial: la limpieza retira lo
                  que se acumula en los poros; el peeling trabaja la renovación de
                  la piel. Por eso en Glow Skin los peelings se hacen después de
                  una valoración, con el ritmo y la concentración que tu piel
                  tolere, y suelen combinarse con una{" "}
                  <Link
                    href={getServiceHref("limpieza-facial")}
                    className="underline decoration-[#d4b499] decoration-2 underline-offset-4 hover:text-[#7d5a44]"
                  >
                    limpieza facial profunda
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="Peelings que hacemos"
          className="container mx-auto px-6 py-20 lg:px-24"
        >
          <h2 className="mb-12 text-center font-serif text-3xl tracking-tight text-[#4a3221] md:text-5xl">
            Los peelings que hacemos
          </h2>
          <ul className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {cards.map((c) => (
              <li
                key={c.id}
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
                  <div>
                    {c.pricing ? (
                      <>
                        <p className="whitespace-nowrap font-serif text-3xl text-[#4a3221]">
                          {c.pricing.price}
                        </p>
                        {c.pricing.priceNote ? (
                          <p className="text-xs font-semibold text-[#7d5a44]">
                            {c.pricing.priceNote}
                          </p>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                  <Link
                    href={getServiceHref(c.id)}
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

        <section className="border-y border-[#d4b499]/15 bg-white py-16 md:py-24">
          <div className="container mx-auto px-6 lg:px-24">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 font-serif text-3xl leading-tight tracking-tight text-[#4a3221] md:text-4xl">
                Cuidados después de un peeling
              </h2>
              <ul className="list-disc space-y-3 pl-6 text-base font-medium leading-relaxed text-[#4a3221]/90 marker:text-[#d4b499] md:text-lg">
                <li>Evita el sol directo durante 48 horas.</li>
                <li>Usa protector solar todos los días.</li>
                <li>
                  Después del peeling seborregulador, espera 24 horas para
                  maquillarte y usa solo productos no comedogénicos.
                </li>
                <li>
                  En el tratamiento despigmentante, la protección solar estricta
                  es indispensable entre sesiones.
                </li>
                <li>Sigue las indicaciones de productos que te demos.</li>
              </ul>
              <p className="mt-6 text-base font-medium leading-relaxed text-[#4a3221]/80">
                Si te interesa saber qué hacer después de otros procedimientos,
                lee{" "}
                <Link
                  href="/blog/que-hacer-despues-de-una-limpieza-facial"
                  className="underline decoration-[#d4b499] decoration-2 underline-offset-4 hover:text-[#7d5a44]"
                >
                  qué hacer después de una limpieza facial
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <ServiceFaqAccordion items={faq} />

        <section
          aria-label="Reserva tu valoración"
          className="container mx-auto px-6 pb-8 pt-4 text-center lg:px-24"
        >
          <h2 className="font-serif text-3xl tracking-tight text-[#4a3221] md:text-4xl">
            ¿Cuál te corresponde? Lo vemos en la valoración
          </h2>
          <div className="mt-8">
            <BookingCtaButtons
              suggestedTreatments={["Peeling facial"]}
              whatsappContext="Peeling facial"
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
            {[
              {
                href: "/blog/piel-opaca-sin-vida",
                title: "Piel opaca en Barranquilla: por qué pasa y qué hacer",
              },
              {
                href: "/blog/como-curarse-del-acne-guia",
                title: "¿El acné se cura? Lo que sí puedes lograr con constancia",
              },
              {
                href: "/blog/como-elegir-donde-hacerte-una-limpieza-facial-en-barranquilla",
                title: "Cómo elegir dónde hacerte una limpieza facial en Barranquilla",
              },
            ].map((a) => (
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
