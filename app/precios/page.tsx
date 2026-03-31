'use client';

import { Sparkles } from 'lucide-react';
import { SERVICES_PRICING } from '@/lib/content/pricing';

export default function PreciosPage() {
    return (
        <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] selection:bg-[#d4b499] selection:text-white">

            {/* --- Hero Section --- */}
            <section className="pt-52 pb-32 relative flex items-center justify-center text-center">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-px bg-[#d4b499] mb-8"></div>
                        <h1 className="text-6xl md:text-[8.5rem] font-serif leading-none tracking-tight text-[#4a3221]">
                            PRECIOS
                            <span className="block font-script text-5xl md:text-9xl text-[#d4b499] -mt-4 md:-mt-8">Glow Skin</span>
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
                    {SERVICES_PRICING.map((category, idx) => (
                        <div key={idx} className="relative">
                            {/* Category Header */}
                            <div className="mb-16 text-center">
                                <h2 className="text-4xl md:text-5xl font-serif text-[#4a3221] mb-4 tracking-tighter uppercase">{category.category}</h2>
                                <p className="text-xs font-black text-[#d4b499] uppercase tracking-[0.3em] italic max-w-xl mx-auto">{category.description}</p>
                                <div className="w-20 h-px bg-[#d4b499] mx-auto mt-8"></div>
                            </div>

                            {/* Items List - Sans Serif para legibilidad */}
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
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                            <p className="text-[#7d5a44] text-sm md:text-base leading-relaxed max-w-2xl font-medium opacity-90">
                                                {item.detail}
                                            </p>
                                            <a href="https://wa.link/h5481r" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4b499] hover:text-[#4a3221] transition-all border-b border-transparent hover:border-[#4a3221] pb-1">
                                                Reservar <Sparkles size={12} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Styles */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@1,300;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}</style>

        </div>
    );
}