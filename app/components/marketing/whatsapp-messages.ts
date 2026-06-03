/** Slugs de contexto (no confundir con nombres largos de tratamiento en precios). */
const KNOWN_WHATSAPP_CONTEXT_SLUGS = new Set([
  "metodo-glow-skin",
  "limpieza-anti-acne",
  "limpieza-anti-acne-seborreguladora",
  "limpieza-facial",
  "antiox-peel-pro",
  "anti-acne",
  "microneedling",
  "porcelanizacion-facial",
]);

/** Mensajes predefinidos para wa.me (intro sin datos de contacto). */
export function getWhatsappMessage(context?: string): string {
  if (context === "metodo-glow-skin") {
    return "Hola, me gustaría tener más información acerca del Método Glow Skin.";
  }
  if (context === "limpieza-anti-acne") {
    return "Hola, me gustaría agendar una cita de Limpieza Facial Anti-Acné del Método Glow Skin.";
  }
  if (context === "limpieza-anti-acne-seborreguladora") {
    return "Hola, me gustaría agendar una cita de Limpieza Anti-Acné Seborreguladora del Método Glow Skin.";
  }
  if (context === "limpieza-facial") {
    return "Hola, me gustaría agendar una Limpieza Facial en Glow Skin.";
  }
  if (context === "antiox-peel-pro") {
    return "Hola, me gustaría agendar una cita de Antiox Peel Pro en Glow Skin.";
  }
  if (context === "anti-acne") {
    return "Hola, me gustaría agendar una cita de Tratamiento Anti-Acné en Glow Skin.";
  }
  if (context === "microneedling") {
    return "Hola, me gustaría agendar una cita de Microneedling en Glow Skin.";
  }
  if (context === "porcelanizacion-facial") {
    return "Hola, me gustaría agendar una cita de Porcelanización Facial en Glow Skin.";
  }
  if (context && context !== "") {
    return `Hola, me gustaría agendar una cita para ${context}.`;
  }
  return "Hola, me gustaría agendar una cita.";
}

/** Un solo contexto activo: slug explícito gana; si no, primer tratamiento sugerido. */
export function pickBookingWhatsappContext(
  whatsappContext?: string,
  suggestedTreatments?: string[],
): string | undefined {
  const ctx = whatsappContext?.trim();
  if (ctx && KNOWN_WHATSAPP_CONTEXT_SLUGS.has(ctx)) return ctx;
  if (ctx) return ctx;

  const first = suggestedTreatments?.[0]?.trim();
  if (first && KNOWN_WHATSAPP_CONTEXT_SLUGS.has(first)) return first;
  return first || undefined;
}

/** Mensaje final del modal de reserva: intro contextual + bloque de datos. */
export function buildBookingWhatsappText(
  context: string | undefined,
  data: { nombre: string; email: string; cel: string },
): string {
  const intro = getWhatsappMessage(context).trim();
  const details = [
    "*Reserva Glow Skin*",
    `Nombre: ${data.nombre.trim()}`,
    `Email: ${data.email.trim()}`,
    `Cel/WhatsApp: ${data.cel.trim()}`,
  ].join("\n");

  const dateTime = "Fecha y hora de preferencia: ______";
  return `${intro}\n\n${details}\n\n${dateTime}`;
}
