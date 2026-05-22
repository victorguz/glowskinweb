"use client";

import Link from "next/link";
import { LeadTrigger } from "@/app/components/marketing/LeadTrigger";
import { BOOKING_LINK } from "@/app/components/site-config";

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

export const bookingCtaReserveHereClassName =
  "inline-flex items-center justify-center rounded-full bg-[#4a3221] px-10 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#f7f0eb] transition-colors hover:bg-[#5c3a21]";

export const bookingCtaReserveWhatsappClassName =
  "inline-flex items-center justify-center rounded-full border border-[#4a3221]/30 bg-white px-10 py-5 text-[10px] font-black uppercase tracking-[0.25em] text-[#4a3221] transition-colors hover:bg-[#f7f0eb]";

import { PHONE_WA_DIGITS } from "@/app/components/site-config";

function getWhatsappMessage(context?: string) {
  if (context === "metodo-glow-skin") {
    return "Hola, me gustaría tener más información acerca del Método Glow Skin. Mi nombre es _____";
  }
  if (context === "limpieza-anti-acne") {
    return "Hola, me gustaría agendar una cita de Limpieza Facial Anti-Acné del Método Glow Skin. Mi nombre es _____";
  }
  if (context === "limpieza-anti-acne-seborreguladora") {
    return "Hola, me gustaría agendar una cita de Limpieza Anti-Acné Seborreguladora del Método Glow Skin. Mi nombre es _____";
  }
  if (context === "limpieza-facial") {
    return "Hola, me gustaría agendar una Limpieza Facial en Glow Skin. Mi nombre es _____";
  }
  if (context === "antiox-peel-pro") {
    return "Hola, me gustaría agendar una cita de Antiox Peel Pro en Glow Skin. Mi nombre es _____";
  }
  if (context === "anti-acne") {
    return "Hola, me gustaría agendar una cita de Tratamiento Anti-Acné en Glow Skin. Mi nombre es _____";
  }
  if (context === "microneedling") {
    return "Hola, me gustaría agendar una cita de Microneedling en Glow Skin. Mi nombre es _____";
  }
  if (context === "porcelanizacion-facial") {
    return "Hola, me gustaría agendar una cita de Porcelanización Facial en Glow Skin. Mi nombre es _____";
  }
  if (context && context !== "") {
    return `Hola, me gustaría agendar una cita para ${context}. Mi nombre es _____`;
  }
  return "Hola, me gustaría agendar una cita. Mi nombre es _____";
}

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
  showReserveWhatsapp,
  suggestedTreatments,
  whatsappContext,
}: BookingCtaButtonsProps) {
  const handleWhatsappClick = () => {
    const msg = getWhatsappMessage(whatsappContext);
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
      <Link
        href={BOOKING_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={reserveHereClassName ?? bookingCtaReserveHereClassName}
      >
        {reserveHereText ?? "reservar aquí"}
      </Link>
      ) : null}
      {showReserveWhatsapp ==undefined || showReserveWhatsapp ? (
      <button
        type="button"
        onClick={handleWhatsappClick}
        className={reserveWhatsappClassName ?? bookingCtaReserveWhatsappClassName}
      >
        {reserveWhatsappText ?? "reservar por whatsapp"}
      </button>
      ) : null}
    </div>
  );
}
