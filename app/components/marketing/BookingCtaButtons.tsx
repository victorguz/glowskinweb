"use client";

import Link from "next/link";
import { LeadTrigger } from "@/app/components/marketing/LeadTrigger";
import { BOOKING_LINK } from "@/app/components/site-config";

type BookingCtaButtonsProps = {
  className?: string;
  reserveHereClassName?: string;
  reserveWhatsappClassName?: string;
  suggestedTreatments?: string[];
};

const defaultReserveHereClassName =
  "inline-flex items-center justify-center rounded-full bg-[#4a3221] px-10 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#f7f0eb] transition-colors hover:bg-[#5c3a21]";

const defaultReserveWhatsappClassName =
  "inline-flex items-center justify-center rounded-full border border-[#4a3221]/30 bg-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#4a3221] transition-colors hover:bg-[#f7f0eb]";

export function BookingCtaButtons({
  className,
  reserveHereClassName,
  reserveWhatsappClassName,
  suggestedTreatments,
}: BookingCtaButtonsProps) {
  return (
    <div
      className={
        className ??
        "flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      }
    >
      <Link
        href={BOOKING_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={reserveHereClassName ?? defaultReserveHereClassName}
      >
        reservar aqui
      </Link>
      <LeadTrigger
        mode="booking"
        suggestedTreatments={suggestedTreatments}
        className={reserveWhatsappClassName ?? defaultReserveWhatsappClassName}
      >
        reservar por whatsapp
      </LeadTrigger>
    </div>
  );
}
