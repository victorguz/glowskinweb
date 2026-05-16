"use client";

import { useState } from "react";
import {
  X,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BENEFICIOS_TRATAMIENTOS, BeneficioTratamiento } from "./data";

const MediaItem = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  if (src.endsWith(".mp4")) {
    return (
      <video src={src} autoPlay loop muted playsInline className={className} />
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

const ModalCarousel = ({
  caseItem,
  onClose,
}: {
  caseItem: BeneficioTratamiento;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % caseItem.imagenes.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === 0 ? caseItem.imagenes.length - 1 : prev - 1,
    );
  };

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#4a3221]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 lg:p-12"
      onClick={onClose}
    >
      <button className="fixed top-6 right-6 text-[#f7f0eb] p-3 bg-white/10 rounded-full hover:bg-[#d4b499] z-[210] backdrop-blur-md">
        <X size={24} strokeWidth={1.5} />
      </button>

      <div
        className="max-w-5xl w-full flex flex-col items-center scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full flex items-center justify-center group">
          {caseItem.imagenes.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-0 lg:-left-12 z-10 p-3 text-white bg-black/20 hover:bg-[#d4b499] rounded-full backdrop-blur-sm hidden md:block"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="flex flex-col items-center gap-4 w-full">
            <MediaItem
              src={caseItem.imagenes[currentIndex].src}
              alt={caseItem.imagenes[currentIndex].alt}
              className="w-full h-auto max-h-[60vh] object-contain rounded-xl lg:rounded-[2rem] shadow-2xl"
              loading="lazy"
            />
            {caseItem.imagenes[currentIndex].descripcion && (
              <p className="text-[#f7f0eb]/90 font-medium italic text-sm text-center max-w-2xl px-4 mt-2">
                {caseItem.imagenes[currentIndex].descripcion}
              </p>
            )}
          </div>

          {caseItem.imagenes.length > 1 && (
            <button
              onClick={next}
              className="absolute right-0 lg:-right-12 z-10 p-3 text-white bg-black/20 hover:bg-[#d4b499] rounded-full backdrop-blur-sm hidden md:block"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {caseItem.imagenes.length > 1 && (
          <div className="flex gap-2 mt-6">
            {caseItem.imagenes.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full ${i === currentIndex ? "w-8 bg-[#d4b499]" : "w-2 bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
        )}

        {caseItem.imagenes.length > 1 && (
          <div className="flex justify-between w-full mt-4 md:hidden px-4">
            <button
              onClick={prev}
              className="p-2 text-white bg-white/10 hover:bg-[#d4b499] rounded-full backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="p-2 text-white bg-white/10 hover:bg-[#d4b499] rounded-full backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        <div className="mt-8 text-center px-4 md:px-10 max-w-2xl">
          <p className="text-[#d4b499] font-black tracking-[0.3em] text-[10px] uppercase mb-2">
            {caseItem.keywords[0] || "RESULTADO"}
          </p>
          <h4 className="text-[#f7f0eb] text-2xl md:text-3xl font-serif tracking-tighter mb-2">
            {caseItem.solucion}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default function CasosPage() {
  const [selectedCase, setSelectedCase] = useState<BeneficioTratamiento | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221]">
      {/* --- Page Hero --- */}
      <section className="pt-52 pb-32 relative flex items-center justify-center text-center">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-24 h-px bg-[#d4b499] mb-8"></div>
            <h1 className="text-6xl md:text-[8rem] font-serif leading-none tracking-tight text-[#4a3221]">
              CASOS
              <span className="block font-script text-5xl md:text-8xl text-[#d4b499] -mt-4 md:-mt-8">
                Glow Skin
              </span>
            </h1>
            <div className="w-24 h-px bg-[#d4b499] mt-8 mb-12"></div>
            <p className="text-lg md:text-xl font-medium text-[#7d5a44] max-w-2xl leading-relaxed tracking-wide italic">
              Resultados reales que transforman la vida de nuestras pacientes
              desde la primera sesión.
            </p>
          </div>
        </div>
      </section>

      {/* --- Cuadrícula de Casos --- */}
      <section className="pb-32 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-40">
          {BENEFICIOS_TRATAMIENTOS.map((caseItem, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${idx % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-20 lg:gap-24 items-center`}
            >
              {/* Sección de Imagen */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-10 bg-[#d4b499]/5 rounded-full blur-[100px] pointer-events-none" />
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[3rem] lg:rounded-[4rem] shadow-[0_40px_100px_rgba(74,50,33,0.15)] cursor-pointer bg-[#f7f0eb]"
                  onClick={() => setSelectedCase(caseItem)}
                >
                  <MediaItem
                    src={caseItem.imagenes[0].src}
                    alt={caseItem.imagenes[0].alt}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#4a3221] shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
                      <Maximize2 size={24} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="absolute top-8 left-8">
                    <span className="px-5 py-2 bg-white/40 backdrop-blur-md border border-white/40 text-[#4a3221] text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {caseItem.keywords[0] || "RESULTADO"}
                    </span>
                  </div>
                  {caseItem.imagenes.length > 1 && (
                    <div className="absolute bottom-8 right-8">
                      <span className="px-4 py-2 bg-[#4a3221]/80 backdrop-blur-md text-[#f7f0eb] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        +{caseItem.imagenes.length - 1} fotos
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sección de Contenido */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4a3221] tracking-tighter leading-none mb-6">
                  {caseItem.solucion}
                </h2>
                <h3 className="text-sm font-black text-[#d4b499] uppercase tracking-[0.3em] mb-12">
                  {caseItem.problema}
                </h3>

                <div className="space-y-10 mb-14">
                  <div className="group/item">
                    <div className="flex justify-between items-baseline gap-4 mb-3">
                      <div className="flex items-center gap-4">
                        <AlertCircle
                          size={20}
                          className="text-[#d4b499]"
                          strokeWidth={1.5}
                        />
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4a3221]">
                          Problema Identificado
                        </h3>
                      </div>
                      <div className="flex-grow border-b border-[#d4b499]/20" />
                    </div>
                    <p className="text-sm text-[#7d5a44] font-medium pl-9 opacity-80 leading-relaxed">
                      {caseItem.problema}
                    </p>
                  </div>

                  <div className="group/item">
                    <div className="flex justify-between items-baseline gap-4 mb-3">
                      <div className="flex items-center gap-4">
                        <CheckCircle2
                          size={20}
                          className="text-[#d4b499]"
                          strokeWidth={1.5}
                        />
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4a3221]">
                          Solución Glow Skin
                        </h3>
                      </div>
                      <div className="flex-grow border-b border-[#d4b499]/20" />
                    </div>
                    <p className="text-sm text-[#7d5a44] font-medium pl-9 opacity-80 leading-relaxed">
                      {caseItem.solucion}
                    </p>
                  </div>
                </div>

                <div className="mb-12 p-8 lg:p-10 bg-white rounded-[2rem] border border-[#d4b499]/10 shadow-[0_20px_40px_rgba(74,50,33,0.05)] relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499] mb-4">
                    ANÁLISIS DEL CASO
                  </p>
                  <p className="text-[#4a3221] leading-relaxed text-xl font-medium italic opacity-90">
                    {caseItem.descripcion}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  {caseItem.keywords.map((word, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-black text-[#7d5a44] uppercase tracking-[0.2em] flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4b499]/50"></span>{" "}
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Image Detail Modal Carousel --- */}
      {selectedCase && (
        <ModalCarousel
          caseItem={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}

      {/* Custom Styles */}
      <style>{`
        /* Google Fonts import eliminado para optimización. Usa next/font en layout.tsx */
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        
        .scale-up { animation: scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes scaleUp { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .animate-reveal { animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1); }
        @keyframes reveal { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
