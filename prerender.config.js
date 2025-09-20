module.exports = {
  routes: [
    "/",
    "/blog",
    "/casos-reales",
    "/nosotros",
    "/precios",

    // Service template routes - Limpiezas Faciales
    "/servicio/limpieza-facial",
    "/servicio/limpieza-facial-anti-acne",
    "/servicio/limpieza-facial-pieles-sensibles",

    // Service template routes - Protocolos Acné
    "/servicio/tratamiento-anti-acne-intensivo",

    // Service template routes - Manchas y Cicatrices
    "/servicio/tratamiento-despigmentante",
    "/servicio/tratamiento-regenerative-plus",

    // Service template routes - Rejuvenecimiento
    "/servicio/antiox-peel-pro",
    "/servicio/porcelanizacion-facial",

    // Service template routes - Exosomas
    "/servicio/microneedling-exosomas",

    // Service template routes - PDRN
    "/servicio/protocolo-pdrn",

    // Service template routes - Cuidado Labios
    "/servicio/glow-lips",
    "/servicio/tratamiento-3-sesiones-glow-lips",

    // Legacy routes (will redirect)
    "/limpieza-facial",
    "/limpieza-facial-anti-acne",
    "/limpieza-facial-pieles-sensibles",
  ],
};
