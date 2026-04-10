'use client';

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronLeft,
  MessageCircle, 
  Camera, 
  Share2, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles,
  ArrowRight,
  Calendar,
  Bookmark,
  Quote
} from 'lucide-react';

// --- Assets ---
const BASE_IMG_URL = "https://main.d1xrycrl1hw09l.amplifyapp.com/assets/images";

const ASSETS = {
  logo: `${BASE_IMG_URL}/logo/glow-skin-logo.png`,
  mainImg: `${BASE_IMG_URL}/hero/1-glow-skin-hero-limpieza-facial.webp`,
  secondaryImg: `${BASE_IMG_URL}/methods/1-limpieza-facial-glow-skin.jpg`,
  authorImg: `${BASE_IMG_URL}/sofia/sofia-nieto-glow-skin-bq.png`,
};

export default function GlowSkinPost() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] selection:bg-[#d4b499] selection:text-white">
      
      {/* --- Navegación --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-[#f7f0eb]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="/blog" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#d4b499] transition-colors">
            <ChevronLeft size={16} /> Volver al Blog
          </a>
          <img src={ASSETS.logo} alt="Glow Skin" className="h-8 lg:h-10" />
          <div className="flex gap-6">
            <Share2 size={18} className="cursor-pointer hover:text-[#d4b499] transition-colors" />
            <Bookmark size={18} className="cursor-pointer hover:text-[#d4b499] transition-colors" />
          </div>
        </div>
      </nav>

      {/* --- Article Header: Estilo Autor --- */}
      <header className="pt-44 pb-20 text-center container mx-auto px-6">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <div className="w-16 h-px bg-[#d4b499] mb-8"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#a5846e] mb-6">Skin Care & Bienestar</span>
          <h1 className="text-5xl md:text-[7rem] font-serif leading-[0.9] tracking-tighter text-[#4a3221] mb-8">
            EL IMPACTO DE <br />
            <span className="block font-script text-4xl md:text-8xl text-[#d4b499] -mt-2 md:-mt-6 lowercase">un facial profesional</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#7d5a44] italic leading-relaxed text-balance">
            "No sabes que necesitas un facial hasta que te muestro tu Antes y Después."
          </p>
          <div className="mt-12 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#a5846e]">
             <Calendar size={14} /> 10 Abril, 2026
             <span className="w-1 h-1 rounded-full bg-[#d4b499]"></span>
             <span>6 min lectura</span>
          </div>
        </div>
      </header>

      {/* --- Featured Image: Borderless & Wide --- */}
      <section className="container mx-auto px-6 lg:px-12 mb-24">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_rgba(74,50,33,0.12)]">
          <img src={ASSETS.mainImg} className="w-full h-full object-cover" alt="Tratamiento Facial" />
        </div>
      </section>

      {/* --- Main Content: Formato Editorial --- */}
      <main className="container mx-auto px-6 max-w-3xl pb-40">
        <div className="space-y-12 text-lg md:text-xl text-[#4a3221] leading-[1.8] font-medium opacity-90">
          <p className="first-letter:text-7xl first-letter:font-serif first-letter:text-[#d4b499] first-letter:mr-3 first-letter:float-left">
            La piel es mucho más que nuestra carta de presentación; es un órgano vivo que refleja nuestro estado de salud y bienestar emocional. En Glow Skin, hemos documentado cómo una limpieza facial profunda puede marcar el inicio de una transformación radical, no solo en la textura del cutis, sino en la autoestima de nuestras pacientes.
          </p>
          
          <h2 className="text-4xl font-serif text-[#4a3221] pt-8 tracking-tight">Más allá de la superficie</h2>
          
          <p>
            Muchos pacientes llegan al estudio con una preocupación común: poros obstruidos y una piel que luce opaca a pesar de seguir rutinas estrictas en casa. La realidad es que la polución ambiental y el estrés oxidativo generan capas de impurezas que los productos convencionales no logran retirar.
          </p>

          {/* Cita Estilo Menú GS */}
          <div className="py-16 relative">
            <div className="absolute top-0 left-0 w-20 h-px bg-[#d4b499]/40"></div>
            <Quote size={60} className="text-[#d4b499]/10 absolute -top-4 -left-8" />
            <p className="text-3xl md:text-5xl font-serif italic text-[#4a3221] leading-tight mb-6">
              "Resultados reales que transforman la vida de nuestras pacientes desde la primera sesión."
            </p>
            <div className="flex items-center gap-4">
               <div className="w-10 h-px bg-[#4a3221]/20"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a5846e]">Sofía Nieto, Directora GS</span>
            </div>
          </div>

          <p>
            Nuestro protocolo insignia combina la precisión de la extracción manual aséptica con tecnología de vanguardia. Como se observa en nuestros casos de éxito, la clave está en el diagnóstico. No aplicamos la misma técnica a una piel con acné inflamatorio que a una con signos de fatiga oxidativa.
          </p>

          {/* Imagen Secundaria Integrada */}
          <div className="py-12">
            <img src={ASSETS.secondaryImg} className="w-full h-auto rounded-3xl shadow-2xl mb-6" alt="Detalle clínico" />
            <p className="text-sm italic text-[#7d5a44] text-center font-serif tracking-wide opacity-70">
              Imagen I: Proceso de oxigenación y refinamiento de poros mediante protocolo Signature.
            </p>
          </div>

          <h2 className="text-4xl font-serif text-[#4a3221] pt-8 tracking-tight">El método científico</h2>
          
          <p>
            En el PDF de nuestros casos reales, el Caso IV ilustra perfectamente este punto: una piel congestionada que, tras una descarga completa de impurezas, recupera su "glow" natural. La ciencia estética nos permite hoy ir un paso más allá, integrando activos que calman e hidratan mientras limpian.
          </p>

          <div className="bg-white p-10 rounded-[2.5rem] border border-[#d4b499]/20 shadow-sm mt-12">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-6">Conclusión Clínica</h4>
             <p className="text-lg italic font-serif">
                "La constancia es el ingrediente secreto. Un facial profesional cada 28 días respeta el ciclo de renovación natural de la piel, garantizando resultados que perduran en el tiempo."
             </p>
          </div>
        </div>

        {/* --- Author Bio: Estilo Heritage --- */}
        <section className="mt-32 pt-20 border-t border-[#4a3221]/10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 shrink-0 overflow-hidden rounded-full shadow-lg border-2 border-white">
            <img src={ASSETS.authorImg} className="w-full h-full object-cover" alt="Sofía Nieto" />
          </div>
          <div className="text-center md:text-left">
            <h5 className="font-serif text-2xl text-[#4a3221] mb-2 uppercase tracking-tighter">Sofía Nieto</h5>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-4">Especialista en Cosmiatría Avanzada</p>
            <p className="text-sm text-[#7d5a44] max-w-md font-medium leading-relaxed opacity-80">
              Dedicada a la restauración de la armonía facial mediante protocolos basados en evidencia científica y un cuidado artesanal.
            </p>
          </div>
        </section>
      </main>

      {/* --- Footer Editorial --- */}
      <footer className="bg-[#4a3221] text-[#f7f0eb] pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto mb-24">
             <div className="w-16 h-[1px] bg-[#d4b499] mx-auto mb-10"></div>
             <h4 className="text-5xl font-serif mb-8 tracking-tighter uppercase leading-none">Únete a la <br/> Comunidad Glow</h4>
             <p className="font-script text-4xl text-[#d4b499] mb-12 italic">Recibe secretos exclusivos</p>
             
             <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="TU MEJOR EMAIL" 
                  className="flex-grow bg-white/5 border border-white/20 rounded-full px-8 py-5 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-[#d4b499] transition-all"
                />
                <button className="bg-[#f7f0eb] text-[#4a3221] px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#d4b499] transition-all shadow-xl">
                  Suscribirme
                </button>
             </div>
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <img src={ASSETS.logo} className="h-6 opacity-40 invert grayscale" alt="Logo" />
             <p className="text-[9px] font-black tracking-[0.5em] text-[#d4b499] opacity-30 uppercase">© 2026 MOMENTO GLOW SKIN. EDITORIAL DIVISION.</p>
             <div className="flex gap-6 opacity-30">
                <Camera size={18} />
                <Share2 size={18} />
             </div>
          </div>
        </div>
      </footer>

      {/* --- Floating WhatsApp --- */}
      <a href="https://wa.link/h5481r" target="_blank" className="fixed bottom-10 right-10 z-[90] bg-[#25d366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={32} />
      </a>

      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
        
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}</style>

    </div>
  );
}