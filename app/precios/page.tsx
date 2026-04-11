'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { List, Sparkles, X } from 'lucide-react';
import {
  SERVICES_PRICING_ENRICHED,
  type EnrichedPricingItem,
} from '@/lib/content/pricing-enriched';
import { LeadTrigger } from '@/app/components/marketing/LeadTrigger';

const preciosCtaClassName =
  'inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4b499] hover:text-[#4a3221] transition-all border-b border-transparent hover:border-[#4a3221] pb-1';

const preciosReservaBtnClassName =
  'inline-flex items-center gap-2 rounded-sm border border-[#d4b499]/45 bg-white/40 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#4a3221] transition-colors hover:border-[#4a3221]/35 hover:bg-[#d4b499]/15';

function ProcedureDetailsCard({
  item,
  reserveSlot,
}: {
  item: EnrichedPricingItem;
  reserveSlot?: ReactNode;
}) {
  return (
    <div className="w-full rounded-2xl border border-[#d4b499]/30 bg-white/55 px-5 py-4 text-left">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4b499] mb-3">
        Qué incluye el procedimiento
      </p>
      <dl className="space-y-2 text-sm text-[#4a3221]">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
          <dt className="shrink-0 font-bold text-[#7d5a44]">Sesiones</dt>
          <dd className="font-medium">{item.sessionsSummary}</dd>
        </div>
        {item.durationSummary ? (
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="shrink-0 font-bold text-[#7d5a44]">Duración</dt>
            <dd className="font-medium">{item.durationSummary}</dd>
          </div>
        ) : null}
        {item.frequencySummary ? (
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="shrink-0 font-bold text-[#7d5a44]">Frecuencia</dt>
            <dd className="font-medium">{item.frequencySummary}</dd>
          </div>
        ) : null}
      </dl>
      {item.includes.length > 0 ? (
        <ul className="mt-4 space-y-1.5 text-sm text-[#7d5a44] leading-relaxed list-disc pl-5">
          {item.includes.map((line, li) => (
            <li key={li}>{line}</li>
          ))}
        </ul>
      ) : null}
      {reserveSlot ? (
        <div className="mt-6 flex justify-center border-t border-[#d4b499]/25 pt-5">
          {reserveSlot}
        </div>
      ) : null}
    </div>
  );
}

export default function PreciosPage() {
  const [detailItem, setDetailItem] = useState<EnrichedPricingItem | null>(null);

  useEffect(() => {
    if (!detailItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetailItem(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [detailItem]);

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] selection:bg-[#d4b499] selection:text-white">
      {/* --- Hero Section --- */}
      <section className="pt-52 pb-32 relative flex items-center justify-center text-center">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-24 h-px bg-[#d4b499] mb-8"></div>
            <h1 className="text-6xl md:text-[8.5rem] font-serif leading-none tracking-tight text-[#4a3221]">
              PRECIOS
              <span className="block font-script text-5xl md:text-9xl text-[#d4b499] -mt-4 md:-mt-8">
                Glow Skin
              </span>
            </h1>
            <div className="w-24 h-px bg-[#d4b499] mt-8 mb-12"></div>
            <p className="text-lg md:text-xl font-medium text-[#7d5a44] max-w-2xl leading-relaxed italic tracking-wide px-4">
              {'\u201C'}
              Protocolos faciales diseñados científicamente para revelar el máximo potencial de tu piel.
              {'\u201D'}
            </p>
          </div>
        </div>
      </section>

      {/* --- Service Menu Content --- */}
      <section className="pb-56 container mx-auto px-6 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-32">
          {SERVICES_PRICING_ENRICHED.map((category, idx) => (
            <div key={idx} className="relative">
              <div className="mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-[#4a3221] mb-4 tracking-tighter uppercase">
                  {category.category}
                </h2>
                <p className="text-xs font-black text-[#d4b499] uppercase tracking-[0.3em] italic max-w-xl mx-auto">
                  {category.description}
                </p>
                <div className="w-20 h-px bg-[#d4b499] mx-auto mt-8"></div>
              </div>

              <div className="space-y-14">
                {category.items.map((item, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4">
                      <h3 className="text-lg md:text-xl font-sans font-bold text-[#4a3221] tracking-wide uppercase leading-tight">
                        {item.name}
                      </h3>
                      <div className="hidden md:block flex-grow border-b border-[#d4b499]/30 mb-1.5 mx-6"></div>
                      <span className="text-lg md:text-xl font-sans font-black text-[#4a3221]">
                        {item.price}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <p className="min-w-0 flex-1 text-[#7d5a44] text-sm md:text-base leading-relaxed font-medium opacity-90">
                        {item.detail}
                      </p>
                      <div className="flex shrink-0 flex-wrap items-center gap-3 self-start md:pt-1">
                        <button
                          type="button"
                          onClick={() => setDetailItem(item)}
                          className={preciosCtaClassName}
                        >
                          Detalles <List size={12} strokeWidth={2.25} />
                        </button>
                        <LeadTrigger
                          mode="booking"
                          suggestedTreatments={[item.name]}
                          className={preciosReservaBtnClassName}
                        >
                          Reservar <Sparkles size={12} />
                        </LeadTrigger>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {detailItem ? (
        <div
          className="fixed inset-0 z-[195] flex items-center justify-center bg-[#ebe3da]/82 p-4 backdrop-blur-sm"
          role="presentation"
          onClick={() => setDetailItem(null)}
        >
          <div
            className="relative max-h-[min(90vh,40rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#d4b499]/35 bg-[#f7f0eb] p-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="precios-detalle-titulo"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-2 text-[#7d5a44] transition-colors hover:bg-[#d4b499]/20 hover:text-[#4a3221]"
              aria-label="Cerrar"
              onClick={() => setDetailItem(null)}
            >
              <X size={20} strokeWidth={1.75} />
            </button>
            <h2
              id="precios-detalle-titulo"
              className="pr-10 text-lg font-sans font-bold uppercase tracking-wide text-[#4a3221]"
            >
              {detailItem.name}
            </h2>
            <div className="mt-5">
              <ProcedureDetailsCard
                item={detailItem}
                reserveSlot={
                  <LeadTrigger
                    mode="booking"
                    suggestedTreatments={[detailItem.name]}
                    className={preciosReservaBtnClassName}
                  >
                    Reservar <Sparkles size={12} />
                  </LeadTrigger>
                }
              />
            </div>
          </div>
        </div>
      ) : null}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@1,300;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}</style>
    </div>
  );
}
