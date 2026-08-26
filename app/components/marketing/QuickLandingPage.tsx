"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { BookingCtaButtons } from "@/app/components/marketing/BookingCtaButtons";
import type { QuickLandingConfig } from "@/lib/landings/quick-landings";

type QuickLandingPageProps = {
  config: QuickLandingConfig;
};

function QuickLandingFaq({ faq }: { faq: NonNullable<QuickLandingConfig["faq"]> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-6 bg-[#f7f0eb]">
      <div className="max-w-md mx-auto">
        <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-8">
          Preguntas frecuentes
        </p>
        <div className="space-y-3">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-[#d4b499]/25 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-[#4a3221]">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <Minus size={16} className="shrink-0 text-[#d4b499]" />
                  ) : (
                    <Plus size={16} className="shrink-0 text-[#d4b499]" />
                  )}
                </button>
                {isOpen ? (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-[#7d5a44]">
                    {item.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function QuickLandingPage({ config }: QuickLandingPageProps) {
  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] overflow-x-hidden selection:bg-[#d4b499] selection:text-white leading-relaxed">
      {/* Sección 1: hero aspiracional */}
      <section className="pt-8 pb-20 px-6">
        <div className="flex flex-col items-center max-w-md mx-auto text-center animate-reveal">
          <h1 className="w-full min-w-0 text-5xl sm:text-6xl font-serif leading-[0.88] mb-6 tracking-tighter text-[#4a3221] break-words">
            {config.titleLine}
            <span className="block font-script text-6xl sm:text-7xl text-[#d4b499] -mt-1 lowercase italic">
              {config.titleAccent}
            </span>
          </h1>

          <p className="text-base text-[#7d5a44] font-medium leading-relaxed mb-10 max-w-sm">
            {config.body}
          </p>

          <div
            className={
              config.images.length > 1
                ? "grid grid-cols-2 gap-3 w-full max-w-sm mb-4"
                : "w-full max-w-sm mb-4"
            }
          >
            {config.images.map((img, index) => {
              const label =
                img.label ??
                (config.images.length === 2
                  ? index === 0
                    ? "Antes"
                    : "Después"
                    : undefined);
              return (
                <div key={img.src} className="flex flex-col gap-2">
                  {label ? (
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#7d5a44]">
                      {label}
                    </p>
                  ) : null}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border-2 border-white">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 480px) 45vw, 200px"
                      priority={index === 0}
                    />
                  </div>
                </div>
              );
            })}
          </div>
            <BookingCtaButtons
              className="mb-4 flex w-full flex-col gap-3 mt-10"
              reserveHereClassName="w-full bg-[#4a3221] text-[#f7f0eb] py-7 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-2xl active:scale-95 transition-all text-center"
              reserveWhatsappClassName="w-full border border-[#4a3221]/25 bg-white text-[#4a3221] py-7 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-lg transition-all text-center"
              whatsappContext={config.whatsappContext}
            />
        </div>
      </section>

      {config.faq && config.faq.length > 0 ? (
        <QuickLandingFaq faq={config.faq} />
      ) : null}

      <section className="py-24 px-6 bg-white">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <div className="w-16 h-px bg-[#d4b499] mb-8" />
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-4">
            {config.ctaEyebrow}
          </p>
          <h2 className="w-full min-w-0 text-5xl sm:text-6xl font-serif mb-6 uppercase tracking-tighter leading-[0.85] text-[#4a3221] break-words">
            {config.ctaTitleLine}
            {config.ctaTitleAccent ? (
              <>
                <br />
                <span className="font-script normal-case italic text-[#d4b499] text-5xl sm:text-6xl tracking-normal">
                  {config.ctaTitleAccent}
                </span>
              </>
            ) : null}
          </h2>
          <p className="text-base text-[#7d5a44] font-medium italic leading-relaxed mb-10 max-w-xs">
            {config.ctaBody}
          </p>

          <BookingCtaButtons
            className="mb-4 flex w-full flex-col gap-3"
            reserveHereClassName="w-full bg-[#4a3221] text-[#f7f0eb] py-7 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-2xl active:scale-95 transition-all text-center"
            reserveWhatsappClassName="w-full border border-[#4a3221]/25 bg-white text-[#4a3221] py-7 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-lg transition-all text-center"
            whatsappContext={config.whatsappContext}
            reserveHereText="reservar ya mismo"
            showReserveHere={true}
            showReserveWhatsapp={false}
          />

          <p className="text-[9px] text-[#a5846e] uppercase tracking-widest">
            {config.ctaFootnote}
          </p>

          <p className="mt-8 text-center text-sm">
            <Link
              href="/precios"
              className="border-b border-[#d4b499] font-semibold uppercase tracking-widest text-[#7d5a44] hover:text-[#4a3221]"
            >
              Ver lista de precios
            </Link>
          </p>
        </div>
      </section>

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
        @keyframes reveal { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-reveal { animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1); }
      `}</style>
    </div>
  );
}