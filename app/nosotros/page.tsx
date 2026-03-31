import { WA_LINK } from '@/components/site-config';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Glow Skin',
  description: 'Conoce a Sofia Nieto, fundadora de Glow Skin. Descubre nuestra historia, empatía y la búsqueda de una belleza facial que no duele en Barranquilla.',
};

const BASE_URL = 'https://main.d1xrycrl1hw09l.amplifyapp.com/assets/';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221]">
      {/* --- Hero Section --- */}
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[#4a3221]/40 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f0eb] via-transparent to-transparent z-10"></div>
        <img
          src={`${BASE_URL}images/sofia/sofia-nieto-glow-skin-bq-2.png`}
          alt="Sofia Nieto - Fundadora de Glow Skin"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="relative z-20 container mx-auto px-6 mt-32">
          <div className="flex flex-col items-center">
            <span className="text-[#d4b499] font-black tracking-[0.4em] text-xs md:text-sm uppercase mb-6 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md border border-white/20">
              Nuestra Historia
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-none tracking-tight text-white mb-6 drop-shadow-lg">
              Sofia Nieto
              <span className="block font-script text-4xl md:text-6xl lg:text-7xl text-[#d4b499] mt-2">
                Especialista en Estética Facial
              </span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-white/90 max-w-2xl leading-relaxed tracking-wide italic drop-shadow-md">
              La historia de Glow Skin no es solo sobre estética; es un viaje de
              transformación, empatía y la búsqueda incansable de una belleza que no
              duele en Barranquilla.
            </p>
          </div>
        </div>
      </section>

      {/* --- Introducción Sofia --- */}
      <section className="py-24 lg:py-32 container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="w-16 h-px bg-[#d4b499] mb-8"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tighter text-[#4a3221] leading-[1.1] mb-8">
              Mi nombre es Sofía Nieto, fundadora de Glow Skin.
            </h2>
            <div className="space-y-6 text-[#7d5a44] text-lg leading-relaxed">
              <p>
                Glow Skin empezó con un sueño inspirado en un proceso de acné que viví
                hace varios años, entrando a mis 20's. Fue ahí cuando viví la peor
                etapa de mi vida a nivel físico; me sentía muy mal conmigo misma y eso
                me llevó a hacer de todo para poder recuperar la textura de mi piel.
              </p>
              <p>
                Tuve un acné muy severo, cosa que me hacía percibirme a mí misma con
                una mala imagen porque nunca me había visto de esa manera.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <div className="absolute -inset-10 bg-[#d4b499]/10 rounded-full blur-[80px] pointer-events-none" />
            <img
              src={`${BASE_URL}images/sofia/sofia-acne-antes-despues-perfil.jpg`}
              className="relative rounded-[3rem] shadow-[0_40px_100px_rgba(74,50,33,0.15)] w-full object-cover aspect-[4/5] z-10"
              alt="Sofia Nieto durante su proceso de acné"
            />
          </div>
        </div>
      </section>

      {/* --- El Proceso y la Empatía --- */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#f7f0eb] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center max-w-4xl">
          <span className="text-[#d4b499] font-black tracking-[0.4em] text-xs uppercase mb-4 block">El Origen</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a3221] tracking-tighter mb-10">
            Del Dolor a la Vocación
          </h2>
          <p className="text-lg md:text-xl text-[#7d5a44] leading-relaxed mb-12">
            Un tiempo después de intentar varios tratamientos, de pasar por varias
            limpiezas, dermatólogos y especialistas, mi piel empezó a ver un cambio y
            una recuperación. No lo niego, el acné me dejó buenas marcas en mi piel,
            algunas cicatrices que no he podido borrar por más que lo intente, sobre
            todo las emocionales...
          </p>
          
          <div className="relative py-12 px-8 md:px-16 mb-12">
            <div className="absolute left-0 top-0 text-[8rem] text-[#d4b499]/20 font-serif leading-none select-none">"</div>
            <blockquote className="relative z-10 font-serif text-2xl md:text-3xl text-[#4a3221] italic leading-relaxed text-left border-l-2 border-[#d4b499] pl-8">
              Algo que experimentaba mucho como paciente es que cada vez que me
              realizaba una limpieza facial me dolía mucho. Lloraba antes de salir de mi
              casa y después de salir del procedimiento.
            </blockquote>
          </div>

          <p className="text-lg text-[#7d5a44] leading-relaxed max-w-3xl mx-auto">
            Esa experiencia me marcó profundamente. Por eso, estudié Cosmetología y
            Cosmiatría, porque quería aprender sobre los principios que usaron
            aquellos profesionales que trataron mi piel, pero con la firme convicción
            de que podía hacerlo diferente, de una manera más compasiva.
          </p>
        </div>
      </section>

      {/* --- La Misión de Glow Skin --- */}
      <section className="py-24 lg:py-32 container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          <div className="lg:w-1/2 flex flex-col items-start text-left">
            <div className="w-16 h-px bg-[#d4b499] mb-8"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tighter text-[#4a3221] leading-[1.1] mb-8">
              La Búsqueda de una Belleza sin Sufrimiento
            </h2>
            <div className="space-y-6 text-[#7d5a44] text-lg leading-relaxed">
              <p>
                Trabajé en otros centros de estética, pero mi pasión siempre fue hacer
                que las personas, especialmente las mujeres, pudieran recuperar su
                belleza sin tener que sufrir en el intento. Investigué muchísimo antes
                de fundar Glow Skin sobre cómo hacer que las limpiezas faciales
                dejaran de ser una experiencia traumática.
              </p>
              <p>
                Trabajando con una colega muy reconocida de aquí de Barranquilla,
                descubrí la manera de lograrlo. Cuando inicié Glow Skin, mi meta era
                clara: hacer que toda Barranquilla tuviera una PIEL GLOW, sin tener
                que sufrir en el proceso.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <div className="absolute -inset-10 bg-[#4a3221]/5 rounded-full blur-[80px] pointer-events-none" />
            <img
              src={`${BASE_URL}images/sofia/sofia-acne-antes-y-despues.jpg`}
              className="relative rounded-[3rem] shadow-[0_40px_100px_rgba(74,50,33,0.15)] w-full object-cover aspect-[4/5] z-10"
              alt="Sofia Nieto antes y después de su transformación"
            />
          </div>
        </div>
      </section>

      {/* --- La Diferencia Glow Skin --- */}
      <section className="py-24 lg:py-32 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4b499]/30 to-transparent"></div>
        <div className="container mx-auto px-6 lg:px-12 text-center max-w-5xl">
          <span className="text-[#d4b499] font-black tracking-[0.4em] text-xs uppercase mb-4 block">El Resultado</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#4a3221] tracking-tighter mb-10">
            El Brillo Único de Glow Skin
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-[#7d5a44] text-lg leading-relaxed mb-16">
            <p>
              Hoy, gracias a todo ese descubrimiento e investigación, la limpieza facial
              en Glow Skin casi no genera dolor. Realizamos la extracción de una manera
              que la cara no quede hinchada ni genere un dolor insoportable. Pero lo más
              importante es que nuestras clientas lo notan.
            </p>
            <p>
              Muchas de mis clientas y clientes hombres pueden confirmarlo: en otros
              lugares la cara les quedaba super inflamada y roja. En Glow Skin te vas
              con la piel más reluciente y con un Brillo característico que solamente
              puedes tener aquí.
            </p>
          </div>

          <div className="my-20 relative">
            <div className="absolute -inset-10 bg-[#d4b499]/10 rounded-full blur-[100px] pointer-events-none" />
            <img
              src={`${BASE_URL}images/sofia/sofia-nieto-glow-skin-bq.png`}
              alt="Sofia Nieto - Fundadora de Glow Skin"
              className="relative rounded-[3rem] shadow-[0_40px_100px_rgba(74,50,33,0.15)] w-full max-w-4xl mx-auto object-cover z-10"
            />
          </div>

          <div className="max-w-3xl mx-auto mt-16">
            <blockquote className="font-serif text-3xl md:text-4xl text-[#4a3221] italic leading-tight text-center mb-10">
              "Nada me apasiona más que tratar tan bien a mis clientas que todas quieren
              volver, así sea una vez en la vida."
            </blockquote>
            <p className="text-lg text-[#7d5a44] leading-relaxed">
              Yo estoy cumpliendo mi sueño con Glow Skin y motivo a todos a poder hacer
              también sus sueños realidad, sobre todo si tiene una causa tan noble y
              buena como ayudar a los demás.
            </p>
          </div>
        </div>
      </section>

      {/* --- CTA Final --- */}
      <section className="py-24 lg:py-32 bg-[#4a3221] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#d4b499]/5 opacity-50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#f7f0eb] tracking-tighter mb-8">
            ¿Lista para empezar tu propia transformación?
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
            Permíteme ayudarte a descubrir la mejor versión de tu piel. Agenda una
            valoración y creemos juntos un plan para ti.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-5 bg-[#d4b499] hover:bg-[#c2a085] text-[#4a3221] font-black text-sm uppercase tracking-[0.2em] rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_20px_40px_rgba(212,180,153,0.3)]"
          >
            Agendar ahora
          </a>
        </div>
      </section>

      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&family=Montserrat:wght@100;400;700;900&family=Cormorant+Garamond:ital,wght@1,300;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}</style>
    </div>
  );
}
