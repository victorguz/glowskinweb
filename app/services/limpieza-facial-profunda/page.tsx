import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Droplets,
  Target,
  CheckCircle2,
  Plus,
  Minus,
  User,
  Award,
  Calendar
} from 'lucide-react';

// --- Assets ---
const BASE_IMG_URL = "https://main.d1xrycrl1hw09l.amplifyapp.com/assets/images";

const ASSETS = {
  logo: `${BASE_IMG_URL}/logo/glow-skin-logo.png`,
  hero: `${BASE_IMG_URL}/hero/1-glow-skin-hero-limpieza-facial.webp`,
  processImg: `${BASE_IMG_URL}/methods/1-limpieza-facial-glow-skin.jpg`,
};

const FAQ_DATA = [
  {
    q: "¿Con qué frecuencia debo hacerme una limpieza facial?",
    a: "Se recomienda una limpieza facial cada 30-45 días para mantenimiento general. Para pieles con problemas específicos como acné, la frecuencia puede ser cada 21 días."
  },
  {
    q: "¿Es normal que mi piel se vea roja después del tratamiento?",
    a: "Es completamente normal experimentar un ligero enrojecimiento que desaparece en 2-4 horas. Esto indica que el tratamiento está activando la circulación sanguínea."
  },
  {
    q: "¿Puedo usar maquillaje después de la limpieza facial?",
    a: "Recomendamos esperar al menos 4-6 horas antes de aplicar maquillaje para permitir que la piel absorba completamente los productos aplicados."
  },
  {
    q: "¿Qué cuidados debo tener después del tratamiento?",
    a: "Evita la exposición solar directa por 24 horas, usa protector solar, mantén la piel hidratada y evita productos con alcohol o ácidos fuertes por 48 horas."
  }
];

export default function FacialServicePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] overflow-x-hidden selection:bg-[#d4b499] selection:text-white">
      
      {/* --- Navegación --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-white/90 backdrop-blur-xl py-3 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="/" className="h-10 transition-transform hover:scale-105">
            <img src={ASSETS.logo} alt="Glow Skin" className="h-full w-auto" />
          </a>
          <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-[#7d5a44]">
            <a href="/" className="hover:text-[#4a3221] transition-all">Inicio</a>
            <a href="/precios" className="hover:text-[#4a3221] transition-all">Precios</a>
            <a href="/casos-reales" className="hover:text-[#4a3221] transition-all">Resultados</a>
          </div>
          <button className="p-2 text-[#4a3221]" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* --- Menú Móvil --- */}
      <div className={`fixed inset-0 bg-[#f7f0eb] z-[100] transition-transform duration-700 flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center border-b border-[#d4b499]/20">
          <img src={ASSETS.logo} className="h-8" alt="Logo" />
          <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-[#4a3221] text-[#f7f0eb] rounded-full"><X size={24} /></button>
        </div>
        <div className="flex-grow flex flex-col justify-center px-12 gap-8 text-center">
          {['Inicio', 'Servicios', 'Resultados', 'Blog'].map((item, i) => (
            <a key={i} href="#" onClick={() => setIsMenuOpen(false)} className="text-[#4a3221] text-5xl font-serif">{item}</a>
          ))}
          <a href="https://wa.link/h5481r" className="mt-8 text-white bg-[#4a3221] px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">Escríbenos</a>
        </div>
      </div>

      {/* --- Hero Section --- */}
      <section className="pt-52 pb-40 relative flex items-center justify-center text-center">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center animate-reveal">
            <div className="w-24 h-px bg-[#d4b499] mb-8"></div>
            <h1 className="text-5xl md:text-[8.5rem] font-serif leading-none tracking-tight text-[#4a3221]">
              LIMPIEZA
              <span className="block font-script text-4xl md:text-9xl text-[#d4b499] -mt-2 md:-mt-8 lowercase">Facial Profunda</span>
            </h1>
            <div className="w-24 h-px bg-[#d4b499] mt-8 mb-12"></div>
            <p className="text-lg md:text-2xl font-medium text-[#7d5a44] max-w-2xl leading-relaxed italic tracking-wide text-balance px-4">
              "Purifica, equilibra y revitaliza tu piel con nuestros protocolos avanzados de higiene facial."
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mt-16">
              <a href="https://wa.link/h5481r" className="bg-[#4a3221] text-[#f7f0eb] px-12 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#d4b499] transition-all shadow-xl">
                Agendar mi cita
              </a>
              <a href="#detalles" className="border border-[#4a3221]/20 px-12 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all">
                Ver detalles
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Propuesta de Valor --- */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center mb-24 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-6xl font-serif text-[#4a3221] mb-6">¿Por qué elegirnos?</h2>
             <p className="text-[#7d5a44] font-medium opacity-70">Utilizamos tecnología avanzada y productos de alta gama para ofrecerte resultados excepcionales.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Zap, title: "Tecnología Avanzada", text: "Vapor ozono, espátula ultrasónica y alta frecuencia para resultados superiores." },
              { icon: User, title: "Personalizado", text: "Cada tratamiento se adapta a las necesidades específicas de tu tipo de piel." },
              { icon: Award, title: "Resultados Reales", text: "Más de 5 años de experiencia respaldando cada tratamiento facial." }
            ].map((benefit, i) => (
              <div key={i} className="group">
                <div className="flex justify-between items-end gap-4 mb-6">
                   <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#4a3221]">{benefit.title}</h4>
                   <div className="flex-grow border-b border-[#d4b499]/30 mb-1.5 border-dotted"></div>
                   <benefit.icon size={20} className="text-[#d4b499]" strokeWidth={1} />
                </div>
                <p className="text-sm font-medium text-[#7d5a44] leading-relaxed pr-8">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- El Protocolo Insignia --- */}
      <section id="detalles" className="py-32 container mx-auto px-6 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-[0_40px_100px_rgba(74,50,33,0.1)]">
               <img src={ASSETS.processImg} alt="Protocolo Glow Skin" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#4a3221] text-[#f7f0eb] p-12 rounded-[3rem] shadow-2xl hidden xl:block">
               <p className="font-script text-5xl text-[#d4b499] mb-2 lowercase">Signature</p>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Protocolo de Autor</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="mb-10">
               <h2 className="text-4xl md:text-6xl font-serif text-[#4a3221] tracking-tighter mb-4 uppercase">Limpieza Facial <br/> Glow Skin</h2>
               <div className="flex items-center gap-6">
                  <span className="text-3xl font-serif text-[#d4b499] italic">$ 125.000</span>
                  <div className="h-[1px] flex-grow bg-[#d4b499]/30"></div>
               </div>
            </div>
            
            <p className="text-lg text-[#4a3221] font-medium leading-relaxed mb-12 opacity-80">
              Nuestro protocolo insignia. Una higiene facial profunda que combina tecnología y activos de alta gama para purificar, equilibrar y revitalizar todo tipo de piel.
            </p>

            <div className="space-y-8 mb-12">
               <div className="border-t border-[#4a3221]/10 pt-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499] mb-4">Detalles del Servicio</p>
                  <ul className="space-y-4">
                     {[
                       { label: "Frecuencia", val: "1 sesión cada 30-45 días" },
                       { label: "Ideal para", val: "Mantenimiento, pieles congestionadas" },
                       { label: "Duración", val: "60-90 minutos aproximadamente" }
                     ].map((item, i) => (
                       <li key={i} className="flex justify-between items-baseline gap-4">
                          <span className="text-xs font-black uppercase tracking-widest text-[#7d5a44]">{item.label}</span>
                          <div className="flex-grow border-b border-[#d4b499]/20 mb-1 border-dotted"></div>
                          <span className="text-sm font-bold text-[#4a3221]">{item.val}</span>
                       </li>
                     ))}
                  </ul>
               </div>

               <div className="bg-white/50 p-10 rounded-[2.5rem] border border-[#d4b499]/20">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4a3221] mb-6">¿Qué incluye?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {["Consulta y diagnóstico", "Limpieza profunda", "Mascarilla personalizada", "Protección solar", "Recomendaciones post"].map((t, i) => (
                       <div key={i} className="flex items-center gap-3 text-sm font-bold text-[#7d5a44]">
                          <CheckCircle2 size={14} className="text-[#d4b499]" /> {t}
                       </div>
                     ))}
                  </div>
               </div>
            </div>

            <a href="https://wa.link/h5481r" target="_blank" className="inline-flex items-center gap-4 bg-[#4a3221] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#d4b499] transition-all group">
               Reservar tratamiento <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* --- El Proceso Paso a Paso --- */}
      <section className="py-40 bg-[#4a3221] text-[#f7f0eb] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="text-center mb-32">
             <span className="text-[#d4b499] font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">Metodología</span>
             <h2 className="text-4xl md:text-7xl font-serif tracking-tighter uppercase leading-none">Nuestro Proceso</h2>
             <p className="font-script text-3xl md:text-5xl text-[#d4b499] mt-2 italic lowercase opacity-80">paso a paso</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
            {[
              { id: "01", title: "Diagnóstico Inicial", desc: "Evaluamos tu tipo de piel y necesidades específicas para personalizar el tratamiento." },
              { id: "02", title: "Limpieza Profunda", desc: "Utilizamos vapor ozono y espátula ultrasónica para una purificación completa." },
              { id: "03", title: "Extracción", desc: "Removemos impurezas y puntos negros de forma segura y efectiva." },
              { id: "04", title: "Alta Frecuencia", desc: "Aplicamos alta frecuencia para oxigenar y sellamos con productos nutritivos." }
            ].map((step, i) => (
              <div key={i} className="relative pt-12 border-t border-white/10 group hover:border-[#d4b499] transition-colors">
                <span className="absolute -top-6 left-0 text-5xl font-serif text-[#d4b499] opacity-30 italic">{step.id}</span>
                <h4 className="text-xl font-serif uppercase tracking-tight mb-4 group-hover:text-[#d4b499] transition-colors">{step.title}</h4>
                <p className="text-sm font-medium opacity-60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 lg:px-24 max-w-4xl">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-serif text-[#4a3221] tracking-tighter uppercase mb-4">Preguntas Frecuentes</h2>
             <div className="w-16 h-px bg-[#d4b499] mx-auto"></div>
          </div>

          <div className="space-y-0">
             {FAQ_DATA.map((faq, i) => (
               <div key={i} className="border-b border-[#4a3221]/10">
                 <button 
                   onClick={() => setOpenFaq(openFaq === i ? null : i)}
                   className="w-full py-10 flex justify-between items-center text-left group"
                 >
                   <h5 className={`text-xl font-serif transition-colors ${openFaq === i ? 'text-[#d4b499] italic' : 'text-[#4a3221]'}`}>
                     {faq.q}
                   </h5>
                   <div className="shrink-0 ml-4">
                     {openFaq === i ? <Minus size={20} className="text-[#d4b499]" /> : <Plus size={20} className="opacity-30 group-hover:opacity-100 transition-opacity" />}
                   </div>
                 </button>
                 <div className={`overflow-hidden transition-all duration-700 ${openFaq === i ? 'max-h-[300px] pb-10' : 'max-h-0'}`}>
                    <p className="text-[#7d5a44] font-medium leading-relaxed text-lg max-w-2xl">{faq.a}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section className="relative py-48 bg-[#f7f0eb] text-center overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-[9rem] font-serif text-[#4a3221] leading-none mb-16 tracking-tighter">
             Transforma <br/> <span className="italic font-light text-[#d4b499] lowercase font-script">tu piel hoy.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a href="https://wa.link/h5481r" target="_blank" className="bg-[#4a3221] text-[#f7f0eb] px-16 py-7 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-[#d4b499] transition-all shadow-2xl">
               <MessageCircle size={18} className="inline mr-2" /> WhatsApp Directo
            </a>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#4a3221] text-[#f7f0eb] pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-20 text-center border-t border-white/5 pt-20">
           <div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d4b499] mb-4">Dirección</p>
              <p className="text-sm font-bold opacity-60 text-balance px-4">Carrera 50# 74-120 <br/> Barranquilla, Colombia</p>
           </div>
           <div className="flex flex-col items-center">
              <img src={ASSETS.logo} className="h-8 opacity-90 mb-10" alt="Logo" />
              <div className="flex gap-10 opacity-30">
                <Instagram size={20} />
                <Facebook size={20} />
              </div>
           </div>
           <div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d4b499] mb-4">Atención</p>
              <p className="text-sm font-bold opacity-60">+57 300 888 3486 <br/> Lun - Sáb: 9:00 - 18:00</p>
           </div>
        </div>
      </footer>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
        
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }

        @keyframes reveal { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-reveal { animation: reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1); }
      `}</style>

    </div>
  );
}