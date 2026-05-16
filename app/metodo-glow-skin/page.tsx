"use client";

import { useState, useEffect } from "react";
import { VslVideoPlayer } from "@/app/components/marketing/VslVideoPlayer";
import { InstagramEmbed } from "@/app/components/marketing/InstagramEmbed";
import {
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Quote,
  AlertCircle,
  Calendar,
  Star,
  Shield,
  Clock,
} from "lucide-react";
import { BookingCtaButtons } from "@/app/components/marketing/BookingCtaButtons";

const CDN = "https://main.dlloltrpvu8dp.amplifyapp.com/assets";

const IMGS = {
  logo: `${CDN}/images/logo/glow-skin-logo.png`,
  heroMethod: `${CDN}/images/methods/1-metodo-anti-acne.webp`,
  method1: `${CDN}/metodo-glow-skin/extraccion-manual-cuidadosa.png`,
  method2: `${CDN}/metodo-glow-skin/mascarilla-descongestiva.png`,
  method3: `${CDN}/metodo-glow-skin/microneedling-de-perfil.PNG`,
  caseMain1: `${CDN}/images/cases/caso-2-tratamiento-anti-acne.webp`,
  caseMain2: `${CDN}/images/cases/caso-4-tratamiento-anti-acne.webp`,
  caseMain3: `${CDN}/images/cases/caso-5-tratamiento-anti-acne-2.webp`,
  proceso1: `${CDN}/landings/anti-acne/proceso-paso-a-paso/proceso-anti-acne-antes-despues-1.jpg`,
  proceso2: `${CDN}/landings/anti-acne/proceso-paso-a-paso/proceso-anti-acne-antes-despues-2.jpg`,
  proceso3: `${CDN}/landings/anti-acne/proceso-paso-a-paso/proceso-anti-acne-antes-despues-3.jpg`,
  proceso4: `${CDN}/landings/anti-acne/proceso-paso-a-paso/proceso-anti-acne-antes-despues-4.jpg`,
  carla1: `${CDN}/landings/anti-acne/caso-real-carla/caso-carla-acne-1.jpg`,
  carla2: `${CDN}/landings/anti-acne/caso-real-carla/caso-carla-acne-2.jpg`,
  carla3: `${CDN}/landings/anti-acne/caso-real-carla/caso-carla-acne-3.jpg`,
  valeBefore: `${CDN}/landings/anti-acne/caso-real-valentina/caso-valentina-acne-1.jpg`,
  valeAfter: `${CDN}/landings/anti-acne/caso-real-valentina/caso-valentina-acne-4.jpg`,
  vale2: `${CDN}/landings/anti-acne/caso-real-valentina/caso-valentina-acne-2.jpg`,
  vale3: `${CDN}/landings/anti-acne/caso-real-valentina/caso-valentina-acne-3.jpg`,
  resultado1: `${CDN}/landings/anti-acne/tratamiento-salud-piel/tratamiento-anti-acne-resultado-1.jpg`,
  resultado2: `${CDN}/landings/anti-acne/tratamiento-salud-piel/tratamiento-anti-acne-resultado-2.jpg`,
  gallery1: `${CDN}/images/gallery/glow-skin-gallery-antes-despues-1.webp`,
  gallery2: `${CDN}/images/gallery/glow-skin-gallery-antes-despues-2.webp`,
};

const HERO_VSL = {
  videoUrl: "https://www.youtube.com/shorts/-RD-tayxRbM",
  title: "Método Glow Skin",
  subtitle: "VSL Anti-Acné",
  progressPercent: 94,
  progressLabel: "48:37",
  durationLabel: "51:09",
};

export default function GlowSkinMethodVSL() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] overflow-x-hidden selection:bg-[#d4b499] selection:text-white leading-relaxed">
      {/* NAV */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 ${isScrolled ? "bg-white/95 py-4 shadow-sm" : "bg-transparent py-8"}`}
      >
        <div className="flex justify-between items-center max-w-md mx-auto">
          <img src={IMGS.logo} className="h-8" alt="Glow Skin" />
          <BookingCtaButtons
            className="flex items-center gap-2"
            reserveHereClassName="bg-[#4a3221] text-[#f7f0eb] px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg"
            reserveWhatsappClassName="border border-[#4a3221]/25 bg-white text-[#4a3221] px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg"
          />
        </div>
      </nav>

      {/* SECTION 1: HERO / PAIN */}
      <section className="pt-40 pb-20 px-6">
        <div className="flex flex-col items-center max-w-md mx-auto text-center animate-reveal">
          <h1 className="text-[10vw] font-serif leading-[0.88] mb-6 tracking-tighter text-[#4a3221]">
            ¿Te cansaste
            <span className="block font-script text-[14vw] text-[#d4b499] -mt-1 lowercase italic">
              de luchar
            </span>
            con el acné?
          </h1>

          <p className="text-base text-[#7d5a44] font-medium leading-relaxed mb-8 max-w-xs">
            Cremas, pastillas, remedios caseros… y el acné sigue ahí,{" "}
            <strong className="text-[#4a3221]">
              cada mañana, mirándote en el espejo.
            </strong>{" "}
            El problema no eres tú. Es que nadie te ha dado un plan real.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#d4b499]/20 border border-[#d4b499]/40 rounded-full px-5 py-2 mb-8">
            <Sparkles size={12} className="text-[#d4b499]" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#7d5a44]">
              Conoce el método Glow Skin
            </span>
          </div>

          <VslVideoPlayer
            videoUrl={HERO_VSL.videoUrl}
            title={HERO_VSL.title}
            posterUrl={IMGS.heroMethod}
            className="mb-12 px-2"
          />

          <div className="w-full space-y-3 mb-12 text-left">
            {[
              '"Probé mil productos y nada funcionó de verdad"',
              '"Me canso de tapar el acné con maquillaje cada día"',
              '"Siento que mi piel nunca va a estar limpia"',
              '"Las marcas me recuerdan cada brote que tuve"',
            ].map((pain, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/70 border border-[#d4b499]/20 rounded-2xl px-5 py-4"
              >
                <AlertCircle size={14} className="text-[#c17f5a] shrink-0" />
                <p className="text-sm text-[#7d5a44] italic">{pain}</p>
              </div>
            ))}
          </div>

          <BookingCtaButtons
            className="mb-10 flex w-full flex-col gap-3"
            reserveHereClassName="w-full bg-[#4a3221] text-[#f7f0eb] py-6 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-xl active:scale-95 transition-all text-center"
            reserveWhatsappClassName="w-full border border-[#4a3221]/20 bg-white text-[#4a3221] py-6 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-lg transition-all text-center"
          />

          <button
            onClick={() =>
              document
                .getElementById("metodo")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-3 text-[#a5846e]"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.3em]">
              Conoce el método
            </span>
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* SECTION 2: CASO VALENTINA */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-3">
              Caso Real Documentado
            </p>
            <h2 className="text-4xl font-serif uppercase tracking-tight mb-2">
              El cambio de{" "}
              <span className="font-script italic capitalize text-[#d4b499] text-5xl">
                Valentina
              </span>
            </h2>
            <p className="text-sm text-[#7d5a44] italic">
              Acné moderado a severo · 4 meses de tratamiento · Sin filtros
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="rounded-2xl overflow-hidden aspect-square shadow-xl border-2 border-white mb-2">
                <img
                  src={IMGS.valeBefore}
                  alt="Valentina antes del tratamiento anti-acné"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-[9px] font-black uppercase tracking-widest text-[#c17f5a]">
                Antes
              </p>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden aspect-square shadow-xl border-2 border-[#d4b499]/40 mb-2">
                <img
                  src={IMGS.valeAfter}
                  alt="Valentina después del tratamiento anti-acné"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center text-[9px] font-black uppercase tracking-widest text-[#7db37d]">
                Después
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-10">
            {[IMGS.vale2, IMGS.vale3].map((img, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden aspect-square shadow-md"
              >
                <img
                  src={img}
                  alt={`Evolución Valentina sesión ${i + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="relative p-8 bg-[#f7f0eb] rounded-3xl border border-[#d4b499]/20 mb-10">
            <Quote
              size={28}
              className="absolute -top-3 left-6 text-[#d4b499]/40 fill-current"
            />
            <p className="text-base font-serif italic leading-relaxed text-[#4a3221]">
              "Ver este antes y después emociona, pero lo más importante es todo
              lo que hay detrás. Evaluación, constancia y un protocolo pensado
              para devolverle salud a la piel."
            </p>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#a5846e] mt-4">
              — Equipo Glow Skin · Caso Valentina
            </p>
          </div>

          <BookingCtaButtons
            className="flex w-full flex-col gap-3"
            reserveHereClassName="w-full bg-[#4a3221] text-[#f7f0eb] py-5 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-xl active:scale-95 transition-all text-center"
            reserveWhatsappClassName="w-full border border-[#4a3221]/20 bg-white text-[#4a3221] py-5 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-lg transition-all text-center"
          />

          <InstagramEmbed
            permalink="https://www.instagram.com/reel/DUKDP1jEbPS/"
            className="mt-8"
          />
        </div>
      </section>

      {/* SECTION 3: EL MÉTODO */}
      <section id="metodo" className="py-32 px-6 bg-[#f7f0eb]">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-px bg-[#d4b499] mx-auto mb-8"></div>
            <h2 className="text-5xl font-serif tracking-tighter uppercase mb-2 leading-none">
              El Método
            </h2>
            <p className="font-script text-6xl text-[#d4b499] italic">
              Glow Skin
            </p>
            <p className="text-sm text-[#7d5a44] mt-6 leading-relaxed max-w-xs mx-auto">
              No es una limpieza de spa. Es un protocolo clínico de 3 fases,
              diseñado para ir desde el brote activo hasta la piel completamente
              restaurada.
            </p>
          </div>

          <div className="space-y-24">
            {[
              {
                num: "01",
                tag: "Fase 1 — Siempre",
                title: "Limpieza Anti-acné Profunda",
                desc: "Una desincrustación técnica que va mucho más allá de la limpieza convencional. Adaptada para no generar hinchazón extrema ni dolor innecesario — tu piel sale limpia, no traumatizada.",
                img: IMGS.method1,
                alt: "Extracción facial profesional anti-acné Glow Skin",
                checks: [
                  "Extracción de comedones profundos",
                  "Control de carga bacteriana",
                  "Proceso sin trauma excesivo",
                ],
              },
              {
                num: "02",
                tag: "Fase 2 — Acompañada",
                title: "Peeling Seborregulador",
                desc: "Aplicamos activos bactericidas que eliminan la bacteria del acné desde adentro. Reduce el brillo excesivo, equilibra la producción de sebo y empieza a aclarar manchas desde la primera sesión.",
                img: IMGS.method2,
                alt: "Peeling químico facial anti-acné Glow Skin",
                checks: [
                  "Elimina la bacteria P. acnes",
                  "Regula producción de sebo",
                  "Aclara manchas activas",
                ],
              },
              {
                num: "03",
                tag: "Fase 3 — Cuando el acné está seco",
                title: "Restauración con Microneedling",
                desc: "Una vez controlado el acné activo, rellenamos marcas y eliminamos manchas profundas. Las cicatrices se cierran gradualmente y la piel recupera su textura natural con el efecto Glow.",
                img: IMGS.method3,
                alt: "Microneedling restauración piel post-acné Glow Skin",
                checks: [
                  "Rellena marcas de cicatriz",
                  "Elimina manchas oscuras",
                  "Devuelve textura uniforme",
                ],
              },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#d4b499] bg-[#d4b499]/10 px-3 py-1.5 rounded-full">
                    {item.tag}
                  </span>
                  <div className="flex-grow border-b border-dotted border-[#d4b499]/20"></div>
                  <span className="text-3xl font-serif text-[#d4b499]/25 italic">
                    {item.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-[#4a3221] mb-5 leading-tight">
                  {item.title}
                </h3>
                <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-6 aspect-[4/3]">
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-[#7d5a44] leading-relaxed mb-5">
                  {item.desc}
                </p>
                <div className="space-y-2">
                  {item.checks.map((c, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2
                        size={14}
                        className="text-[#d4b499] shrink-0"
                      />
                      <p className="text-xs text-[#7d5a44] font-medium">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROCESO DOCUMENTADO */}
      <section className="py-24 bg-[#4a3221] px-6 text-[#f7f0eb]">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-16">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-4">
              Resultados Documentados
            </p>
            <h2 className="text-4xl font-serif uppercase tracking-tight leading-tight mb-4">
              Así evoluciona
              <br />
              <span className="font-script lowercase text-[#d4b499] text-5xl italic">
                tu piel
              </span>
            </h2>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs mx-auto">
              Cada imagen es un proceso real, con pacientes reales. Sin filtros,
              sin promesas vacías.
            </p>
          </div>

          <div className="space-y-4 mb-16">
            {[
              {
                img: IMGS.proceso1,
                label: "Sesión 1–2",
                desc: "Inicio del control. Piel más limpia.",
              },
              {
                img: IMGS.proceso2,
                label: "Sesión 3–4",
                desc: "Reducción visible de brotes activos.",
              },
              {
                img: IMGS.proceso3,
                label: "Sesión 5–6",
                desc: "Acné en proceso de secado.",
              },
              {
                img: IMGS.proceso4,
                label: "Resultado",
                desc: "Piel restaurada y uniforme.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-center bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-2 pr-5"
              >
                <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={item.img}
                    alt={item.desc}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-1">
                    {item.label}
                  </p>
                  <p className="text-base font-serif italic">{item.desc}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#d4b499]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#d4b499] text-xs font-black">
                    {i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#d4b499]/10 border border-[#d4b499]/30 rounded-3xl p-8">
            <div className="flex gap-4 items-start">
              <Calendar size={20} className="text-[#d4b499] shrink-0 mt-1" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#d4b499] mb-2">
                  ¿Cada cuánto viene?
                </p>
                <p className="text-sm opacity-80 leading-relaxed">
                  Recomendamos sesiones{" "}
                  <strong className="text-white">cada 15 a 20 días</strong>. El
                  acné es una enfermedad crónica — la constancia mensual es tu
                  mejor aliada para mantener el avance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CASO KARLA */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-3">
              Otro Caso Real
            </p>
            <h2 className="text-4xl font-serif uppercase tracking-tight leading-tight">
              La transformación
              <br />
              <span className="font-script italic lowercase text-[#d4b499] text-5xl">
                de Karla
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {[IMGS.carla1, IMGS.carla2, IMGS.carla3].map((img, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden aspect-square shadow-lg"
              >
                <img
                  src={img}
                  alt={`Proceso Karla sesión ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center mb-10">
            {["Inicio", "Proceso", "Resultado"].map((l, i) => (
              <p
                key={i}
                className="text-[9px] font-black uppercase tracking-widest text-[#a5846e]"
              >
                {l}
              </p>
            ))}
          </div>

          <div className="relative p-8 bg-[#f7f0eb] rounded-3xl border border-[#d4b499]/20 mb-10">
            <Quote
              size={28}
              className="absolute -top-3 left-6 text-[#d4b499]/40 fill-current"
            />
            <p className="text-base font-serif italic leading-relaxed text-[#4a3221]">
              "Tu piel no necesita milagros, necesita un plan que responda a lo
              que realmente está viviendo. Cuando hay constancia, el espejo deja
              de mostrar siempre el mismo problema y empieza a reflejar un
              avance real."
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { val: "+4", label: "meses de seguimiento" },
              { val: "4", label: "limpiezas incluidas" },
              { val: "100%", label: "sin filtros" },
            ].map((s, i) => (
              <div
                key={i}
                className="text-center bg-[#f7f0eb] rounded-2xl py-5 px-3 border border-[#d4b499]/20"
              >
                <p className="text-2xl font-serif font-bold text-[#4a3221]">
                  {s.val}
                </p>
                <p className="text-[8px] uppercase tracking-wider text-[#a5846e] mt-1 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <BookingCtaButtons
            className="flex w-full flex-col gap-3"
            reserveHereClassName="w-full bg-[#4a3221] text-[#f7f0eb] py-5 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-xl active:scale-95 transition-all text-center"
            reserveWhatsappClassName="w-full border border-[#4a3221]/20 bg-white text-[#4a3221] py-5 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-lg transition-all text-center"
          />
        </div>
      </section>

      {/* SECTION 6: MÁS RESULTADOS */}
      <section className="py-16 px-6 bg-[#f7f0eb]">
        <div className="max-w-md mx-auto">
          <p className="text-center text-[9px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-8">
            Más resultados reales
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              IMGS.resultado1,
              IMGS.resultado2,
              IMGS.gallery1,
              IMGS.gallery2,
            ].map((img, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden shadow-xl aspect-[3/4]"
              >
                <img
                  src={img}
                  alt={`Resultado tratamiento anti-acné ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: DIFERENCIADORES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-md mx-auto text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4b499] mb-3">
            Lo que nos diferencia
          </p>
          <h2 className="text-4xl font-serif uppercase tracking-tight mb-12">
            Un compromiso
            <br />
            <span className="font-script italic lowercase text-[#d4b499] text-5xl">
              contigo
            </span>
          </h2>
          <div className="space-y-5 text-left">
            {[
              {
                icon: <Shield size={18} />,
                title: "Evaluación personalizada en cada visita",
                desc: "No trabajamos con protocolos genéricos. Evaluamos tu piel en cada sesión para ajustar el tratamiento a lo que realmente necesita.",
              },
              {
                icon: <Clock size={18} />,
                title: "Resultados progresivos y honestos",
                desc: "Esto no es de una sola sesión. Un proceso real requiere constancia — y nosotros te acompañamos en cada paso sin promesas vacías.",
              },
              {
                icon: <Star size={18} />,
                title: "Tratamiento integral: adentro y afuera",
                desc: "Además del procedimiento clínico, te damos recomendaciones de cuidado en casa y orientación sobre alimentación para combatir el acné de raíz.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-5 items-start bg-[#f7f0eb] rounded-3xl p-6 border border-[#d4b499]/15"
              >
                <div className="w-10 h-10 rounded-full bg-[#d4b499]/20 flex items-center justify-center text-[#d4b499] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#4a3221] mb-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#7d5a44] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: PROTOCOLOS / PRECIOS */}
      <section className="py-32 px-6 bg-[#4a3221] text-[#f7f0eb]">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-16">
            <Sparkles size={28} className="text-[#d4b499] mx-auto mb-6" />
            <h2 className="text-5xl font-serif uppercase tracking-tighter leading-[0.85] mb-4">
              Elige tu
              <br />
              <span className="font-script lowercase italic text-[#d4b499] text-6xl">
                camino
              </span>
            </h2>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs mx-auto">
              Cada protocolo está diseñado para un momento diferente de tu
              proceso. ¿No sabes cuál es el tuyo? Consúltanos.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#d4b499] mb-3">
                Para empezar
              </p>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
                Limpieza Facial Anti-Acné
              </h3>
              <p className="text-sm opacity-70 leading-relaxed mb-6">
                Enfocado en el control sebáceo y reducción de carga bacteriana.
                Ideal para tu primera sesión de exploración.
              </p>
              <div className="flex items-end justify-between mb-6">
                <p className="text-3xl font-serif">$165.000</p>
                <p className="text-[9px] opacity-50 uppercase tracking-widest">
                  Por sesión
                </p>
              </div>
              <BookingCtaButtons
                className="flex flex-col gap-3"
                reserveHereClassName="w-full border border-[#d4b499]/40 text-[#d4b499] py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-center hover:bg-[#d4b499]/10 transition-colors"
                reserveWhatsappClassName="w-full border border-white/25 text-white py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-center hover:bg-white/10 transition-colors"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#d4b499] mb-3">
                Mayor intensidad
              </p>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
                Limpieza Anti-Acné Seborreguladora
              </h3>
              <p className="text-sm opacity-70 leading-relaxed mb-6">
                Ideal para acné comedogénico activo y alta producción de grasa.
                Protocolo extendido con activos específicos.
              </p>
              <div className="flex items-end justify-between mb-6">
                <p className="text-3xl font-serif">$415.000</p>
                <p className="text-[9px] opacity-50 uppercase tracking-widest">
                  Por sesión
                </p>
              </div>
              <BookingCtaButtons
                className="flex flex-col gap-3"
                reserveHereClassName="w-full border border-[#d4b499]/40 text-[#d4b499] py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-center hover:bg-[#d4b499]/10 transition-colors"
                reserveWhatsappClassName="w-full border border-white/25 text-white py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-center hover:bg-white/10 transition-colors"
              />
            </div>

            <div className="bg-[#d4b499] text-[#4a3221] rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#4a3221] text-[#d4b499] text-[8px] font-black uppercase tracking-widest px-5 py-2 rounded-bl-2xl">
                Más completo
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#4a3221]/60 mb-3">
                Programa Integral
              </p>
              <h3 className="text-lg font-bold uppercase tracking-wide mb-2">
                Tratamiento Anti-Acné Intensivo
              </h3>
              <p className="text-sm opacity-80 leading-relaxed mb-5">
                Diseñado para tratar el acné activo de leve a severo. Todo lo
                que tu piel necesita para recuperarse por completo.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  "4 Limpiezas Faciales Anti-Acné",
                  "4 Sesiones de Peeling Seborregulador",
                  "4 Sesiones de Microneedling o Peeling Despigmentante",
                ].map((inc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2
                      size={13}
                      className="text-[#4a3221] shrink-0"
                    />
                    <p className="text-xs font-medium">{inc}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-4xl font-serif font-bold">$2.160.000</p>
                  <p className="text-[9px] opacity-60 uppercase tracking-widest mt-1">
                    Requiere valoración previa
                  </p>
                </div>
              </div>
              <BookingCtaButtons
                className="flex flex-col gap-3"
                reserveHereClassName="w-full bg-[#4a3221] text-[#f7f0eb] py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-center shadow-xl active:scale-95 transition-all"
                reserveWhatsappClassName="w-full border border-[#4a3221]/30 bg-white/50 text-[#4a3221] py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-center transition-all"
              />
            </div>
          </div>

          <BookingCtaButtons
            className="mt-8 flex w-full flex-col gap-3"
            reserveHereClassName="w-full border border-white/20 text-white/70 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-center hover:border-white/40 transition-colors"
            reserveWhatsappClassName="w-full border border-white/40 text-white py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-center hover:bg-white/10 transition-colors"
          />
        </div>
      </section>

      {/* SECTION 9: FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <div className="flex flex-col items-center max-w-sm mx-auto">
          <div className="w-16 h-px bg-[#d4b499] mb-12"></div>
          <h2 className="text-6xl font-serif mb-8 uppercase tracking-tighter leading-[0.85]">
            Es tu
            <br />
            momento.
          </h2>
          <p className="text-base text-[#7d5a44] font-medium italic leading-relaxed mb-12 max-w-xs">
            Los resultados de Valentina y Karla empezaron igual que tú: con una
            primera cita.{" "}
            <strong className="text-[#4a3221] not-italic">
              ¿La tuya cuándo es?
            </strong>
          </p>
          <BookingCtaButtons
            className="mb-4 flex w-full flex-col gap-3"
            reserveHereClassName="w-full bg-[#4a3221] text-[#f7f0eb] py-7 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-2xl active:scale-95 transition-all text-center"
            reserveWhatsappClassName="w-full border border-[#4a3221]/25 bg-white text-[#4a3221] py-7 rounded-full font-black text-xs uppercase tracking-[0.35em] shadow-lg transition-all text-center"
          />
          <p className="text-[9px] text-[#a5846e] uppercase tracking-widest mb-16">
            Sin compromiso · Diagnóstico profesional
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-16 px-6 border-t border-[#f1e4dc] text-center">
        <img
          src={IMGS.logo}
          className="h-6 mx-auto mb-8 opacity-60"
          alt="Glow Skin"
        />
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-[#a5846e]">
          © 2026 Glow Skin Barranquilla · Método Anti-Acné
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Montserrat:wght@400;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
        @keyframes reveal { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-reveal { animation: reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1); }
      `}</style>
    </div>
  );
}
