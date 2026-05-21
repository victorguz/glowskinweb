import type { Metadata } from "next";
import { QuickLandingPage } from "@/app/components/marketing/QuickLandingPage";
import { quickLandings } from "@/lib/landings/quick-landings";

const config = quickLandings["anti-acne"];

export const metadata: Metadata = {
  title: config.metadata.title,
  description: config.metadata.description,
};

export default function AntiAcneLandingPage() {
  return <QuickLandingPage config={config} />;
}
