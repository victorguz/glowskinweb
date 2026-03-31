'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Award, Zap, Leaf, MessageCircle } from 'lucide-react';

const BASE_IMG_URL = 'https://main.d1xrycrl1hw09l.amplifyapp.com/assets/images';

const ASSETS = {
  sofia: `${BASE_IMG_URL}/sofia/sofia-nieto-glow-skin-bq.png`,
  hero: [
    `${BASE_IMG_URL}/hero/1-glow-skin-hero-limpieza-facial.webp`,
    `${BASE_IMG_URL}/hero/2-glow-skin-hero-tratamiento-facial.webp`,
    `${BASE_IMG_URL}/hero/3-glow-skin-hero-servicios-esteticos.webp`,
  ],
  methods: [
    {
      title: 'Limpieza Facial GlowSkin',
      tag: 'Signature',
      desc: 'Una limpieza facial completa y profunda, con los mayores estándares de asepsia y cuidado a tu piel. Observa los cambios desde la primera sesión.',
      img: `${BASE_IMG_URL}/methods/1-limpieza-facial-glow-skin.jpg`,
    },
    {
      title: 'Método Anti-Acné',
      tag: 'Clinical',
      desc: 'Técnica avanzada de ácidos clínicos de última generación. Un tratamiento progresivo científicamente probado para tratar el acné leve a severo.',
      img: `${BASE_IMG_URL}/methods/1-metodo-anti-acne.webp`,
    },
    {
      title: 'Método Regenerativo',
      tag: 'Advanced',
      desc: 'Técnica de micropunciones de bioestimulación celular con Alta Nutrición que reconstruye los tejidos de la piel. Ideal para pieles con cicatrices leves.',
      img: `${BASE_IMG_URL}/methods/1-metodo-regenerativo.webp`,
    },
    {
      title: 'Tratamiento Anti-manchas',
      tag: 'Radiance',
      desc: 'Técnica avanzada que combina Peelings de última generación con activos despigmentantes para eliminar progresivamente las manchas.',
      img: `${BASE_IMG_URL}/methods/1-metodo-anti-manchas.webp`,
    },
  ],
};

const REVIEWS = [
  {
    name: 'Karla Ramírez',
    text: 'Glow Skin cambió mi relación con mi piel. Sofi no solo hace un trabajo impecable, sino que te educa sobre cómo cuidarte en casa. Mi acné finalmente está bajo control.',
    time: 'hace un mes',
  },
  {
    name: 'Edgar Arrieta',
    text: 'Desde la primera sesión de limpieza facial profunda los resultados fueron evidentes. Mi piel se siente ligera, limpia y con un brillo saludable que no tenía antes.',
    time: 'hace un mes',
  },
  {
    name: 'Samara Chartuni',
    text: 'La atención es excepcional. Es un espacio de paz donde sabes que estás en manos de una verdadera profesional. Recomiendo el método regenerativo al 100%.',
    time: 'hace 3 semanas',
  },
];

export default function HomePage() {
  const [currentHero, setCurrentHero] = useState(0);
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % ASSETS.hero.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] overflow-x-hidden selection:bg-[#d4b499] selection:text-white">
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {ASSETS.hero.map((img, idx) => (
            <img
              key={idx}
              src={img}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ${idx === currentHero ? 'opacity-100' : 'opacity-0'}`}
              alt="Hero"
            />
          ))}
          <div className="absolute inset-0 bg-[#f7f0eb]/60 z-10" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="flex flex-col items-center animate-reveal">
            <div className="w-24 h-px bg-[#d4b499] mb-8" />
            <h1 className="text-6xl md:text-[9.5rem] font-serif leading-none tracking-tighter text-[#4a3221]">
              Limpieza Facial
              <span className="block font-script text-5xl md:text-[10rem] text-[#4e3523] -mt-6 md:-mt-12">
                Glow Skin
              </span>
            </h1>
            <div className="w-24 h-px bg-[#d4b499] mt-8 mb-12" />
            <p className="text-lg md:text-2xl font-medium text-[#7d5a44] max-w-2xl leading-relaxed italic tracking-wide text-balance px-4">
              {'\u201C'}
              Recupera el Glow Natural de tu piel con nuestros tratamientos faciales en Barranquilla.
              {'\u201D'}
            </p>
            <a
              href="https://wa.link/h5481r"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 bg-[#4a3221] text-[#f7f0eb] px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-[#d4b499] transition-all shadow-2xl hover:-translate-y-1"
            >
              Reservar mi espacio
            </a>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-32">
            <span className="text-[#d4b499] font-black tracking-[0.4em] text-[10px] uppercase mb-4 block">
              Especialidades
            </span>
            <h2 className="text-5xl md:text-8xl font-serif text-[#4a3221] tracking-tighter">Métodos Propios</h2>
            <div className="w-20 h-px bg-[#d4b499] mx-auto mt-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {ASSETS.methods.map((t, idx) => (
              <div key={idx} className="group relative h-[600px] overflow-hidden rounded-[2.5rem] cursor-pointer shadow-2xl">
                <img src={t.img} alt={t.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a3221] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-8 left-8">
                  <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-[#f7f0eb] text-[9px] font-black uppercase tracking-widest rounded-full">
                    {t.tag}
                  </span>
                </div>

                <div className="absolute bottom-10 left-10 right-10 text-[#f7f0eb] transition-all transform group-hover:translate-y-[-10px]">
                  <h3 className="text-3xl font-serif mb-4 leading-tight">{t.title}</h3>
                  <p className="text-sm font-medium opacity-0 group-hover:opacity-80 transition-all duration-500 h-0 group-hover:h-auto overflow-hidden leading-relaxed mb-6">
                    {t.desc}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4b499]">
                    Saber más <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="filosofia" className="py-40 bg-[#f7f0eb] container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-[#d4b499]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] shadow-[0_40px_100px_rgba(74,50,33,0.15)] group">
              <img src={ASSETS.sofia} alt="Sofía Nieto" className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#4a3221] p-10 rounded-[3rem] shadow-2xl text-[#f7f0eb] hidden xl:block">
              <p className="text-4xl font-serif mb-2 leading-none tracking-tighter">Sofía Nieto</p>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">CEO & Founder</p>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <h2 className="text-5xl md:text-7xl font-serif text-[#4a3221] mb-10 leading-none">
              Sobre Glow Skin
            </h2>
            <div className="space-y-6 text-xl text-[#7d5a44] leading-relaxed mb-12 font-medium opacity-90">
              <p>
                Glow Skin es un espacio creado para cuidar, sanar y transformar. Aquí no solo buscamos la piel, también restauramos la confianza y el bienestar de cada uno de nuestros pacientes.
              </p>
              <p>
                Mi nombre es Sofía Nieto, especialista en Cosmetología y Cosmiatría, y estoy comprometida con un servicio basado en el cuidado, el conocimiento y el profesionalismo.
              </p>
              <p className="italic text-[#4a3221]">
                "En Glow Skin, cada tratamiento es personalizado y pensado para ayudarte a alcanzar la mejor versión de ti."
              </p>
            </div>

            <div className="space-y-10">
              {[
                { icon: Award, title: 'Certificación', text: 'Especialista en Cosmetología y Cosmiatría.' },
                { icon: Zap, title: 'Resultados', text: 'Transformaciones visibles desde la primera sesión.' },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className="text-[#d4b499]" strokeWidth={1.5} />
                      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4a3221]">{item.title}</h3>
                    </div>
                    <div className="flex-grow border-b border-[#d4b499]/20" />
                  </div>
                  <p className="text-sm text-[#7d5a44] font-medium pl-9 opacity-80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonios" className="py-32 bg-white overflow-hidden border-y border-[#d4b499]/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col items-center text-center">
            <MessageCircle size={48} className="text-[#d4b499] mb-8 opacity-30" aria-hidden />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#d4b499] mb-4">Reseñas</p>
            <h2 className="text-4xl md:text-6xl font-serif text-[#4a3221] tracking-tighter mb-4">Lo que ellas dicen</h2>
            <div className="w-20 h-px bg-[#d4b499]/50 mx-auto mb-12" />

            <div className="relative max-w-4xl mx-auto min-h-[260px] sm:min-h-[300px] md:min-h-[340px] w-full flex items-center justify-center">
              {REVIEWS.map((review, i) => (
                <div
                  key={i}
                  className={`transition-all duration-1000 flex flex-col items-center px-2 w-full ${
                    i === activeReview ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <p className="text-xl sm:text-2xl md:text-4xl lg:text-[2.75rem] font-serif text-[#4a3221] leading-snug md:leading-tight mb-10 italic text-balance max-w-3xl">
                    {'\u201C'}
                    {review.text}
                    {'\u201D'}
                  </p>
                  <div>
                    <p className="font-black uppercase tracking-[0.2em] text-xs text-[#d4b499] mb-1">{review.name}</p>
                    <p className="text-sm text-[#7d5a44]/60 font-medium">{review.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-14" role="tablist" aria-label="Seleccionar testimonio">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === activeReview}
                  aria-label={`Testimonio ${i + 1} de ${REVIEWS.length}`}
                  onClick={() => setActiveReview(i)}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    i === activeReview ? 'bg-[#4a3221] w-12' : 'bg-[#d4b499]/40 w-4 hover:bg-[#d4b499]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-48 bg-[#4a3221] text-[#f7f0eb] overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <Sparkles size={40} className="mx-auto mb-10 text-[#d4b499] opacity-50" />
          <h2 className="text-5xl md:text-8xl font-serif mb-12 leading-[1.1] tracking-tighter max-w-5xl mx-auto">
            ¿Qué esperas para <br /> <span className="italic font-light opacity-90 text-[#d4b499]">devolverle el Glow a tu Piel?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a
              href="https://wa.link/h5481r"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f7f0eb] text-[#4a3221] px-16 py-7 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-[#d4b499] transition-all shadow-2xl"
            >
              Agendar ahora
            </a>
            <Link
              href="/casos"
              className="text-[#f7f0eb] border-b-2 border-white/20 pb-1 hover:border-[#d4b499] transition-all font-black text-xs uppercase tracking-[0.3em]"
            >
              Ver resultados reales
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
        @keyframes reveal { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-reveal { animation: reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1); }
      `}</style>
    </div>
  );
}
