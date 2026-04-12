import type { Metadata } from "next";
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Precios de Tratamientos Faciales | Glow Skin Barranquilla",
  description: "Conoce nuestros precios de limpieza facial, dermapen, PDRN, exosomas y más tratamientos estéticos en Barranquilla. Calidad profesional a precios accesibles en Alto Prado.",
  keywords: [
    "precios limpieza facial barranquilla",
    "costo dermapen barranquilla",
    "precio PDRN barranquilla",
    "exosomas precio barranquilla",
    "tratamientos faciales precios barranquilla",
    "limpieza facial costo norte barranquilla",
    "estética precios alto prado",
    "glow skin precios barranquilla",
    "tratamiento acné precio barranquilla",
    "antiaging precio barranquilla"
  ],
  openGraph: {
    title: "Precios de Tratamientos Faciales | Glow Skin Barranquilla",
    description: "Conoce nuestros precios de limpieza facial, dermapen, PDRN, exosomas y más tratamientos estéticos en Barranquilla. Calidad profesional a precios accesibles en Alto Prado.",
    url: `${siteUrl}/precios`,
    images: [
      {
        url: `${siteUrl}/files/glow-skin-precios-tratamientos-barranquilla.jpg`,
        width: 1200,
        height: 630,
        alt: "Precios de tratamientos faciales Glow Skin Barranquilla"
      }
    ],
    locale: "es_CO",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Precios de Tratamientos Faciales | Glow Skin Barranquilla",
    description: "Conoce nuestros precios de limpieza facial, dermapen, PDRN, exosomas y más tratamientos estéticos en Barranquilla.",
    images: [`${siteUrl}/files/glow-skin-precios-tratamientos-barranquilla.jpg`]
  },
  alternates: {
    canonical: `${siteUrl}/precios`
  }
};
