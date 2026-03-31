'use client';

import { useState, useEffect } from 'react';
import {
    X,
    ChevronRight,
    Star,
    MessageCircle,
    ArrowRight,
    Maximize2,
    Award,
    Zap,
    Leaf,
} from 'lucide-react';

// --- Base Constants ---
const BASE_IMG_URL = "https://main.d1xrycrl1hw09l.amplifyapp.com/assets/images";

const ASSETS = {
    sofia: `${BASE_IMG_URL}/sofia/sofia-nieto-glow-skin-bq.png`,
    hero: [
        `${BASE_IMG_URL}/hero/1-glow-skin-hero-limpieza-facial.webp`,
        `${BASE_IMG_URL}/hero/2-glow-skin-hero-tratamiento-facial.webp`,
        `${BASE_IMG_URL}/hero/3-glow-skin-hero-servicios-esteticos.webp`
    ],
    methods: [
        {
            id: "facial",
            title: "Limpieza Facial GlowSkin",
            tag: "Signature",
            desc: "Nuestra técnica insignia que combina extracción manual precisa con hidratación profunda para un brillo inmediato.",
            img: `${BASE_IMG_URL}/methods/1-limpieza-facial-glow-skin.jpg`
        },
        {
            id: "acne",
            title: "Método Anti-Acné",
            tag: "Clinical",
            desc: "Protocolo correctivo diseñado para equilibrar el microbioma cutáneo y reducir inflamaciones activas.",
            img: `${BASE_IMG_URL}/methods/1-metodo-anti-acne.webp`
        },
        {
            id: "regen",
            title: "Método Regenerativo",
            tag: "Advanced",
            desc: "Inducción de colágeno mediante micro-punciones y activos regeneradores para una textura perfecta.",
            img: `${BASE_IMG_URL}/methods/1-metodo-regenerativo.webp`
        },
        {
            id: "spots",
            title: "Tratamiento Anti-manchas",
            tag: "Radiance",
            desc: "Terapia despigmentante selectiva que unifica el tono de la piel sin comprometer su barrera protectora.",
            img: `${BASE_IMG_URL}/methods/1-metodo-anti-manchas.webp`
        }
    ],
    cases: [
        { url: `${BASE_IMG_URL}/cases/caso-1-tratamiento-anti-manchas.webp`, title: "Tratamiento Anti-manchas" },
        { url: `${BASE_IMG_URL}/cases/caso-2-tratamiento-anti-acne.webp`, title: "Control de Acné Severo" },
        { url: `${BASE_IMG_URL}/cases/caso-3-tratamiento-revitalizacion.webp`, title: "Revitalización Facial" },
        { url: `${BASE_IMG_URL}/cases/caso-4-tratamiento-anti-acne.webp`, title: "Limpieza Profunda" },
        { url: `${BASE_IMG_URL}/cases/caso-5-tratamiento-anti-acne-2.webp`, title: "Acné Quístico" },
        { url: `${BASE_IMG_URL}/cases/caso-6-revitalizacion.webp`, title: "Efecto Glow Inmediato" }
    ]
};

const REVIEWS = [
    { name: "Karla Ramírez", text: "Sofi es una profesional excepcional. Me ayudó a combatir un acné persistente cuando ya nada funcionaba. Su conocimiento y trato son inigualables.", time: "hace un mes" },
    { name: "Edgar Arrieta", text: "El cambio en mi piel fue inmediato. No solo el aspecto físico, sino la sensación de frescura y limpieza es algo que nunca había experimentado en otros sitios.", time: "hace un mes" },
    { name: "Samara Chartuni", text: "Atención personalizada de verdad. Te explica cada paso y el porqué de cada producto. Es mi momento favorito del mes para consentirme.", time: "hace 3 semanas" }
];

export default function OtraPage() {
    const [currentHero, setCurrentHero] = useState(0);
    const [activeCase, setActiveCase] = useState<(typeof ASSETS.cases)[number] | null>(null);
    const [activeReview, setActiveReview] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHero((prev) => (prev + 1) % ASSETS.hero.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#fbf6f3] font-sans text-[#4a3221] selection:bg-[#7d5a44] selection:text-white">

            {/* --- Hero Section --- */}
            <section className="relative h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {ASSETS.hero.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1500 scale-105 ${idx === currentHero ? 'opacity-100 scale-100' : 'opacity-0'}`}
                            alt="Skin Care"
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#fbf6f3] via-[#fbf6f3]/40 to-transparent z-10" />
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-20">
                    <div className="max-w-4xl">
                        <div className="overflow-hidden mb-6">
                            <span className="block tracking-[0.4em] text-[#a5846e] font-black text-xs uppercase animate-reveal">Estética Facial de Autor</span>
                        </div>
                        <h1 className="text-7xl md:text-[10rem] font-serif leading-[0.85] text-[#5c3a21] mb-12 tracking-tighter">
                            Bespoke <br /> <span className="italic font-light opacity-80">Radiance</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-[#7d5a44] max-w-xl mb-12 leading-relaxed text-balance">
                            Transformamos la salud de tu piel con protocolos clínicos diseñados exclusivamente para tu tipo de cutis.
                        </p>
                        <div className="flex flex-wrap gap-8 items-center">
                            <a href="https://wa.link/h5481r" target="_blank" className="bg-[#5c3a21] text-white px-12 py-6 rounded-full font-bold flex items-center gap-4 hover:bg-[#a5846e] transition-all shadow-2xl group">
                                RESERVAR VALORACIÓN <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Sofia Intro Section --- */}
            <section id="nosotros" className="py-32 container mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-5 order-2 lg:order-1">
                        <h2 className="text-5xl md:text-7xl font-serif text-[#5c3a21] mb-10 leading-none">Tu piel es <br /> nuestro lienzo.</h2>
                        <p className="text-xl text-[#7d5a44] leading-relaxed mb-12">
                            Liderado por <span className="text-[#5c3a21] font-bold">Sofía Nieto</span>, experta en Cosmiatría avanzada, Glow Skin nace de la pasión por la armonía facial y el rigor científico.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Award, title: "Certificación Clínica", text: "Expertos en Cosmetología y Cosmiatría de vanguardia." },
                                { icon: Leaf, title: "Activos Premium", text: "Selección rigurosa de productos respetuosos con tu barrera cutánea." },
                                { icon: Zap, title: "Resultados Visibles", text: "Cambios reales y tangibles desde el primer tratamiento." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#a5846e]/10 flex items-center justify-center text-[#a5846e] group-hover:bg-[#a5846e] group-hover:text-white transition-all">
                                        <item.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase tracking-widest text-xs text-[#5c3a21] mb-2">{item.title}</h4>
                                        <p className="text-sm text-[#7d5a44]/80 leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 order-1 lg:order-2 relative">
                        <div className="absolute -inset-10 bg-[#a5846e]/5 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-[0_50px_100px_rgba(125,90,68,0.15)] group">
                            <img src={ASSETS.sofia} alt="Sofía Nieto" className="w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#5c3a21]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                                <p className="text-white font-serif text-3xl">Sofía Nieto</p>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-[#f1e4dc] hidden xl:block">
                            <div className="flex gap-1 text-amber-500 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={18} />)}
                            </div>
                            <p className="text-3xl font-serif text-[#5c3a21]">38+</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#a5846e]">Reviews en Google</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Services Section --- */}
            <section id="servicios" className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-2xl">
                            <span className="text-[#a5846e] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">Especialidades</span>
                            <h2 className="text-6xl md:text-8xl font-serif text-[#5c3a21] leading-[0.9]">Nuestros <br /> Métodos</h2>
                        </div>
                        <p className="text-[#7d5a44] max-w-xs text-right text-lg font-light leading-relaxed">
                            Curaduría de tratamientos estéticos con enfoque clínico para resultados duraderos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                        {ASSETS.methods.map((method, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[3rem] mb-10 shadow-2xl">
                                    <img src={method.img} alt={method.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute top-8 left-8">
                                        <span className="px-5 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em]">
                                            {method.tag}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#5c3a21] scale-0 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                            <ArrowRight size={28} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-4xl font-serif text-[#5c3a21] mb-4 group-hover:text-[#a5846e] transition-colors">{method.title}</h3>
                                        <p className="text-[#7d5a44] text-lg font-light leading-relaxed max-w-lg">{method.desc}</p>
                                    </div>
                                    <div className="text-[4rem] font-serif text-[#f1e4dc] select-none">0{idx + 1}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Results Gallery --- */}
            <section id="casos" className="py-32 bg-[#5c3a21] text-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-serif">Resultados Reales</h2>
                        <p className="text-[#a5846e] tracking-[0.3em] font-black uppercase text-xs mt-6">Compruébalo tú mismo</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ASSETS.cases.map((item, i) => (
                            <div
                                key={i}
                                className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-2xl border border-white/5"
                                onClick={() => setActiveCase(item)}
                            >
                                <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100" />
                                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-xs uppercase tracking-[0.3em] font-black text-[#a5846e] mb-2">Protocolo Glow Skin</p>
                                    <p className="text-2xl font-serif">{item.title}</p>
                                </div>
                                <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Testimonials Section --- */}
            <section id="testimonios" className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col items-center text-center">
                        <MessageCircle size={48} className="text-[#a5846e] mb-12 opacity-30" />
                        <div className="relative max-w-4xl mx-auto min-h-[300px] flex items-center">
                            {REVIEWS.map((review, i) => (
                                <div key={i} className={`transition-all duration-1000 flex flex-col items-center ${i === activeReview ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                                    <p className="text-3xl md:text-5xl font-serif text-[#5c3a21] leading-tight mb-12 italic">
                                        {'\u201C'}
                                        {review.text}
                                        {'\u201D'}
                                    </p>
                                    <div>
                                        <p className="font-black uppercase tracking-[0.2em] text-xs text-[#a5846e] mb-1">{review.name}</p>
                                        <p className="text-sm text-[#7d5a44]/60 font-medium">{review.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-16">
                            {REVIEWS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveReview(i)}
                                    className={`h-1 transition-all duration-500 rounded-full ${i === activeReview ? 'bg-[#5c3a21] w-12' : 'bg-[#f1e4dc] w-4 hover:bg-[#a5846e]'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="relative py-40 overflow-hidden bg-[#fbf6f3]">
                <div className="absolute inset-0 z-0">
                    <img src={ASSETS.hero[0]} className="w-full h-full object-cover opacity-20" alt="Skin background" />
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-6xl md:text-[8rem] font-serif text-[#5c3a21] mb-16 leading-none tracking-tighter">
                        Your Skin, <br /> <span className="italic font-light opacity-80 text-[#a5846e]">Redefined.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center">
                        <a href="https://wa.link/h5481r" target="_blank" className="bg-[#a5846e] text-white px-16 py-7 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-[#5c3a21] transition-all shadow-2xl hover:-translate-y-2">
                            Agenda tu cita ahora
                        </a>
                        <a href="tel:+573008883486" className="bg-white text-[#5c3a21] px-16 py-7 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-[#a5846e] hover:text-white transition-all shadow-xl hover:-translate-y-2 border border-[#f1e4dc]">
                            Llamar al estudio
                        </a>
                    </div>
                </div>
            </section>

            {/* --- Case Modal --- */}
            {activeCase && (
                <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6 animate-fadeIn" onClick={() => setActiveCase(null)}>
                    <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform">
                        <X size={40} />
                    </button>
                    <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <img src={activeCase.url} className="w-full h-auto rounded-[2rem] shadow-2xl border border-white/10" alt="Case detail" />
                        <div className="mt-8 text-center">
                            <p className="text-[#a5846e] font-black tracking-[0.3em] text-xs uppercase mb-2">Protocolo Clínico</p>
                            <h4 className="text-white text-4xl font-serif">{activeCase.title}</h4>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Montserrat:wght@100;400;700;900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }

        @keyframes reveal {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-reveal { animation: reveal 1s cubic-bezier(0.77, 0, 0.175, 1); }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>

        </div>
    );
}