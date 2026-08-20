import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalList,
  LegalPageShell,
  LegalSection,
} from "@/app/components/legal/LegalPageShell";
import {
  LEGAL_ADDRESS,
  LEGAL_BUSINESS_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_LAST_UPDATED,
  LEGAL_TAX_ID,
  PHONE_DISPLAY,
} from "@/app/components/site-config";
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from "@/lib/seo/site";

const siteUrl = getSiteUrl();
const description = `Política de Privacidad y Tratamiento de Datos Personales de ${SITE_NAME} (${LOCAL_SEO.city}, Colombia): qué datos recogemos, para qué los usamos, cómo los protegemos y cómo ejercer tus derechos conforme a la Ley 1581 de 2012.`;

export const metadata: Metadata = {
  title: "Política de Privacidad y Tratamiento de Datos",
  description,
  alternates: { canonical: `${siteUrl}/politica-de-privacidad` },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Política de Privacidad | ${SITE_NAME}`,
    description,
    url: `${siteUrl}/politica-de-privacidad`,
    locale: "es_CO",
    type: "article",
  },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Política de Privacidad y Tratamiento de Datos Personales"
      intro={`En ${SITE_NAME} tratamos tus datos con el mismo cuidado con el que tratamos tu piel. Aquí te explicamos, sin letra pequeña, qué información recogemos, para qué la usamos, con quién la compartimos y cómo puedes decidir sobre ella en cualquier momento.`}
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <LegalSection id="responsable" title="1. Responsable del tratamiento">
        <p>
          <strong>{LEGAL_BUSINESS_NAME}</strong>
          {LEGAL_TAX_ID ? `, identificada con NIT ${LEGAL_TAX_ID},` : ""} con
          domicilio en {LEGAL_ADDRESS}, es la responsable del tratamiento de los
          datos personales recogidos a través de este sitio web, de nuestros
          canales de contacto y de la prestación de nuestros servicios.
        </p>
        <p>
          Canal de atención para asuntos de datos personales:{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>{" "}
          — {PHONE_DISPLAY}. Por ese mismo canal puedes solicitar nuestros datos
          de identificación tributaria.
        </p>
      </LegalSection>

      <LegalSection id="marco" title="2. Marco legal">
        <p>
          Esta política se adopta en cumplimiento de la Ley 1581 de 2012, el
          Decreto 1074 de 2015 (que compiló el Decreto 1377 de 2013) y demás
          normas colombianas sobre protección de datos personales, así como de
          los lineamientos de la Superintendencia de Industria y Comercio.
        </p>
      </LegalSection>

      <LegalSection id="datos" title="3. Qué datos recogemos">
        <p>Dependiendo de cómo interactúes con nosotros, podemos recoger:</p>
        <LegalList
          items={[
            <>
              <strong>Datos de identificación y contacto:</strong> nombre,
              número de teléfono o WhatsApp, correo electrónico y ciudad.
            </>,
            <>
              <strong>Datos de la cita y del servicio:</strong> servicios
              realizados, fechas de sesión, protocolo recomendado y notas de
              seguimiento.
            </>,
            <>
              <strong>Datos sobre el estado de tu piel:</strong> tipo y
              condición de la piel, sensibilidades o alergias conocidas a
              productos cosméticos, cuidados previos y cualquier información que
              nos compartas y resulte relevante para elegir los productos
              adecuados.
            </>,
            <>
              <strong>Fotografías de registro:</strong> imágenes de antes y
              después que forman parte del historial de atención y nos permiten
              comparar la evolución del aspecto de tu piel entre sesiones.
            </>,
            <>
              <strong>Datos de facturación:</strong> los necesarios para emitir
              comprobantes y registrar pagos.
            </>,
            <>
              <strong>Datos de navegación:</strong> páginas visitadas, origen
              del tráfico, dispositivo, navegador e identificadores de cookies o
              tecnologías similares, según se detalla en nuestra{" "}
              <Link
                href="/politica-de-cookies"
                className="underline underline-offset-4 hover:text-[#5c3a21]"
              >
                Política de Cookies
              </Link>
              .
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection id="sensibles" title="4. Tu imagen y datos de menores">
        <p>
          {SITE_NAME} es un centro de estética y belleza, no un prestador de
          servicios de salud: no elaboramos historias clínicas ni registramos
          diagnósticos. Aun así, tu imagen facial es información que afecta tu
          intimidad, y por eso la tratamos con el estándar reforzado que la ley
          reserva a los datos sensibles:
        </p>
        <LegalList
          items={[
            "No estás obligada u obligado a autorizar la toma de fotografías. Puedes negarte y recibir el servicio con normalidad; solo perderías la comparación visual de tu evolución entre sesiones.",
            "Pedimos dos autorizaciones distintas y separadas: una para tomar y conservar las fotos en tu historial de atención, y otra —adicional y siempre opcional— para publicarlas en nuestros canales.",
            "Negarte a la segunda no afecta en nada tu acceso al servicio ni su precio, y puedes revocarla después aunque ya la hayas concedido.",
            "El acceso a tu historial de atención está restringido al personal que participa directamente en tu servicio.",
          ]}
        />
        <p>
          Cuando la persona sea menor de edad, se requiere la autorización de su
          padre, madre o representante legal, y el tratamiento respetará su
          interés superior y sus derechos fundamentales.
        </p>
      </LegalSection>

      <LegalSection id="finalidades" title="5. Para qué usamos tus datos">
        <p>
          En {SITE_NAME} usamos la información de las personas que acceden
          voluntariamente a nuestros servicios con las siguientes finalidades:
        </p>
        <LegalList
          items={[
            <>
              <strong>Prestar y mejorar nuestros servicios:</strong> agendar y
              confirmar citas, realizar la valoración estética, definir y
              ajustar el protocolo de tus sesiones, hacer seguimiento a la
              evolución del aspecto de tu piel y elevar la calidad de la
              atención con base en la experiencia acumulada.
            </>,
            <>
              <strong>Comunicarnos contigo:</strong> responder tus consultas,
              enviarte recordatorios de cita, indicaciones de cuidado posterior,
              información sobre tus sesiones y mensajes de seguimiento.
            </>,
            <>
              <strong>Adelantar campañas de marketing y comunicación:</strong>{" "}
              informarte sobre servicios, novedades, promociones y contenidos
              educativos; y realizar acciones de publicidad digital, incluida la
              creación de audiencias y la medición de resultados de nuestras
              campañas.
            </>,
            <>
              <strong>Analizar y optimizar:</strong> entender de forma agregada
              cómo se usa nuestro sitio y qué contenidos son útiles, para mejorar
              la experiencia y la comunicación.
            </>,
            <>
              <strong>Cumplir obligaciones legales:</strong> facturación,
              conservación de registros y atención de requerimientos de
              autoridades competentes.
            </>,
          ]}
        />
        <p>
          El uso de tus datos con fines publicitarios y de comunicación
          comercial es <strong>opcional y separable</strong>: puedes recibir
          atención sin aceptarlo, y puedes retirar esa autorización en cualquier
          momento sin que ello afecte tu tratamiento ni tu acceso al servicio.
        </p>
      </LegalSection>

      <LegalSection id="autorizacion" title="6. Cómo obtenemos tu autorización">
        <p>
          Solicitamos tu autorización al diligenciar nuestros formularios, al
          iniciar conversación por WhatsApp, al agendar una cita o al firmar el
          consentimiento informado en sede. Esa autorización queda registrada y
          puede consultarse solicitándola por escrito a nuestro canal de
          atención.
        </p>
      </LegalSection>

      <LegalSection id="terceros" title="7. Con quién compartimos tus datos">
        <p>
          No vendemos tus datos personales. Los compartimos únicamente con
          proveedores que nos prestan servicios y que actúan como encargados del
          tratamiento bajo nuestras instrucciones:
        </p>
        <LegalList
          items={[
            "Plataforma de gestión de citas, historia y facturación (VyvaPOS).",
            "Proveedores de infraestructura y alojamiento web (Amazon Web Services).",
            "Herramientas de analítica y medición de sitio (Microsoft Clarity, Metricool).",
            "Plataformas de publicidad y medición de campañas (Meta Platforms), a las que podemos transmitir identificadores cifrados con el único fin de medir resultados y evitar mostrarte anuncios irrelevantes.",
            "Pasarelas de pago y entidades financieras, cuando corresponda.",
            "Autoridades públicas, cuando exista una obligación legal de hacerlo.",
          ]}
        />
        <p>
          Algunos de estos proveedores están ubicados fuera de Colombia. En esos
          casos, la transferencia o transmisión internacional se realiza con las
          garantías exigidas por la normativa colombiana y con el compromiso
          contractual del proveedor de mantener niveles adecuados de seguridad y
          confidencialidad.
        </p>
      </LegalSection>

      <LegalSection id="derechos" title="8. Tus derechos">
        <p>Como titular de tus datos personales tienes derecho a:</p>
        <LegalList
          items={[
            "Conocer, actualizar y rectificar tus datos.",
            "Solicitar prueba de la autorización que otorgaste.",
            "Ser informado sobre el uso que le hemos dado a tus datos.",
            "Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la normativa.",
            "Revocar la autorización o solicitar la supresión de tus datos, cuando no exista un deber legal o contractual que nos obligue a conservarlos.",
            "Acceder de forma gratuita a los datos que hayan sido objeto de tratamiento.",
            "Oponerte al uso de tus datos para fines de marketing y comunicación comercial, en cualquier momento.",
          ]}
        />
      </LegalSection>

      <LegalSection id="procedimiento" title="9. Cómo ejercer tus derechos">
        <p>
          Envía tu solicitud a{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>{" "}
          indicando tu nombre, un dato de contacto y la petición concreta.
          También puedes presentarla presencialmente en {LEGAL_ADDRESS}.
        </p>
        <LegalList
          items={[
            "Las consultas se atienden en un plazo máximo de diez (10) días hábiles, prorrogable por cinco (5) días hábiles más.",
            "Los reclamos se atienden en un plazo máximo de quince (15) días hábiles, prorrogable por ocho (8) días hábiles más.",
            "Si la solicitud está incompleta, te contactaremos dentro de los cinco (5) días siguientes para pedirte la información faltante.",
          ]}
        />
      </LegalSection>

      <LegalSection id="conservacion" title="10. Por cuánto tiempo conservamos tus datos">
        <p>
          Conservamos tus datos mientras exista una relación con nosotros y,
          después, durante el tiempo necesario para cumplir obligaciones legales,
          contables y de responsabilidad profesional. Cumplido ese plazo, los
          suprimimos o los anonimizamos de forma irreversible.
        </p>
      </LegalSection>

      <LegalSection id="seguridad" title="11. Seguridad de la información">
        <p>
          Aplicamos medidas técnicas, humanas y administrativas razonables para
          proteger tus datos frente a accesos no autorizados, pérdida o uso
          indebido: cifrado en tránsito, control de accesos por rol,
          almacenamiento en proveedores con certificaciones de seguridad y
          compromisos de confidencialidad con nuestro equipo. Ningún sistema es
          infalible, pero revisamos periódicamente estas medidas.
        </p>
      </LegalSection>

      <LegalSection id="cambios" title="12. Cambios en esta política">
        <p>
          Podemos actualizar esta política para reflejar cambios normativos o en
          nuestros procesos. Publicaremos la versión vigente en esta página con
          su fecha de actualización y, si el cambio es sustancial y afecta las
          finalidades autorizadas, te lo comunicaremos por los canales de
          contacto que tengamos registrados.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
