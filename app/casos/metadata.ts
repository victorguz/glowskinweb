import type { Metadata } from "next";
import { getSiteUrl, LOCAL_SEO, SITE_NAME } from "@/lib/seo/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Casos de Éxito | Antes y Después Tratamientos Glow Skin Barranquilla",
  description: "Resultados reales de nuestras pacientes en Barranquilla. Antes y después de limpiezas faciales, tratamientos para acné, rejuvenecimiento y más. Transformaciones en Glow Skin.",
  keywords: [
    "casos éxito glow skin barranquilla",
    "antes después limpieza facial barranquilla",
    "resultados acné barranquilla",
    "transformaciones faciales barranquilla",
    "glow skin antes y después",
    "tratamientos faciales resultados barranquilla",
    "mejor clínica estética barranquilla",
    "rejuvenecimiento facial resultados"
  ],
  openGraph: {
    title: "Casos de Éxito | Antes y Después Tratamientos Glow Skin Barranquilla",
    description: "Resultados reales de nuestras pacientes en Barranquilla. Antes y después de limpiezas faciales, tratamientos para acné, rejuvenecimiento y más.",
    url: `${siteUrl}/casos`,
    images: [
      {
        url: `${siteUrl}/files/glow-skin-casos-exito-barranquilla.jpg`,
        width: 1200,
        height: 630,
        alt: "Casos de éxito Glow Skin Barranquilla - Antes y Después"
      }
    ],
    locale: "es_CO",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Casos de Éxito | Glow Skin Barranquilla",
    description: "Resultados reales de nuestras pacientes. Antes y después de tratamientos faciales en Barranquilla.",
    images: [`${siteUrl}/files/glow-skin-casos-exito-barranquilla.jpg`]
  },
  alternates: {
    canonical: `${siteUrl}/casos`
  }
};
