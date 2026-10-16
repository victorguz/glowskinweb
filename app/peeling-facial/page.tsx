import type { Metadata } from "next";
import {
  HubLink,
  ServiceHubPage,
  type HubConfig,
} from "@/app/components/services/ServiceHubPage";
import { getEnrichedPricingForService } from "@/lib/content/pricing-enriched";
import { compactPrice } from "@/lib/content/service-seo";
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

/** Precio de un servicio, tal como lo publica la lista de precios ("$375.000"). */
function money(serviceId: string): string | null {
  const pair = getServiceBySlug(serviceId);
  const item = pair ? getEnrichedPricingForService(pair.service.name) : undefined;
  return item ? compactPrice(item.price) : null;
}

function faqPriceAnswer(): string {
  const parts = [
    money("antiox-peel-pro") && `Antiox Peel Pro, ${money("antiox-peel-pro")}`,
    money("limpieza-seborreguladora") &&
      `limpieza anti-acné con peeling seborregulador, ${money("limpieza-seborreguladora")}`,
    money("hydraglow-antiox-peel") &&
      `HydraGlow + Antiox Peel Pro, ${money("hydraglow-antiox-peel")}`,
    money("tratamiento-despigmentante") &&
      `tratamiento despigmentante, ${money("tratamiento-despigmentante")} (incluye 3 sesiones)`,
  ].filter(Boolean);
  return `${
    parts.length ? `En Glow Skin: ${parts.join("; ")}. ` : ""
  }Puedes ver la lista completa en la página de precios.`;
}

const config: HubConfig = {
  path: PATH,
  breadcrumbName: "Peeling facial",
  eyebrow: "Peelings",
  h1: "Peeling facial",
  h1Highlight: "en Barranquilla",
  subtitle:
    "Qué peelings hacemos en Glow Skin, para qué sirve cada uno, cuántas sesiones se recomiendan y cuánto cuestan.",
  ctaContext: "Peeling facial",
  introTitle: "Qué es un peeling facial",
  intro: (
    <>
      <p>
        Un peeling es la aplicación controlada de ácidos o activos sobre la piel
        para renovar su superficie. Según el activo y la concentración, se usa
        para regular el sebo, atenuar manchas o devolver luminosidad y mejorar la
        textura.
      </p>
      <p>
        No es lo mismo que una limpieza facial: la limpieza retira lo que se
        acumula en los poros; el peeling trabaja la renovación de la piel. Por eso
        en Glow Skin los peelings se hacen después de una valoración, con el ritmo
        y la concentración que tu piel tolere, y suelen combinarse con una{" "}
        <HubLink href={getServiceHref("limpieza-facial")}>
          limpieza facial profunda
        </HubLink>
        .
      </p>
    </>
  ),
  cardsTitle: "Los peelings que hacemos",
  cards: [
    {
      forWhom: "Piel grasa y acné comedogénico activo",
      what: "Limpieza facial con peeling seborregulador: un peeling químico pensado para regular la producción de sebo, con extracción cuidadosa de comedones y activos calmantes al final.",
      plan: "Para acné comedogénico, 6 a 8 sesiones recomendadas.",
      options: [{ id: "limpieza-seborreguladora" }],
    },
    {
      forWhom: "Manchas, melasma y marcas posinflamatorias",
      what: "Renovación celular controlada con peelings químicos (o micropunciones, según tu diagnóstico) para atenuar las manchas y unificar el tono. Se define el ritmo de ácidos según tu fototipo y tu historia solar.",
      plan: "3 sesiones, una cada 15 días.",
      options: [{ id: "tratamiento-despigmentante" }],
    },
    {
      forWhom: "Piel opaca, textura irregular y falta de luminosidad",
      what: "Peeling antioxidante de renovación celular. Se aplica junto con una limpieza facial Glow Skin para que los activos se absorban mejor.",
      plan: "Se recomienda cada 4 a 6 semanas.",
      options: [{ id: "antiox-peel-pro" }],
    },
    {
      forWhom: "Hidratación y luminosidad en una sola visita",
      what: "HydraGlow (limpieza con tecnología Hydrafacial) combinado con Antiox Peel Pro: hidratación en capas y mejora de textura, uniformidad y vitalidad.",
      plan: "Se recomienda cada 6 a 8 semanas.",
      options: [{ id: "hydraglow-antiox-peel" }],
    },
  ],
  careTitle: "Cuidados después de un peeling",
  care: [
    "Evita el sol directo durante 48 horas.",
    "Usa protector solar todos los días.",
    "Después del peeling seborregulador, espera 24 horas para maquillarte y usa solo productos no comedogénicos.",
    "En el tratamiento despigmentante, la protección solar estricta es indispensable entre sesiones.",
    "Sigue las indicaciones de productos que te demos.",
  ],
  careExtra: (
    <>
      Si te interesa saber qué hacer después de otros procedimientos, lee{" "}
      <HubLink href="/blog/que-hacer-despues-de-una-limpieza-facial">
        qué hacer después de una limpieza facial
      </HubLink>
      .
    </>
  ),
  faq: [
    {
      question: "¿Cuánto cuesta un peeling facial en Barranquilla?",
      answer: faqPriceAnswer(),
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
  ],
  ctaTitle: "¿Cuál te corresponde? Lo vemos en la valoración",
  reading: [
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
  ],
};

export default function PeelingFacialPage() {
  return <ServiceHubPage config={config} />;
}
