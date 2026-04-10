import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown,
  Search,
  MessageCircle, 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  Clock, 
  Sparkles,
  ArrowRight,
  Calendar,
  User,
  ArrowUpRight
} from 'lucide-react';

// --- Assets ---
const BASE_IMG_URL = "https://main.d1xrycrl1hw09l.amplifyapp.com/assets/images";

const ASSETS = {
  logo: `${BASE_IMG_URL}/logo/glow-skin-logo.png`,
  blogHero: `${BASE_IMG_URL}/hero/3-glow-skin-hero-servicios-esteticos.webp`,
  posts: [
    {
      id: 1,
      category: "Skin Care",
      title: "La ciencia detrás de una piel radiante",
      excerpt: "Descubre por qué la limpieza profunda es el primer paso indispensable para cualquier tratamiento de rejuvenecimiento.",
      date: "12 Abr, 2026",
      img: `${BASE_IMG_URL}/hero/1-glow-skin-hero-limpieza-facial.webp`,
      readTime: "5 min"
    },
    {
      id: 2,
      category: "Tratamientos",
      title: "¿Qué son los Exosomas y cómo ayudan?",
      excerpt: "Exploramos la última tecnología en regeneración celular que está transformando la estética facial en Barranquilla.",
      date: "08 Abr, 2026",
      img: `${BASE_IMG_URL}/methods/1-metodo-regenerativo.webp`,
      readTime: "7 min"
    },
    {
      id: 3,
      category: "Consejos",
      title: "Rutina post-acné: Guía definitiva",
      excerpt: "Cómo cuidar tu piel después de un tratamiento intensivo para mantener los resultados y evitar secuelas.",
      date: "05 Abr, 2026",
      img: `${BASE_IMG_URL}/cases/caso-2-tratamiento-anti-acne.webp`,
      readTime: "4 min"
    }
  ]
};

const CATEGORIES = ["Todos", "Skin Care", "Ciencia", "Tratamientos", "Lifestyle"];

export default function GlowSkinBlog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] overflow-x-hidden selection:bg-[#d4b499] selection:text-white">
      
      {/* --- Navegación --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-[#f7f0eb]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          <a href="/" className="h-10 transition-transform hover:scale-105">
            <img src={ASSETS.logo} alt="Glow Skin" className="h-full w-auto" />
          </a>
          <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-[#7d5a44]">
            <a href="/" className="hover:text-[#4a3221] transition-all">Inicio</a>
            <a href="/precios" className="hover:text-[#4a3221] transition-all">Precios</a>
            <a href="#" className="text-[#4a3221] border-b border-[#d4b499]">Blog</a>
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
          {['Inicio', 'Servicios', 'Blog'].map((item, i) => (
            <a key={i} href="#" onClick={() => setIsMenuOpen(false)} className="text-[#4a3221] text-5xl font-serif">{item}</a>
          ))}
          <a href="https://wa.link/h5481r" className="mt-8 text-white bg-[#4a3221] px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm shadow-xl">Contacto</a>
        </div>
      </div>

      {/* --- Header Blog: Estilo Autor --- */}
      <header className="pt-52 pb-32 text-center">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-24 h-px bg-[#d4b499] mb-8"></div>
            <h1 className="text-6xl md:text-[9rem] font-serif leading-none tracking-tighter text-[#4a3221]">
              Blog
              <span className="block font-script text-5xl md:text-9xl text-[#d4b499] -mt-4 md:-mt-10 lowercase">Glow Skin</span>
            </h1>
            <div className="w-24 h-px bg-[#d4b499] mt-8 mb-12"></div>
            <p className="text-lg md:text-xl font-medium text-[#7d5a44] max-w-2xl leading-relaxed italic tracking-wide text-balance px-4">
              "Espacio dedicado a la ciencia, el bienestar y los secretos para una piel saludable."
            </p>
          </div>
        </div>
      </header>

      {/* --- Categories Filter: Estilo Menú GS --- */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 border-y border-[#d4b499]/20 py-8">
            {CATEGORIES.map((cat, i) => (
              <button 
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:text-[#4a3221] ${activeCategory === cat ? 'text-[#4a3221] border-b border-[#4a3221]' : 'text-[#a5846e]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- Main Post Grid --- */}
      <section className="pb-56 container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
          {ASSETS.posts.map((post, idx) => (
            <article key={post.id} className="group cursor-pointer flex flex-col">
              {/* Imagen sin bordes con sombra profunda */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-10 shadow-[0_30px_80px_rgba(74,50,33,0.12)]">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute top-6 left-6">
                   <span className="bg-[#4a3221] text-[#f7f0eb] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{post.category}</span>
                </div>
              </div>

              {/* Contenido Blog */}
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-end gap-4 mb-6">
                   <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#a5846e]">
                      <Calendar size={14} /> {post.date}
                   </div>
                   <div className="flex-grow border-b border-[#d4b499]/20 mb-1.5 border-dotted"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#a5846e]">{post.readTime} lectura</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-serif text-[#4a3221] mb-6 leading-tight tracking-tight group-hover:text-[#d4b499] transition-colors uppercase">
                  {post.title}
                </h2>
                
                <p className="text-[#7d5a44] text-lg font-medium leading-relaxed mb-10 opacity-80 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6 border-t border-[#4a3221]/5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#4a3221] hover:text-[#d4b499] transition-all group-hover:translate-x-2">
                  Leer artículo <ArrowRight size={16} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- Newsletter: Estilo Menú GS --- */}
      <section className="py-40 bg-[#4a3221] text-[#f7f0eb] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <Sparkles size={40} className="mx-auto mb-10 text-[#d4b499]" />
            <h2 className="text-4xl md:text-7xl font-serif mb-8 tracking-tighter uppercase leading-none">Únete a la <br/> <span className="font-script text-[#d4b499] lowercase">Comunidad Glow</span></h2>
            <p className="text-lg text-[#f7f0eb]/60 mb-12 leading-relaxed">
              Recibe consejos exclusivos de Sofía Nieto y sé la primera en enterarte de nuevos protocolos y lanzamientos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="TU EMAIL" 
                className="flex-grow bg-white/5 border border-white/20 rounded-full px-8 py-5 text-xs font-black uppercase tracking-widest focus:outline-none focus:border-[#d4b499] transition-all"
              />
              <button className="bg-[#d4b499] text-[#4a3221] px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#f7f0eb] transition-all shadow-2xl">
                Suscribirme
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#f7f0eb] pt-32 pb-16 text-[#4a3221]">
        <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-20 text-center border-t border-[#4a3221]/10 pt-20">
           <div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d4b499] mb-4">Ubicación</p>
              <p className="text-sm font-bold opacity-70 leading-relaxed uppercase">Carrera 50# 74-120 <br/> Barranquilla</p>
           </div>
           <div className="flex flex-col items-center">
              <img src={ASSETS.logo} className="h-8 opacity-90 mb-8" alt="Logo" />
              <div className="flex gap-10 opacity-30">
                <Instagram size={20} />
                <Facebook size={20} />
              </div>
           </div>
           <div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d4b499] mb-4">Consultas</p>
              <p className="text-sm font-bold opacity-70 uppercase">+57 300 888 3486</p>
           </div>
        </div>
        <p className="mt-32 text-center text-[9px] font-black tracking-[0.6em] text-[#d4b499] opacity-40 uppercase">© 2026 MOMENTO GLOW SKIN. Blog DIVISION.</p>
      </footer>

      {/* --- Floating WhatsApp --- */}
      <a href="https://wa.link/h5481r" target="_blank" className="fixed bottom-10 right-10 z-[90] bg-[#25d366] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={32} />
      </a>

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