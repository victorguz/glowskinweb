import type { Metadata } from "next";
import { QuickLandingPage } from "@/app/components/marketing/QuickLandingPage";
import { quickLandings } from "@/lib/landings/quick-landings";

const config = quickLandings["porcelanizacion-facial"];

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
};

export default function PorcelanizacionFacialLandingPage() {
  return <QuickLandingPage config={config} />;
}
