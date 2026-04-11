import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { SiteWhatsappButton } from "@/app/components/SiteWhatsappButton";
import { LeadFormsProvider } from "@/app/components/marketing/LeadFormsProvider";
import { FacebookPixelRoot } from "@/app/components/marketing/FacebookPixelRoot";
import { INSTAGRAM_URL, PHONE_TEL, WA_LINK } from "@/app/components/site-config";
import { DEFAULT_KEYWORDS, getSiteUrl, LOCAL_SEO, SITE_NAME, SITE_TAGLINE } from "@/lib/seo/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Limpieza facial y estética en ${LOCAL_SEO.city}`,
    template: `%s | ${SITE_NAME} ${LOCAL_SEO.city}`,
  },
  description: SITE_TAGLINE,
  keywords: [...DEFAULT_KEYWORDS],
  authors: [{ name: "Sofía Nieto", url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: "/files/glow-skin-emblem-gs-initials.png",
    apple: "/files/glow-skin-emblem-gs-initials.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
  },
  category: "health",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": `${siteUrl}/#local`,
      name: SITE_NAME,
      description: SITE_TAGLINE,
      url: siteUrl,
      telephone: PHONE_TEL,
      image: `${siteUrl}/files/glow-skin-sofia-nieto-aesthetics-logo-square.png`,
      address: {
        "@type": "PostalAddress",
        streetAddress: LOCAL_SEO.addressStreet,
        addressLocality: LOCAL_SEO.city,
        addressRegion: LOCAL_SEO.region,
        postalCode: LOCAL_SEO.postalCode,
        addressCountry: LOCAL_SEO.countryCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: LOCAL_SEO.latitude,
        longitude: LOCAL_SEO.longitude,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      sameAs: [INSTAGRAM_URL, WA_LINK],
      areaServed: {
        "@type": "City",
        name: LOCAL_SEO.city,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_NAME,
      inLanguage: "es-CO",
      publisher: { "@id": `${siteUrl}/#local` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="jsonld-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LeadFormsProvider>
          <FacebookPixelRoot />
          <SiteHeader />
          <main className="flex-1 w-full min-h-0">{children}</main>
          <SiteFooter />
          <SiteWhatsappButton />
        </LeadFormsProvider>
        <Script
          id="metricool-be"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html:
              'function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}loadScript(function(){beTracker.t({hash:"3233026e425033af24d3c672ce991559"})});',
          }}
        />
      </body>
    </html>
  );
}
