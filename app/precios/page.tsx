"use client";

import { useState } from "react";
import { List, Sparkles } from "lucide-react";
import { SERVICES_PRICING_ENRICHED } from "@/lib/content/pricing-enriched";
import { LeadTrigger } from "@/app/components/marketing/LeadTrigger";
import { ProcedureDetailsCard } from "@/app/precios/ProcedureDetailsCard";

const preciosCtaClassName =
  "inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4b499] hover:text-[#4a3221] transition-all border-b border-transparent hover:border-[#4a3221] pb-1";

const preciosReservaBtnClassName =
  "inline-flex items-center gap-2 rounded-sm border border-[#d4b499]/45 bg-white/40 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#4a3221] transition-colors hover:border-[#4a3221]/35 hover:bg-[#d4b499]/15";

function slugifyPrecioId(categoryIdx: number, itemIdx: number) {
  return `precio-${categoryIdx}-${itemIdx}`;
}

export default function PreciosPage() {
  const [openDetails, setOpenDetails] = useState<{ [key: string]: boolean }>({});

  const toggleDetails = (key: string) => {
    setOpenDetails(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] selection:bg-[#d4b499] selection:text-white">
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
              {"\u201C"}
              Protocolos faciales diseñados científicamente para revelar el
              máximo potencial de tu piel.
              {"\u201D"}
            </p>
          </div>
        </div>
      </section>

      <section
        className="pb-56 container mx-auto px-6 lg:px-24"
        aria-label="Lista de precios y detalle de procedimientos"
      >
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
                  <article
                    key={i}
                    id={slugifyPrecioId(idx, i)}
                    className="group cursor-default"
                  >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4">
                      <h3 className="text-lg md:text-xl font-sans font-bold text-[#4a3221] tracking-wide uppercase leading-tight">
                        {item.name}
                      </h3>
                      <div className="hidden md:block flex-grow border-b border-[#d4b499]/30 mb-1.5 mx-6"></div>
                      <p className="text-lg md:text-xl font-sans font-black text-[#4a3221]">
                        {item.price}
                      </p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <p className="min-w-0 flex-1 text-[#7d5a44] text-sm md:text-base leading-relaxed font-medium opacity-90">
                        {item.detail}
                      </p>
                      <div className="flex shrink-0 items-center gap-3">
                        <button
                          className={`${preciosCtaClassName} cursor-pointer`}
                          onClick={() => toggleDetails(`details-${idx}-${i}`)}
                        >
                          Detalles <List size={12} strokeWidth={2.25} aria-hidden />
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
                    <div className={`${openDetails[`details-${idx}-${i}`] ? 'block' : 'hidden'}`}>
                      <div className="mt-6 w-full flex justify-center">
                        <div className="w-full max-w-4xl">
                          <ProcedureDetailsCard
                            item={item}
                            reserveSlot={
                              <LeadTrigger
                                mode="booking"
                                suggestedTreatments={[item.name]}
                                className={preciosReservaBtnClassName}
                              >
                                Reservar <Sparkles size={12} />
                              </LeadTrigger>
                            }
                          />
                        </div>
                      </div>
                    </div>
              </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@1,300;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}</style>
    </>
  );
}
