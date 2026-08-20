/** Logo horizontal — navbar y usos generales */
export const SITE_LOGO_URL = "/files/glow-skin-sofia-nieto-logo-horizontal.png";

/** Logo cuadrado con tipografía — pie de página */
export const SITE_FOOTER_LOGO_URL =
  "/files/glow-skin-sofia-nieto-aesthetics-logo-square.png";

/** Emblema / monograma GS (uso opcional) */
export const SITE_LOGO_EMBLEM_URL = "/files/glow-skin-emblem-gs-initials.png";

export const WA_LINK = "https://wa.link/h5481r";
export const BOOKING_LINK = "https://app.vyvapos.com/a/glowskinbq";
export const INSTAGRAM_URL = "https://instagram.com/glowskinbq";
export const PHONE_TEL = "+573008883486";
/** Solo dígitos, para enlaces wa.me */
export const PHONE_WA_DIGITS = "573008883486";
export const PHONE_DISPLAY = "+57 300 888 3486";
export const CONTACT_EMAIL = "contact@glowskinbq.com";

export const ADDRESS_LINES = [
  "Carrera 50# 74-120",
  "Barranquilla, Colombia.",
] as const;
export const HOURS_LINES = ["8:00 AM — 6:00 PM", "Lunes a Sábados"] as const;

/* ------------------------------------------------------------------ */
/* Datos legales — usados en /terminos-y-condiciones, /politica-de-*   */
/* ------------------------------------------------------------------ */

/** Nombre comercial del responsable del tratamiento de datos. */
export const LEGAL_BUSINESS_NAME = "Glow Skin by Sofía Nieto Aesthetics";

/**
 * NIT del responsable.
 *
 * Vacío por decisión de negocio: no se publica y se entrega a solicitud por
 * correo. Cuando está vacío, las páginas legales muestran en su lugar la vía
 * para solicitarlo; si se llena, se renderiza el número directamente.
 *
 * NOTA: el art. 50(a) de la Ley 1480 de 2011 exige a los proveedores que
 * venden por medios electrónicos informar el NIT de forma accesible. Ver la
 * conversación con Victor (ago/2026) antes de cambiar este criterio.
 */
export const LEGAL_TAX_ID = "";

/** Dirección de notificaciones en una sola línea. */
export const LEGAL_ADDRESS = "Carrera 50 # 74-120, Barranquilla, Atlántico, Colombia";

/** Canal oficial para solicitudes de datos personales (habeas data). */
export const LEGAL_CONTACT_EMAIL = CONTACT_EMAIL;

/** Fecha de última actualización de los documentos legales. */
export const LEGAL_LAST_UPDATED = "20 de agosto de 2026";
