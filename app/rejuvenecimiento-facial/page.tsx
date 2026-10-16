import type { Metadata } from "next";
import {
  HubLink,
  ServiceHubPage,
  type HubConfig,
} from "@/app/components/services/ServiceHubPage";
import { getEnrichedPricingForService } from "@/lib/content/pricing-enriched";
import { compactPrice } from "@/lib/content/service-seo";
import { getServiceBySlug } from "@/lib/content/service-utils";
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from "@/lib/seo/site";

const PATH = "/rejuvenecimiento-facial";
const TITLE = `Rejuvenecimiento facial en ${LOCAL_SEO.city}: precios | ${SITE_NAME}`;
const DESCRIPTION = `Rejuvenecimiento facial en ${LOCAL_SEO.city}: microneedling con exosomas, PDRN y Antiox Peel Pro. Precios, sesiones y cuidados. Reserva tu valoración.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "rejuvenecimiento facial Barranquilla",
    "rejuvenecimiento facial precio",
    "microneedling con exosomas",
    "PDRN Barranquilla",
    "antiox peel pro",
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
  const pdrnOne = money("protocolo-pdrn");
  const pdrnThree = money("protocolo-pdrn-3-sesiones");
  const microOne = money("microneedling-exosomas");
  const microThree = money("microneedling-exosomas-3-sesiones");
  const parts = [
    money("antiox-peel-pro") && `Antiox Peel Pro, ${money("antiox-peel-pro")}`,
    pdrnOne &&
      pdrnThree &&
      `PDRN, ${pdrnOne} por sesión o ${pdrnThree} el protocolo de 3 sesiones`,
    microOne &&
      microThree &&
      `microneedling con exosomas, ${microOne} por sesión o ${microThree} las 3 sesiones`,
    money("tratamiento-regenerative-plus") &&
      `tratamiento regenerativo para cicatrices y textura, ${money("tratamiento-regenerative-plus")}`,
  ].filter(Boolean);
  return `${
    parts.length ? `En Glow Skin: ${parts.join("; ")}. ` : ""
  }Puedes ver la lista completa en la página de precios.`;
}

const config: HubConfig = {
  path: PATH,
  breadcrumbName: "Rejuvenecimiento facial",
  eyebrow: "Rejuvenecimiento",
  h1: "Rejuvenecimiento facial",
  h1Highlight: "en Barranquilla",
  subtitle:
    "Qué opciones hay en Glow Skin para la firmeza, las arrugas finas, las cicatrices y la luminosidad, cuánto cuestan y qué esperar.",
  ctaContext: "Rejuvenecimiento facial",
  introTitle: "Qué significa rejuvenecer la piel",
  intro: (
    <>
      <p>
        Ningún tratamiento detiene el tiempo. Lo que sí pueden hacer los de esta
        página es trabajar la calidad de la piel: estimular el colágeno y la
        elastina, apoyar su reparación o renovar su superficie, según el
        tratamiento. Los resultados son progresivos, cada piel responde distinto
        y requieren cuidado posterior.
      </p>
      <p>
        Y hay una base que ninguno reemplaza: el protector solar todos los días.
        En Barranquilla el sol pesa mucho en cómo envejece la piel, y sin esa base
        cualquier resultado dura menos. Lo explicamos en{" "}
        <HubLink href="/blog/envejecimiento-prematuro-como-prevenirlo">
          qué es el envejecimiento prematuro y cómo prevenirlo
        </HubLink>
        .
      </p>
    </>
  ),
  cardsTitle: "Las opciones que hacemos",
  cards: [
    {
      forWhom: "Cicatrices, textura, arrugas y flacidez",
      what: "Microneedling regenerativo con un vial de exosomas de alta concentración de laboratorio reconocido y terapia de luz LED, para una reparación intensiva de cicatrices, arrugas y flacidez.",
      plan: "Para cicatrices y textura, 3 sesiones separadas por 4 a 6 semanas; el plan se define en la consulta.",
      options: [
        { id: "microneedling-exosomas", label: "1 sesión" },
        { id: "microneedling-exosomas-3-sesiones", label: "3 sesiones" },
      ],
    },
    {
      forWhom: "Firmeza, elasticidad y calidad de la piel",
      what: "PDRN aplicado con micropunciones en rostro, cuello y escote, para una reparación profunda de la piel: apoya la firmeza y la elasticidad y atenúa arrugas finas y signos de fatiga.",
      plan: "Una sesión o un protocolo de 3 sesiones, con seguimiento personalizado.",
      options: [
        { id: "protocolo-pdrn", label: "1 sesión" },
        { id: "protocolo-pdrn-3-sesiones", label: "Protocolo de 3 sesiones" },
      ],
    },
    {
      forWhom: "Luminosidad, uniformidad y textura",
      what: "Peeling antioxidante de renovación celular. Combate los radicales libres, principales causantes del envejecimiento prematuro, y aporta luminosidad y mejora la textura de la piel.",
      plan: "Se recomienda cada 4 a 6 semanas.",
      options: [{ id: "antiox-peel-pro" }],
    },
    {
      forWhom: "Cicatrices con textura y poros dilatados",
      what: "Microneedling con nutrición profunda para inducir colágeno de forma ordenada, orientado a cicatrices, poros dilatados o pérdida de firmeza.",
      plan: "Se plantea en series de sesiones; los intervalos dependen de cómo responda tu piel.",
      options: [{ id: "tratamiento-regenerative-plus" }],
    },
  ],
  chooseTitle: "Cuál se ajusta a lo que buscas",
  choose: [
    { goal: "Firmeza, elasticidad y arrugas finas", serviceId: "protocolo-pdrn" },
    {
      goal: "Reparación intensiva de cicatrices, arrugas y flacidez",
      serviceId: "microneedling-exosomas",
    },
    {
      goal: "Cicatrices con textura y poros dilatados",
      serviceId: "tratamiento-regenerative-plus",
    },
    { goal: "Luminosidad y uniformidad", serviceId: "antiox-peel-pro" },
  ],
  careTitle: "Cuidados después del tratamiento",
  care: [
    "Protector solar todos los días: es la base, y sin ella cualquier resultado dura menos.",
    "Después de microneedling, las primeras 24 a 48 horas evita el sol, el maquillaje y los productos activos, y usa protector solar SPF 50+ a diario durante el tratamiento.",
    "Después de Antiox Peel Pro, evita el sol directo durante 48 horas.",
    "Con PDRN, los cuidados dependen de tu sesión: pregunta qué evitar y por cuánto tiempo.",
  ],
  careExtra: (
    <>
      Para entender mejor cada uno, lee{" "}
      <HubLink href="/blog/que-es-el-dermapen">qué es el Dermapen o microneedling</HubLink>
      , <HubLink href="/blog/que-es-el-pdrn-y-para-que-se-usa">qué es el PDRN</HubLink> y{" "}
      <HubLink href="/blog/que-son-los-exosomas">qué son los exosomas</HubLink>.
    </>
  ),
  faq: [
    {
      question: "¿Cuánto cuesta el rejuvenecimiento facial en Barranquilla?",
      answer: faqPriceAnswer(),
    },
    {
      question: "¿Qué diferencia hay entre PDRN y exosomas?",
      answer:
        "Son productos distintos y no son intercambiables. El PDRN se aplica con micropunciones en rostro, cuello y escote; los exosomas se aplican con microneedling y terapia de luz LED. Ninguno es mejor en abstracto: se decide en la valoración, según tu piel y lo que quieres lograr.",
    },
    {
      question: "¿Cuántas sesiones necesito?",
      answer:
        "Depende del tratamiento. En PDRN hay una opción de 1 sesión y un protocolo de 3 sesiones. En microneedling, para cicatrices y textura, recomendamos 3 sesiones separadas por 4 a 6 semanas. Antiox Peel Pro se recomienda cada 4 a 6 semanas.",
    },
    {
      question: "¿Cuándo veré resultados?",
      answer:
        "En microneedling la piel comienza a mejorar desde las 2 semanas posteriores a la sesión, y los cambios más significativos se aprecian a partir del segundo mes. Con PDRN los resultados son progresivos. Cada piel responde distinto y requieren cuidado posterior.",
    },
    {
      question: "¿Duele?",
      answer:
        "En el microneedling aplicamos crema anestésica antes del procedimiento y la mayoría de las personas describe una sensación de presión leve y tolerable. En el peeling antioxidante puedes sentir una ligera sensación de hormigueo que desaparece rápido.",
    },
    {
      question: "¿Qué cuidados debo tener después?",
      answer:
        "Después de microneedling, las primeras 24 a 48 horas evita sol, maquillaje y productos activos, y usa protector solar SPF 50+ a diario. Después de Antiox Peel Pro, evita el sol directo 48 horas. Con PDRN, pregunta por las indicaciones de tu sesión.",
    },
    {
      question: "¿Un tratamiento reemplaza el protector solar?",
      answer:
        "No. Sin protección solar diaria, el sol sigue dañando la piel y los resultados duran menos.",
    },
    {
      question: "¿Cómo sé cuál me corresponde?",
      answer:
        "Se decide en la valoración, según tu tipo de piel y lo que quieres lograr. Por eso empezamos mirando tu piel y no eligiendo el tratamiento por moda.",
    },
  ],
  ctaTitle: "¿Cuál te corresponde? Lo vemos en la valoración",
  reading: [
    {
      href: "/blog/envejecimiento-prematuro-como-prevenirlo",
      title: "Qué es el envejecimiento prematuro y cómo prevenirlo",
    },
    {
      href: "/blog/pdrn-o-exosomas-cual-elegir",
      title: "PDRN o exosomas: en qué se diferencian y cómo se decide",
    },
    {
      href: "/blog/que-es-el-dermapen",
      title: "Qué es el Dermapen (microneedling): para qué sirve y cómo es la sesión",
    },
  ],
};

export default function RejuvenecimientoFacialPage() {
  return <ServiceHubPage config={config} />;
}
