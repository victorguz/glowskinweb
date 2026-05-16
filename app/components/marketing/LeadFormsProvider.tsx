"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { X, Sparkles, ChevronRight, ShieldCheck, Loader2 } from "lucide-react";
import { PHONE_WA_DIGITS } from "@/app/components/site-config";
import {
  buildWaMeUrl,
  fbqTrack,
  readFbCookies,
  sendCapiEvent,
  sendFormsLead,
  splitFullName,
} from "./tracking";

type Ctx = {
  openBooking: (suggestedTreatments?: string[]) => void;
  openContact: () => void;
};

const LeadFormsContext = createContext<Ctx | null>(null);

export function useLeadForms() {
  const c = useContext(LeadFormsContext);
  if (!c)
    throw new Error("useLeadForms debe usarse dentro de LeadFormsProvider");
  return c;
}

function buildBookingWaMessage(p: Record<string, unknown>) {
  const lines = [
    "*Reserva Glow Skin*",
    `Nombre: ${p.nombre}`,
    `Email: ${p.tu_mejor_email}`,
    `Cel/WhatsApp: ${p.celular_con_whatsapp}`,
  ];
  return lines.join("\n");
}

function buildContactWaMessage(p: Record<string, unknown>) {
  return [
    "*Contacto Glow Skin*",
    `Nombre: ${p.nombre}`,
    `Email: ${p.tu_mejor_email}`,
    `Cel: ${p.celular_con_whatsapp}`,
  ].join("\n");
}

function modalFontStyles() {
  return (
    <style>{`
      /* Google Fonts import eliminado para optimización. Usa next/font en layout.tsx */
      .lead-modal .font-serif { font-family: 'Playfair Display', serif; }
      .lead-modal .font-sans { font-family: 'Montserrat', sans-serif; }
      .lead-modal .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
    `}</style>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl bg-white border border-[#d4b499]/45 focus:border-[#5c3a21] focus:outline-none text-[#4a3221] placeholder:text-[#7d5a44]/55 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

const labelCls = "block text-sm font-bold text-[#4a3221] mb-2";

function LeadLoadingOverlay({ message }: { message: string }) {
  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center bg-[#4a3221]/95 backdrop-blur-md">
      <div className="space-y-6 text-center">
        <Loader2
          className="mx-auto h-16 w-16 animate-spin text-[#d4b499]"
          aria-hidden
        />
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-bold text-[#f7f0eb]">
            {message}
          </h3>
          <p className="text-sm text-[#f7f0eb]/65">
            Por favor espera un momento
          </p>
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
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
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
                    ? "bg-[#4a3221] text-[#f7f0eb] hover:bg-[#5c3a21] shadow-lg"
                    : "cursor-not-allowed bg-[#e8dcd3] text-[#7d5a44]/60"
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
}: {
  pathname: string;
  onClose: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cel, setCel] = useState("");
  const [busy, setBusy] = useState(false);

  const phoneDigits = cel.replace(/\D/g, "");
  const canSubmit =
    nombre.trim().length >= 2 &&
    email.includes("@") &&
    email.length >= 5 &&
    phoneDigits.length >= 10;

  async function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const data: Record<string, unknown> = {
      nombre: nombre.trim(),
      tu_mejor_email: email.trim(),
      celular_con_whatsapp: cel.trim(),
      formType: "reserva",
      page_path: pathname,
    };

    const { firstName, lastName } = splitFullName(nombre.trim());
    const eventId = crypto.randomUUID();
    const { fbp, fbc } = readFbCookies();
    const waUrl = buildWaMeUrl(PHONE_WA_DIGITS, buildBookingWaMessage(data));

    setBusy(true);
    try {
      fbqTrack("track", "Lead", {
        content_name: "Reserva Glow Skin",
        content_category: "booking",
      });
    } catch {
      /* noop */
    }

    try {
      await sendCapiEvent({
        eventName: "Lead",
        eventTime: Math.floor(Date.now() / 1000),
        eventId,
        eventSourceUrl:
          typeof window !== "undefined" ? window.location.href : "",
        actionSource: "website",
        userData: {
          email: email.trim(),
          phone: cel.trim(),
          firstName,
          lastName,
          client_user_agent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
          fbp,
          fbc,
        },
        customData: {
          content_name: "Reserva",
          content_category: "booking",
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

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setBusy(false);
    onClose();
  }

  return (
    <LeadModalFrame
      formId="glowskin-lead-booking"
      maxWidthClass="max-w-3xl"
      title={
        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#4a3221] md:text-3xl md:leading-tight">
          RESERVA TU{" "}
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
          WhatsApp *
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

      <div className="rounded-2xl border-2 border-[#d4b499] bg-white/90 p-6 shadow-[0_0_24px_rgba(212,180,153,0.2)]">
        <div className="flex items-start gap-3">
          <ShieldCheck
            className="mt-0.5 h-6 w-6 shrink-0 text-[#a5846e]"
            aria-hidden
          />
          <div>
            <p className="mb-2 font-serif text-lg font-bold text-[#4a3221]">
              Datos seguros · Atención personalizada
            </p>
            <p className="text-sm leading-relaxed text-[#7d5a44]">
              Usamos tu información solo para coordinar tu cita y te abriremos
              WhatsApp con un mensaje listo para enviar.
            </p>
          </div>
        </div>
      </div>
    </LeadModalFrame>
  );
}

function ContactLeadOverlay({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [cel, setCel] = useState("");
  const [busy, setBusy] = useState(false);

  const phoneDigits = cel.replace(/\D/g, "");
  const canSubmit =
    nombre.trim().length >= 2 &&
    email.includes("@") &&
    email.length >= 5 &&
    phoneDigits.length >= 10;

  async function onFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    const data: Record<string, unknown> = {
      nombre: nombre.trim(),
      tu_mejor_email: email.trim(),
      celular_con_whatsapp: cel.trim(),
      formType: "contacto",
      page_path: pathname,
    };

    const { firstName, lastName } = splitFullName(nombre.trim());
    const eventId = crypto.randomUUID();
    const { fbp, fbc } = readFbCookies();
    const waUrl = buildWaMeUrl(PHONE_WA_DIGITS, buildContactWaMessage(data));

    setBusy(true);
    try {
      fbqTrack("track", "Lead", {
        content_name: "Contacto Glow Skin",
        content_category: "contact",
      });
    } catch {
      /* noop */
    }

    try {
      await sendCapiEvent({
        eventName: "Lead",
        eventTime: Math.floor(Date.now() / 1000),
        eventId,
        eventSourceUrl:
          typeof window !== "undefined" ? window.location.href : "",
        actionSource: "website",
        userData: {
          email: email.trim(),
          phone: cel.trim(),
          firstName,
          lastName,
          client_user_agent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
          fbp,
          fbc,
        },
        customData: {
          content_name: "Contacto",
          content_category: "contact",
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

    window.open(waUrl, "_blank", "noopener,noreferrer");
    setBusy(false);
    onClose();
  }

  return (
    <LeadModalFrame
      formId="glowskin-lead-contact"
      maxWidthClass="max-w-3xl"
      title={
        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#4a3221] md:text-3xl md:leading-tight">
          ESCRÍBENOS —{" "}
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
          <ShieldCheck
            className="mt-0.5 h-6 w-6 shrink-0 text-[#a5846e]"
            aria-hidden
          />
          <div>
            <p className="mb-2 font-serif text-lg font-bold text-[#4a3221]">
              Respuesta en horario de atención
            </p>
            <p className="text-sm leading-relaxed text-[#7d5a44]">
              Te dirigimos a WhatsApp con un mensaje listo para que solo envíes
              y nuestro equipo te responda.
            </p>
          </div>
        </div>
      </div>
    </LeadModalFrame>
  );
}

export function LeadFormsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const [mode, setMode] = useState<"booking" | "contact" | null>(null);

  const openBooking = useCallback((_suggestedTreatments?: string[]) => {
    setMode("booking");
  }, []);

  const openContact = useCallback(() => {
    setMode("contact");
  }, []);

  const close = useCallback(() => setMode(null), []);

  return (
    <LeadFormsContext.Provider value={{ openBooking, openContact }}>
      {children}
      {mode === "booking" ? (
        <BookingLeadOverlay pathname={pathname} onClose={close} />
      ) : null}
      {mode === "contact" ? (
        <ContactLeadOverlay pathname={pathname} onClose={close} />
      ) : null}
    </LeadFormsContext.Provider>
  );
}
