'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { X, Sparkles, ChevronRight, ShieldCheck, Loader2 } from 'lucide-react';
import { getPricingTreatmentNames } from '@/lib/content/pricing';
import { PHONE_WA_DIGITS } from '@/app/components/site-config';
import {
  buildWaMeUrl,
  fbqTrack,
  readFbCookies,
  sendCapiEvent,
  sendFormsLead,
  splitFullName,
} from './tracking';

type Ctx = {
  openBooking: (suggestedTreatments?: string[]) => void;
  openContact: () => void;
};

const LeadFormsContext = createContext<Ctx | null>(null);

export function useLeadForms() {
  const c = useContext(LeadFormsContext);
  if (!c) throw new Error('useLeadForms debe usarse dentro de LeadFormsProvider');
  return c;
}

function formatDateCol(d: Date) {
  return d.toLocaleDateString('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function defaultDatePair(): [string, string] {
  const t = new Date();
  const a = new Date(t);
  a.setDate(a.getDate() + 1);
  const b = new Date(t);
  b.setDate(b.getDate() + 2);
  return [formatDateCol(a), formatDateCol(b)];
}

function pickTreatments(suggested: string[], allNames: string[]): string[] {
  const valid = new Set(allNames);
  const fromS = suggested.filter((s) => valid.has(s));
  if (fromS.length) return fromS;
  return allNames[0] ? [allNames[0]] : [];
}

function buildBookingWaMessage(p: Record<string, unknown>) {
  const lines = [
    '*Reserva Glow Skin*',
    `Nombre: ${p.nombre}`,
    `Email: ${p.tu_mejor_email}`,
    `Cel/WhatsApp: ${p.celular_con_whatsapp}`,
    `Tratamientos: ${(p.tratamiento_de_interes as string[]).join(', ')}`,
    `1ª fecha: ${p.fecha_preferida}`,
    `2ª fecha: ${p.fecha_preferida_si_no_disponible_la_primera}`,
    `Horario: ${p.horario}`,
  ];
  return lines.join('\n');
}

function buildContactWaMessage(p: Record<string, unknown>) {
  return ['*Contacto Glow Skin*', `Nombre: ${p.nombre}`, `Email: ${p.tu_mejor_email}`, `Cel: ${p.celular_con_whatsapp}`].join(
    '\n',
  );
}

function modalFontStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;500;600;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
      .lead-modal .font-serif { font-family: 'Playfair Display', serif; }
      .lead-modal .font-sans { font-family: 'Montserrat', sans-serif; }
      .lead-modal .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
    `}</style>
  );
}

const inputCls =
  'w-full px-4 py-3 rounded-xl bg-white border border-[#d4b499]/45 focus:border-[#5c3a21] focus:outline-none text-[#4a3221] placeholder:text-[#7d5a44]/55 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

const labelCls = 'block text-sm font-bold text-[#4a3221] mb-2';

function LeadLoadingOverlay({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center bg-[#4a3221]/95 backdrop-blur-md">
      <div className="space-y-6 text-center">
        <Loader2 className="mx-auto h-16 w-16 animate-spin text-[#d4b499]" aria-hidden />
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#f7f0eb]">{message}</h3>
          <p className="text-sm text-[#f7f0eb]/65">Por favor espera un momento</p>
        </div>
      </div>
    </div>
  );
}

type LeadModalFrameProps = {
  formId: string;
  maxWidthClass: string;
  title: ReactNode;
  subtitle: string;
  onClose: () => void;
  busy: boolean;
  canSubmit: boolean;
  submitLabel: string;
  loadingMessage: string;
  onFormSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
};

function LeadModalFrame({
  formId,
  maxWidthClass,
  title,
  subtitle,
  onClose,
  busy,
  canSubmit,
  submitLabel,
  loadingMessage,
  onFormSubmit,
  children,
}: LeadModalFrameProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, busy]);

  return (
    <>
      {busy ? <LeadLoadingOverlay message={loadingMessage} /> : null}

      <div className="lead-modal fixed inset-0 z-[200] flex items-center justify-center p-4 font-sans">
        {modalFontStyles()}

        <div
          className="absolute inset-0 bg-[#ebe3da]/82 backdrop-blur-[2px]"
          onClick={busy ? undefined : onClose}
          aria-hidden
        />

        <div
          className={`relative flex max-h-[90vh] w-full ${maxWidthClass} flex-col overflow-hidden rounded-3xl border-2 border-[#d4b499] bg-gradient-to-b from-[#faf8f5] to-[#f7f0eb] shadow-[0_0_50px_rgba(74,50,33,0.12)]`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-[#4a3221]/10 p-6 md:p-8">
            <div className="min-w-0 pr-4">
              {title}
              <p className="mt-1 text-sm text-[#7d5a44]">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={busy}
              className="shrink-0 rounded-full p-2 text-[#5c3a21] transition-colors hover:bg-[#4a3221]/10 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Cerrar modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
              <form id={formId} onSubmit={onFormSubmit} className="space-y-6">
                {children}
              </form>
            </div>

            <div className="shrink-0 border-t border-[#4a3221]/10 bg-gradient-to-b from-[#faf8f5] to-[#f7f0eb] p-6 pt-4 md:p-8 md:pt-4">
              <button
                type="submit"
                form={formId}
                disabled={!canSubmit || busy}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-5 text-lg font-bold transition-all ${
                  canSubmit && !busy
                    ? 'bg-[#4a3221] text-[#f7f0eb] hover:bg-[#5c3a21] shadow-lg'
                    : 'cursor-not-allowed bg-[#e8dcd3] text-[#7d5a44]/60'
                }`}
              >
                {busy ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    {submitLabel}
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BookingLeadOverlay({
  pathname,
  onClose,
  suggested,
  treatmentOptions,
}: {
  pathname: string;
  onClose: () => void;
  suggested: string[];
  treatmentOptions: string[];
}) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cel, setCel] = useState('');
  const datePair = useMemo(() => defaultDatePair(), []);
  const [fecha1, setFecha1] = useState(datePair[0]);
  const [fecha2, setFecha2] = useState(datePair[1]);
  const [tratamientos, setTratamientos] = useState(() => pickTreatments(suggested, treatmentOptions));
  const [horario, setHorario] = useState<'mañana' | 'tarde'>('mañana');
  const [busy, setBusy] = useState(false);

  const phoneDigits = cel.replace(/\D/g, '');
  const canSubmit =
    nombre.trim().length >= 2 &&
    email.includes('@') &&
    email.length >= 5 &&
    phoneDigits.length >= 10 &&
    tratamientos.length > 0;

  function toggleTrat(t: string) {
    setTratamientos((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  async function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const horarioLabel = horario === 'tarde' ? 'Tarde' : 'Mañana';
    const data: Record<string, unknown> = {
      nombre: nombre.trim(),
      tu_mejor_email: email.trim(),
      celular_con_whatsapp: cel.trim(),
      tratamiento_de_interes: tratamientos,
      fecha_preferida: fecha1,
      fecha_preferida_si_no_disponible_la_primera: fecha2,
      horario: horarioLabel,
      formType: 'reserva',
      page_path: pathname,
    };

    const { firstName, lastName } = splitFullName(nombre.trim());
    const eventId = crypto.randomUUID();
    const { fbp, fbc } = readFbCookies();
    const waUrl = buildWaMeUrl(PHONE_WA_DIGITS, buildBookingWaMessage(data));

    setBusy(true);
    try {
      fbqTrack('track', 'Lead', {
        content_name: 'Reserva Glow Skin',
        content_category: 'booking',
      });
    } catch {
      /* noop */
    }

    try {
      await sendCapiEvent({
        eventName: 'Lead',
        eventTime: Math.floor(Date.now() / 1000),
        eventId,
        eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        actionSource: 'website',
        userData: {
          email: email.trim(),
          phone: cel.trim(),
          firstName,
          lastName,
          client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          fbp,
          fbc,
        },
        customData: {
          content_name: 'Reserva',
          content_category: 'booking',
          page_type: pathname,
        },
      });
    } catch {
      /* noop */
    }

    try {
      await sendFormsLead(data);
    } catch {
      /* noop */
    }

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setBusy(false);
    onClose();
  }

  return (
    <LeadModalFrame
      formId="glowskin-lead-booking"
      maxWidthClass="max-w-3xl"
      title={
        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#4a3221] md:text-3xl md:leading-tight">
          RESERVA TU{' '}
          <span className="bg-gradient-to-r from-[#a5846e] to-[#d4b499] bg-clip-text font-script text-2xl font-normal lowercase text-transparent md:text-3xl">
            cita glow skin
          </span>
        </h2>
      }
      subtitle="Cupos sujetos a disponibilidad. Te abriremos WhatsApp con tu solicitud."
      onClose={onClose}
      busy={busy}
      canSubmit={canSubmit}
      submitLabel="Enviar reserva"
      loadingMessage="Enviando tu reserva…"
      onFormSubmit={onFormSubmit}
    >
      <div>
        <label htmlFor="lead-booking-nombre" className={labelCls}>
          Nombre completo *
        </label>
        <input
          id="lead-booking-nombre"
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={busy}
          className={inputCls}
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="lead-booking-email" className={labelCls}>
          Email *
        </label>
        <input
          id="lead-booking-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          className={inputCls}
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="lead-booking-cel" className={labelCls}>
          Celular con WhatsApp *
        </label>
        <input
          id="lead-booking-cel"
          type="tel"
          inputMode="tel"
          required
          value={cel}
          onChange={(e) => setCel(e.target.value)}
          disabled={busy}
          className={inputCls}
          placeholder="+57 300 123 4567"
        />
      </div>

      <div>
        <p className={`${labelCls} mb-3`}>Tratamiento de interés *</p>
        <p className="mb-4 text-sm text-[#7d5a44]">Puedes elegir uno o varios (listado de precios).</p>
        <div className="max-h-48 overflow-y-auto pr-1 md:max-h-56">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {treatmentOptions.map((t) => (
              <label
                key={t}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold leading-snug transition-colors ${
                  tratamientos.includes(t)
                    ? 'border-[#4a3221] bg-white text-[#4a3221]'
                    : 'border-[#d4b499]/35 bg-white/90 text-[#7d5a44] hover:border-[#d4b499]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={tratamientos.includes(t)}
                  onChange={() => toggleTrat(t)}
                  disabled={busy}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-[#d4b499] text-[#4a3221] focus:ring-[#d4b499]"
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-booking-f1" className={labelCls}>
            Fecha preferida
          </label>
          <input
            id="lead-booking-f1"
            value={fecha1}
            onChange={(e) => setFecha1(e.target.value)}
            disabled={busy}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="lead-booking-f2" className={labelCls}>
            Fecha alternativa
          </label>
          <input
            id="lead-booking-f2"
            value={fecha2}
            onChange={(e) => setFecha2(e.target.value)}
            disabled={busy}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <p className={`${labelCls} mb-3`}>Horario preferido</p>
        <div className="flex flex-wrap gap-3">
          {(
            [
              { id: 'mañana' as const, label: 'Mañana' },
              { id: 'tarde' as const, label: 'Tarde' },
            ] as const
          ).map(({ id, label }) => (
            <label
              key={id}
              className={`cursor-pointer rounded-xl border-2 px-6 py-3 text-sm font-bold transition-all ${
                horario === id
                  ? 'border-[#4a3221] bg-[#4a3221] text-[#f7f0eb]'
                  : 'border-[#d4b499]/40 bg-white text-[#4a3221] hover:border-[#a5846e]'
              }`}
            >
              <input type="radio" name="horario-reserva" className="sr-only" checked={horario === id} onChange={() => setHorario(id)} disabled={busy} />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-[#d4b499] bg-white/90 p-6 shadow-[0_0_24px_rgba(212,180,153,0.2)]">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#a5846e]" aria-hidden />
          <div>
            <p className="mb-2 font-serif text-lg font-bold text-[#4a3221]">Datos seguros · Atención personalizada</p>
            <p className="text-sm leading-relaxed text-[#7d5a44]">
              Usamos tu información solo para coordinar tu cita. Por defecto sugerimos <strong className="text-[#4a3221]">mañana y pasado mañana en horario de mañana</strong>
              ; puedes cambiarlo arriba.
            </p>
          </div>
        </div>
      </div>
    </LeadModalFrame>
  );
}

function ContactLeadOverlay({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cel, setCel] = useState('');
  const [busy, setBusy] = useState(false);

  const phoneDigits = cel.replace(/\D/g, '');
  const canSubmit =
    nombre.trim().length >= 2 && email.includes('@') && email.length >= 5 && phoneDigits.length >= 10;

  async function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const data: Record<string, unknown> = {
      nombre: nombre.trim(),
      tu_mejor_email: email.trim(),
      celular_con_whatsapp: cel.trim(),
      formType: 'contacto',
      page_path: pathname,
    };

    const { firstName, lastName } = splitFullName(nombre.trim());
    const eventId = crypto.randomUUID();
    const { fbp, fbc } = readFbCookies();
    const waUrl = buildWaMeUrl(PHONE_WA_DIGITS, buildContactWaMessage(data));

    setBusy(true);
    try {
      fbqTrack('track', 'Lead', {
        content_name: 'Contacto Glow Skin',
        content_category: 'contact',
      });
    } catch {
      /* noop */
    }

    try {
      await sendCapiEvent({
        eventName: 'Lead',
        eventTime: Math.floor(Date.now() / 1000),
        eventId,
        eventSourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        actionSource: 'website',
        userData: {
          email: email.trim(),
          phone: cel.trim(),
          firstName,
          lastName,
          client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
          fbp,
          fbc,
        },
        customData: {
          content_name: 'Contacto',
          content_category: 'contact',
          page_type: pathname,
        },
      });
    } catch {
      /* noop */
    }

    try {
      await sendFormsLead(data);
    } catch {
      /* noop */
    }

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setBusy(false);
    onClose();
  }

  return (
    <LeadModalFrame
      formId="glowskin-lead-contact"
      maxWidthClass="max-w-3xl"
      title={
        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#4a3221] md:text-3xl md:leading-tight">
          ESCRÍBENOS —{' '}
          <span className="bg-gradient-to-r from-[#a5846e] to-[#d4b499] bg-clip-text font-script text-2xl font-normal lowercase text-transparent md:text-3xl">
            glow skin
          </span>
        </h2>
      }
      subtitle="Déjanos tus datos y continuamos por WhatsApp."
      onClose={onClose}
      busy={busy}
      canSubmit={canSubmit}
      submitLabel="Enviar contacto"
      loadingMessage="Enviando tu mensaje…"
      onFormSubmit={onFormSubmit}
    >
      <div>
        <label htmlFor="lead-contact-nombre" className={labelCls}>
          Nombre completo *
        </label>
        <input
          id="lead-contact-nombre"
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          disabled={busy}
          className={inputCls}
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="lead-contact-email" className={labelCls}>
          Email *
        </label>
        <input
          id="lead-contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          className={inputCls}
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="lead-contact-cel" className={labelCls}>
          WhatsApp *
        </label>
        <input
          id="lead-contact-cel"
          type="tel"
          inputMode="tel"
          required
          value={cel}
          onChange={(e) => setCel(e.target.value)}
          disabled={busy}
          className={inputCls}
          placeholder="+57 300 123 4567"
        />
      </div>

      <div className="rounded-2xl border-2 border-[#d4b499] bg-white/90 p-6 shadow-[0_0_24px_rgba(212,180,153,0.2)]">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-[#a5846e]" aria-hidden />
          <div>
            <p className="mb-2 font-serif text-lg font-bold text-[#4a3221]">Respuesta en horario de atención</p>
            <p className="text-sm leading-relaxed text-[#7d5a44]">
              Te dirigimos a WhatsApp con un mensaje listo para que solo envíes y nuestro equipo te responda.
            </p>
          </div>
        </div>
      </div>
    </LeadModalFrame>
  );
}

export function LeadFormsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const [mode, setMode] = useState<'booking' | 'contact' | null>(null);
  const [suggested, setSuggested] = useState<string[]>([]);
  const treatmentOptions = useMemo(() => getPricingTreatmentNames(), []);

  const openBooking = useCallback((s?: string[]) => {
    setSuggested(s?.filter(Boolean) ?? []);
    setMode('booking');
  }, []);

  const openContact = useCallback(() => {
    setSuggested([]);
    setMode('contact');
  }, []);

  const close = useCallback(() => setMode(null), []);

  return (
    <LeadFormsContext.Provider value={{ openBooking, openContact }}>
      {children}
      {mode === 'booking' ? (
        <BookingLeadOverlay
          pathname={pathname}
          onClose={close}
          suggested={suggested}
          treatmentOptions={treatmentOptions}
        />
      ) : null}
      {mode === 'contact' ? <ContactLeadOverlay pathname={pathname} onClose={close} /> : null}
    </LeadFormsContext.Provider>
  );
}
