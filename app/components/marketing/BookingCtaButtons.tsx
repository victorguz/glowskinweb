"use client";

import { useLeadForms } from "@/app/components/marketing/LeadFormsProvider";
import { PHONE_WA_DIGITS } from "@/app/components/site-config";
import { getWhatsappMessage } from "@/app/components/marketing/whatsapp-messages";

type BookingCtaButtonsProps = {
  className?: string;
  reserveHereClassName?: string;
  reserveHereText?: string;
  showReserveHere?: boolean;
  reserveWhatsappClassName?: string;
  reserveWhatsappText?: string;
  showReserveWhatsapp?: boolean;
  suggestedTreatments?: string[];
  whatsappContext?:
    | "metodo-glow-skin"
    | "limpieza-anti-acne"
    | "limpieza-anti-acne-seborreguladora"
    | string;
};

/** Estilo principal del CTA (reservar ahora → modal de reserva). */
export const bookingCtaReserveHereClassName =
  "inline-flex items-center justify-center rounded-full bg-[#4a3221] px-10 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#f7f0eb] transition-colors hover:bg-[#5c3a21]";

/** Estilo secundario (botón WhatsApp duplicado; oculto por defecto). */
export const bookingCtaReserveWhatsappClassName =
  "inline-flex items-center justify-center rounded-full border border-[#4a3221]/30 bg-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#4a3221] transition-colors hover:bg-[#f7f0eb]";

function buildWaMeUrl(digits: string, text: string) {
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function BookingCtaButtons({
  className,
  reserveHereClassName,
  reserveWhatsappClassName,
  reserveHereText,
  reserveWhatsappText,
  showReserveHere,
  showReserveWhatsapp = false,
  suggestedTreatments,
  whatsappContext,
}: BookingCtaButtonsProps) {
  const { openBooking } = useLeadForms();

  const handleReserveNowClick = () => {
    openBooking({ suggestedTreatments, whatsappContext });
  };

  const handleWhatsappClick = () => {
    const msg = `${getWhatsappMessage(whatsappContext).trim()}\n\nMi nombre es _____`;
    const url = buildWaMeUrl(PHONE_WA_DIGITS, msg);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={
        className ??
        "flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      }
    >
      {showReserveHere === undefined || showReserveHere ? (
        <button
          type="button"
          onClick={handleReserveNowClick}
          className={reserveHereClassName ?? bookingCtaReserveHereClassName}
        >
          {reserveHereText ?? "reservar ahora"}
        </button>
      ) : null}
      {showReserveWhatsapp ? (
        <button
          type="button"
          onClick={handleWhatsappClick}
          className={
            reserveWhatsappClassName ?? bookingCtaReserveWhatsappClassName
          }
        >
          {reserveWhatsappText ?? "reservar por whatsapp"}
        </button>
      ) : null}
    </div>
  );
}
