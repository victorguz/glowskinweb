import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalList,
  LegalPageShell,
  LegalSection,
} from "@/app/components/legal/LegalPageShell";
import {
  BOOKING_LINK,
  LEGAL_ADDRESS,
  LEGAL_BUSINESS_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_LAST_UPDATED,
  LEGAL_TAX_ID,
  PHONE_DISPLAY,
} from "@/app/components/site-config";
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from "@/lib/seo/site";

const siteUrl = getSiteUrl();
const description = `Términos y condiciones del servicio de ${SITE_NAME} en ${LOCAL_SEO.city}: agendamiento, pagos, cancelaciones, naturaleza estética de los tratamientos y responsabilidades.`;

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description,
  alternates: { canonical: `${siteUrl}/terminos-y-condiciones` },
  robots: { index: true, follow: true },
  openGraph: {
    title: `Términos y Condiciones | ${SITE_NAME}`,
    description,
    url: `${siteUrl}/terminos-y-condiciones`,
    locale: "es_CO",
    type: "article",
  },
};

export default function TerminosYCondicionesPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Términos y Condiciones del Servicio"
      intro={`Estas condiciones regulan el acceso a este sitio web y la prestación de los servicios estéticos de ${LEGAL_BUSINESS_NAME}. Te pedimos leerlas con calma antes de agendar: están escritas para que sepas exactamente qué esperar de nosotros y qué esperamos de ti.`}
      lastUpdated={LEGAL_LAST_UPDATED}
    >
      <LegalSection id="identificacion" title="1. Quiénes somos">
        <p>
          Este sitio web y los servicios que aquí se describen son operados por{" "}
          <strong>{LEGAL_BUSINESS_NAME}</strong>
          {LEGAL_TAX_ID ? `, identificada con NIT ${LEGAL_TAX_ID},` : ""} con
          domicilio en {LEGAL_ADDRESS}.
        </p>
        <p>
          Puedes contactarnos en{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>{" "}
          o al teléfono {PHONE_DISPLAY}.
        </p>
        {!LEGAL_TAX_ID && (
          <p>
            Nuestro Número de Identificación Tributaria (NIT) y los demás datos
            de identificación tributaria están disponibles para cualquier
            persona que los solicite. Escríbenos a{" "}
            <a
              href={`mailto:${LEGAL_CONTACT_EMAIL}`}
              className="underline underline-offset-4 hover:text-[#5c3a21]"
            >
              {LEGAL_CONTACT_EMAIL}
            </a>{" "}
            y te los entregamos.
          </p>
        )}
      </LegalSection>

      <LegalSection id="aceptacion" title="2. Aceptación de estas condiciones">
        <p>
          Al navegar por este sitio, diligenciar un formulario, escribirnos por
          WhatsApp o agendar una cita, manifiestas que has leído y aceptas estos
          términos, junto con nuestra{" "}
          <Link
            href="/politica-de-privacidad"
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            Política de Privacidad y Tratamiento de Datos
          </Link>{" "}
          y nuestra{" "}
          <Link
            href="/politica-de-cookies"
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            Política de Cookies
          </Link>
          . Si no estás de acuerdo con alguno de estos puntos, te pedimos no
          utilizar el sitio ni contratar los servicios.
        </p>
        <p>
          Podemos actualizar estas condiciones cuando cambien nuestros servicios
          o la normativa aplicable. La versión vigente siempre será la publicada
          en esta página, con su fecha de actualización visible.
        </p>
      </LegalSection>

      <LegalSection id="servicios" title="3. Naturaleza de los servicios">
        <p>
          {SITE_NAME} es un <strong>centro de estética y belleza</strong>.
          Prestamos servicios de cuidado facial estético —limpiezas faciales,
          protocolos para el aspecto del acné y las manchas, microneedling,
          peelings y procedimientos afines— realizados por personal capacitado
          en cosmetología y estética.
        </p>
        <p>
          <strong>
            No somos un prestador de servicios de salud y nuestros servicios no
            tienen finalidad médica ni terapéutica.
          </strong>{" "}
          No realizamos diagnósticos, no prescribimos medicamentos y no
          tratamos patologías. Nuestros procedimientos son estéticos y no
          invasivos, y buscan mejorar el aspecto y la apariencia de la piel.
        </p>
        <p>
          Nada de lo que hacemos reemplaza la consulta con un dermatólogo u
          otro profesional de la salud. Si tienes una condición que requiera
          atención médica, te recomendaremos acudir a un profesional. Si estás
          en embarazo o lactancia, usas medicamentos fotosensibilizantes o
          tienes antecedentes que puedan afectar la tolerancia a un producto,
          te pedimos informarlo antes de la sesión.
        </p>
      </LegalSection>

      <LegalSection id="resultados" title="4. Sobre los resultados">
        <p>
          Cada piel responde de manera distinta. Los resultados dependen de
          factores como el tipo de piel, la condición de partida, la adherencia
          al plan de cuidado en casa, la alimentación, la exposición solar y la
          constancia en las sesiones recomendadas.
        </p>
        <p>
          Por esa razón, las imágenes de casos, testimonios y contenidos
          publicados en este sitio y en nuestras redes sociales son{" "}
          <strong>referenciales</strong> y corresponden a resultados reales de
          personas concretas, pero <strong>no constituyen una promesa ni una
          garantía de resultado</strong> para casos individuales. Cualquier
          estimación de tiempos o mejoras que compartamos es orientativa y se
          ajusta durante la valoración.
        </p>
      </LegalSection>

      <LegalSection id="valoracion" title="5. Valoración y autorización del servicio">
        <LegalList
          items={[
            "Antes de iniciar cualquier protocolo realizamos una valoración estética de la piel y revisamos la información que nos compartas sobre sensibilidades, alergias a productos y cuidados previos.",
            "Te explicamos en qué consiste el procedimiento, qué esperar de él, los cuidados posteriores y los efectos temporales normales (enrojecimiento, descamación, sensibilidad o el llamado efecto purga).",
            "Antes de comenzar te pedimos tu autorización para realizar el servicio. Puedes retirarla en cualquier momento antes de que la sesión inicie.",
            "La información que nos entregues debe ser veraz y completa. Omitir datos relevantes puede afectar la tolerancia de tu piel a los productos y el resultado del servicio.",
          ]}
        />
      </LegalSection>

      <LegalSection id="agendamiento" title="6. Agendamiento, cancelaciones y reprogramación">
        <LegalList
          items={[
            <>
              Las citas se agendan a través de nuestro{" "}
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-[#5c3a21]"
              >
                sistema de reservas
              </a>
              , por WhatsApp, por teléfono o de forma presencial. Una cita se
              considera confirmada cuando recibes nuestra confirmación por el
              mismo canal.
            </>,
            "Si necesitas cancelar o reprogramar, te pedimos avisarnos con la mayor anticipación posible (idealmente 24 horas antes). Esto nos permite ofrecer el espacio a otra persona.",
            "La llegada con retraso puede implicar que el tiempo de tu sesión se reduzca para no afectar a las personas agendadas después de ti, o que debamos reprogramarla.",
            "Nos reservamos el derecho de reprogramar una cita por causas de fuerza mayor, incapacidad del personal o condiciones que hagan inseguro realizar el procedimiento. En ese caso te contactaremos lo antes posible para ofrecerte una nueva fecha.",
          ]}
        />
      </LegalSection>

      <LegalSection id="precios" title="7. Precios, pagos y paquetes">
        <LegalList
          items={[
            "Los precios publicados en este sitio son orientativos, están expresados en pesos colombianos (COP) e incluyen los impuestos aplicables cuando corresponda. El valor final se confirma durante la valoración, según el plan de tratamiento definido.",
            "Podemos actualizar los precios en cualquier momento. Los cambios no afectan servicios ya pagados ni paquetes vigentes adquiridos antes de la actualización.",
            "Los paquetes de sesiones son personales e intransferibles, salvo que acordemos lo contrario por escrito, y tienen la vigencia que se informe al momento de la compra.",
            "Las promociones tienen sus propias condiciones de vigencia, cupos y restricciones, que se informan en la pieza o campaña correspondiente.",
          ]}
        />
      </LegalSection>

      <LegalSection
        id="anticipos"
        title="8. Anticipos, derecho de retracto y cancelaciones"
      >
        <p>
          <strong>Anticipo para agendar.</strong> Para reservar tu cita
          solicitamos el pago total o parcial del servicio. Ese anticipo
          asegura un horario específico de nuestra agenda y el personal
          dispuesto para atenderte.
        </p>

        <p>
          <strong>Derecho de retracto.</strong> Si agendaste por medios no
          presenciales (sitio web, WhatsApp o teléfono), el Estatuto del
          Consumidor (Ley 1480 de 2011, artículo 47) te reconoce el derecho de
          retractarte dentro de los <strong>cinco (5) días hábiles</strong>{" "}
          siguientes a la celebración del contrato, siempre que la sesión aún no
          se haya prestado. Si ejerces este derecho te devolvemos la totalidad
          de lo pagado, por el mismo medio de pago y dentro de los plazos
          legales.
        </p>
        <p>
          Este derecho no aplica cuando el agendamiento se realiza de forma
          presencial en nuestra sede, ni cuando la sesión ya fue prestada. Para
          ejercerlo, escríbenos a{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>{" "}
          indicando tu nombre y la reserva correspondiente.
        </p>

        <p>
          <strong>
            Política de cancelación fuera del plazo de retracto.
          </strong>{" "}
          Cumplido el término anterior, o cuando el retracto no resulte
          aplicable, el anticipo no se reembolsa en dinero, pero{" "}
          <strong>conserva íntegramente su valor</strong> y puedes destinarlo,
          dentro de los <strong>noventa (90) días calendario</strong> siguientes
          a la fecha originalmente agendada, a cualquiera de estas opciones:
        </p>
        <LegalList
          items={[
            "Reprogramar tu sesión para una nueva fecha disponible.",
            "Aplicarlo a otro servicio de nuestro portafolio, de igual o menor valor.",
            "Cederlo a otra persona que desees, informándonos previamente por escrito.",
          ]}
        />
        <p>
          Esta política responde a que la reserva compromete un espacio de
          agenda que dejamos de ofrecer a otras personas, además de costos de
          pasarela de pago, gravámenes financieros y preparación logística que
          se causan en el momento del agendamiento.
        </p>
        <p>
          Te pedimos avisarnos con al menos veinticuatro (24) horas de
          anticipación para reprogramar. Si no puedes asistir y no nos avisas,
          el anticipo se mantiene bajo estas mismas condiciones.
        </p>
        <p>
          Nada de lo anterior limita los derechos que la ley colombiana te
          reconoce como consumidor, incluida la devolución del dinero cuando el
          servicio no se preste por causas atribuibles a {SITE_NAME}.
        </p>
      </LegalSection>

      <LegalSection id="obligaciones" title="9. Tus responsabilidades como usuario">
        <LegalList
          items={[
            "Entregar información veraz sobre tu estado de salud, alergias, medicamentos y tratamientos previos.",
            "Seguir las indicaciones de cuidado posterior que te entreguemos, incluido el uso de protector solar y la suspensión de activos cuando se te indique.",
            "Usar este sitio de forma lícita, sin intentar vulnerar su seguridad, extraer datos de forma automatizada ni suplantar la identidad de terceros.",
            "Abstenerte de publicar o enviarnos contenido de terceros sobre el que no tengas autorización.",
          ]}
        />
      </LegalSection>

      <LegalSection id="propiedad" title="10. Propiedad intelectual">
        <p>
          Los textos, fotografías, videos, guiones, logotipos, la marca{" "}
          {SITE_NAME} y el conjunto del diseño de este sitio están protegidos por
          la normativa de propiedad intelectual y pertenecen a{" "}
          {LEGAL_BUSINESS_NAME} o a sus licenciantes.
        </p>
        <p>
          Puedes compartir nuestros contenidos citando la fuente, pero no
          reproducirlos, modificarlos ni utilizarlos con fines comerciales sin
          autorización previa y escrita.
        </p>
      </LegalSection>

      <LegalSection id="imagenes" title="11. Uso de imágenes de clientes">
        <p>
          Tomamos fotografías de antes y después como parte del historial de
          atención de cada cliente, siempre con tu autorización previa. Esa
          autorización es independiente de la que solicitamos para{" "}
          <strong>publicar</strong> tu imagen: publicar requiere una
          autorización adicional, expresa y por escrito, que es voluntaria, no
          condiciona el acceso al servicio y puede revocarse en cualquier
          momento escribiéndonos a{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
          . Al revocarla retiraremos el material de nuestros canales propios en
          un plazo razonable.
        </p>
      </LegalSection>

      <LegalSection id="responsabilidad" title="12. Limitación de responsabilidad">
        <p>
          Respondemos por la correcta prestación de nuestros servicios conforme a
          la ley colombiana y a los estándares profesionales aplicables. No
          asumimos responsabilidad por reacciones derivadas de información
          incompleta o inexacta suministrada por el usuario, por el
          incumplimiento de los cuidados posteriores indicados, ni por el uso de
          productos o procedimientos realizados por terceros.
        </p>
        <p>
          Tampoco respondemos por interrupciones temporales del sitio web,
          errores en enlaces externos o contenidos de terceros a los que se
          pueda acceder desde aquí.
        </p>
      </LegalSection>

      <LegalSection id="pqr" title="13. Peticiones, quejas y reclamos">
        <p>
          Si algo no salió como esperabas, queremos saberlo. Escríbenos a{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="underline underline-offset-4 hover:text-[#5c3a21]"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>{" "}
          o al {PHONE_DISPLAY}. Daremos respuesta dentro de los quince (15) días
          hábiles siguientes a la recepción de tu solicitud.
        </p>
      </LegalSection>

      <LegalSection id="ley" title="14. Ley aplicable y jurisdicción">
        <p>
          Estas condiciones se rigen por las leyes de la República de Colombia.
          Cualquier controversia se someterá a los jueces competentes de{" "}
          {LOCAL_SEO.city}, sin perjuicio de las acciones que el consumidor pueda
          ejercer ante la Superintendencia de Industria y Comercio.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
