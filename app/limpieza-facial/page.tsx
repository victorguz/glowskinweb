import type { Metadata } from "next";
import { QuickLandingPage } from "@/app/components/marketing/QuickLandingPage";
import { quickLandings } from "@/lib/landings/quick-landings";

const config = quickLandings["limpieza-facial"];

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
  robots: { index: false, follow: true },
};

export default function LimpiezaFacialLandingPage() {
  return <QuickLandingPage config={config} />;
}
