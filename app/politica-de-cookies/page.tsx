import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalList,
  LegalPageShell,
  LegalSection,
} from "@/app/components/legal/LegalPageShell";
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_LAST_UPDATED,
} from "@/app/components/site-config";
import { getSiteUrl, SITE_NAME } from "@/lib/seo/site";

const siteUrl = getSiteUrl();
const description = `Política de Cookies de ${SITE_NAME}: qué cookies y tecnologías de medición usamos, para qué sirven, cuánto duran y cómo puedes desactivarlas desde tu navegador.`;

export const metadata: Metadata = {
  title: "Política de Cookies",
  description,
  alternates: { canonical: `${siteUrl}/politica-de-cookies` },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Política de Cookies | ${SITE_NAME}`,
    description,
    url: `${siteUrl}/politica-de-cookies`,
    locale: "es_CO",
    type: "article",
  },
};

const COOKIE_TABLE = [
  {
    provider: "Glow Skin (propias)",
    purpose:
      "Recordar el estado de los formularios de contacto y mantener la navegación funcionando correctamente.",
    type: "Técnicas / necesarias",
    duration: "Sesión o hasta 180 días",
  },
  {
    provider: "Microsoft Clarity",
    purpose:
      "Entender de forma agregada cómo se usa el sitio: mapas de calor, scroll y grabaciones anónimas de sesión para detectar errores de usabilidad.",
    type: "Analíticas",
    duration: "Hasta 1 año",
  },
  {
    provider: "Meta (Facebook Pixel)",
    purpose:
      "Medir el resultado de nuestras campañas publicitarias, evitar mostrar anuncios a quien ya agendó y construir audiencias para nuestras pautas.",
    type: "Publicitarias",
    duration: "Hasta 90 días",
  },
  {
    provider: "Metricool",
    purpose:
      "Medir visitas y origen del tráfico para reportes de marketing.",
    type: "Analíticas",
    duration: "Hasta 1 año",
  },
] as const;

export default function PoliticaDeCookiesPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Política de Cookies"
      intro={`Este sitio usa cookies y tecnologías similares. Algunas son indispensables para que la página funcione; otras nos ayudan a entender qué contenido te resulta útil y a medir nuestras campañas. Aquí te contamos cuáles usamos y cómo puedes controlarlas.`}
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <LegalSection id="que-son" title="1. Qué es una cookie">
        <p>
          Una cookie es un pequeño archivo de texto que un sitio web guarda en tu
          navegador cuando lo visitas. Sirve, por ejemplo, para recordar
          preferencias o para reconocer que ya habías estado aquí. Junto a las
          cookies utilizamos tecnologías equivalentes como el{" "}
          <em>almacenamiento local</em> del navegador y los píxeles de medición.
        </p>
      </LegalSection>

      <LegalSection id="tipos" title="2. Tipos de cookies que usamos">
        <LegalList
          items={[
            <>
              <strong>Necesarias.</strong> Permiten que el sitio funcione:
              formularios, navegación y seguridad básica. Sin ellas la página no
              opera correctamente.
            </>,
            <>
              <strong>Analíticas.</strong> Nos muestran, de forma agregada, qué
              páginas se visitan, dónde hay fricción y qué contenidos funcionan.
              Las usamos para mejorar el sitio, no para identificarte
              personalmente.
            </>,
            <>
              <strong>Publicitarias.</strong> Nos permiten medir el resultado de
              nuestras campañas en Meta (Facebook e Instagram) y mostrar
              anuncios más relevantes a personas con intereses similares a los
              tuyos.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection id="detalle" title="3. Detalle de proveedores">
        <div className="overflow-x-auto rounded-2xl border border-[#f1e4dc] bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#f1e4dc] bg-[#fbf6f3]">
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-[#a5846e]">
                  Proveedor
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-[#a5846e]">
                  Finalidad
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-[#a5846e]">
                  Tipo
                </th>
                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-[#a5846e]">
                  Duración
                </th>
              </tr>
            </thead>
            <tbody>
              {COOKIE_TABLE.map((row) => (
                <tr
                  key={row.provider}
                  className="border-b border-[#f7f0eb] last:border-0 align-top"
                >
                  <td className="px-5 py-4 font-medium text-[#5c3a21]">
                    {row.provider}
                  </td>
                  <td className="px-5 py-4 text-[#6b4c37]">{row.purpose}</td>
                  <td className="px-5 py-4 text-[#6b4c37]">{row.type}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-[#6b4c37]">
                    {row.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Los datos recogidos por estas herramientas se tratan conforme a nuestra{" "}
          <Link
            href="/politica-de-privacidad"
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            Política de Privacidad y Tratamiento de Datos
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection id="gestion" title="4. Cómo desactivarlas">
        <p>
          Puedes bloquear o eliminar las cookies desde la configuración de tu
          navegador en cualquier momento. Ten en cuenta que si desactivas las
          cookies necesarias, algunas funciones del sitio pueden dejar de
          operar.
        </p>
        <LegalList
          items={[
            <>
              <strong>Chrome:</strong> Configuración → Privacidad y seguridad →
              Cookies y otros datos de sitios.
            </>,
            <>
              <strong>Safari:</strong> Ajustes → Safari → Bloquear todas las
              cookies / Borrar historial y datos.
            </>,
            <>
              <strong>Firefox:</strong> Ajustes → Privacidad y seguridad →
              Cookies y datos del sitio.
            </>,
            <>
              <strong>Edge:</strong> Configuración → Cookies y permisos del
              sitio.
            </>,
          ]}
        />
        <p>
          Adicionalmente, puedes gestionar la publicidad personalizada de Meta
          desde la configuración de tu cuenta de Facebook o Instagram, en la
          sección de preferencias de anuncios.
        </p>
      </LegalSection>

      <LegalSection id="cambios" title="5. Cambios en esta política">
        <p>
          Si añadimos o retiramos herramientas de medición, actualizaremos esta
          página con la nueva información y su fecha de vigencia. Si tienes
          dudas, escríbenos a{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
