import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { LeadTrigger } from '@/app/components/marketing/LeadTrigger';
import type { CategoryServicePair } from '@/lib/content/service-utils';
import { formatServicePrice } from '@/lib/content/service-utils';
import { getServiceHeroImage, getServiceProcessImage } from '@/lib/content/service-media';
import { ServiceFaqAccordion, type FaqItem } from './ServiceFaqAccordion';
import { ServiceIcon } from './service-icons';

function detailLabel(key: string): string {
  const m: Record<string, string> = {
    frequency: 'Frecuencia',
    idealFor: 'Ideal para',
    activos: 'Activos',
    benefits: 'Beneficios',
    includes: 'Incluye',
    duration: 'Duración',
    results: 'Resultados',
  };
  return m[key] ?? key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()).trim();
}

function renderDetailsRows(details: Record<string, unknown>): { label: string; val: string }[] {
  const rows: { label: string; val: string }[] = [];
  for (const [k, v] of Object.entries(details)) {
    if (v == null) continue;
    if (Array.isArray(v)) {
      rows.push({ label: detailLabel(k), val: v.map(String).join(' · ') });
    } else if (typeof v === 'string' || typeof v === 'number') {
      rows.push({ label: detailLabel(k), val: String(v) });
    }
  }
  return rows;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function SimpleServiceFallback({ pair }: { pair: CategoryServicePair }) {
  const { service, categoryTitle } = pair;
  const rows = renderDetailsRows(service.details as Record<string, unknown>);
  const heroImg = getServiceHeroImage(service.id);

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221]">
      <section className="relative pt-48 pb-24 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f0eb] via-[#f7f0eb]/90 to-[#f7f0eb]" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">{categoryTitle}</p>
          <h1 className="mb-6 font-serif text-5xl leading-none tracking-tight text-[#4a3221] md:text-7xl">{service.name}</h1>
          <p className="mx-auto max-w-2xl text-lg font-medium italic leading-relaxed text-[#7d5a44]">{service.description}</p>
          <p className="mt-8 font-serif text-3xl italic text-[#d4b499]">{formatServicePrice(service.price, service.currency)}</p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#d4b499]/20 bg-white p-10 shadow-sm">
          <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">Detalles</p>
          <ul className="space-y-4">
            {rows.map((r, i) => (
              <li key={i} className="flex flex-col gap-1 border-b border-[#4a3221]/5 pb-4 last:border-0 sm:flex-row sm:justify-between sm:gap-8">
                <span className="text-xs font-black uppercase tracking-widest text-[#7d5a44]">{r.label}</span>
                <span className="text-sm font-semibold text-[#4a3221]">{r.val}</span>
              </li>
            ))}
          </ul>
          <LeadTrigger
            mode="booking"
            suggestedTreatments={[service.name]}
            className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#4a3221] px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f0eb] transition-colors hover:bg-[#d4b499]"
          >
            Agendar por WhatsApp <ArrowRight size={16} />
          </LeadTrigger>
          <p className="mt-8 text-center text-sm text-[#7d5a44]">
            <Link href="/precios" className="border-b border-[#d4b499]/40 font-semibold hover:text-[#4a3221]">
              Ver todos los precios
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

function BenefitsSection({ data }: { data: Record<string, unknown> }) {
  const items = data.items as { icon: string; title: string; description: string }[];
  if (!Array.isArray(items)) return null;
  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-4xl text-[#4a3221] md:text-6xl">{String(data.title)}</h2>
          {data.subtitle ? <p className="font-medium text-[#7d5a44] opacity-80">{String(data.subtitle)}</p> : null}
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="group">
              <div className="mb-6 flex items-end justify-between gap-4">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#4a3221]">{item.title}</h3>
                <div className="mb-1.5 flex-grow border-b border-dotted border-[#d4b499]/30" />
                <ServiceIcon name={item.icon} className="h-5 w-5 shrink-0 text-[#d4b499]" />
              </div>
              <p className="pr-8 text-sm font-medium leading-relaxed text-[#7d5a44]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemLikeSection({
  data,
  variant,
}: {
  data: Record<string, unknown>;
  variant: 'problem' | 'understanding';
}) {
  const causes = (data.causes ?? data.signs) as { title: string; description: string }[] | undefined;
  const approach = data.approach as { icon: string; title: string }[] | undefined;
  if (!Array.isArray(causes)) return null;
  return (
    <section className="container mx-auto px-6 py-24 lg:px-24">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h2 className="mb-6 font-serif text-4xl text-[#4a3221] md:text-5xl">{String(data.title)}</h2>
        {data.subtitle ? <p className="text-lg font-medium leading-relaxed text-[#7d5a44]">{String(data.subtitle)}</p> : null}
      </div>
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        {causes.map((c, i) => (
          <div key={i} className="rounded-3xl border border-[#d4b499]/15 bg-white/60 p-8 shadow-sm">
            <h3 className="mb-3 font-serif text-xl text-[#4a3221]">{c.title}</h3>
            <p className="text-sm font-medium leading-relaxed text-[#7d5a44]">{c.description}</p>
          </div>
        ))}
      </div>
      {approach && approach.length > 0 ? (
        <div className="mx-auto mt-16 flex max-w-4xl flex-wrap justify-center gap-4">
          {approach.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-full border border-[#d4b499]/30 bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-[#4a3221]"
            >
              <ServiceIcon name={a.icon} className="h-4 w-4 text-[#d4b499]" />
              {a.title}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ExpectationsSection({ data }: { data: Record<string, unknown> }) {
  const timeline = data.timeline as { phase: string; icon: string; description: string }[] | undefined;
  if (Array.isArray(timeline)) {
    return (
      <section className="bg-[#fbf6f3] py-24">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl text-[#4a3221] md:text-5xl">{String(data.title)}</h2>
            {data.subtitle ? <p className="mt-4 text-[#7d5a44]">{String(data.subtitle)}</p> : null}
          </div>
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <div key={i} className="rounded-[2rem] border border-[#d4b499]/20 bg-white p-8">
                <ServiceIcon name={t.icon} className="mb-4 h-8 w-8 text-[#d4b499]" />
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#d4b499]">{t.phase}</p>
                <p className="text-sm font-medium leading-relaxed text-[#7d5a44]">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const immediate = data.immediate as { title: string; description: string } | undefined;
  const shortTerm = data.shortTerm as { title: string; description: string } | undefined;
  const longTerm = data.longTerm as { title: string; description: string } | undefined;
  if (immediate && shortTerm && longTerm) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl text-[#4a3221] md:text-5xl">{String(data.title)}</h2>
            {data.subtitle ? <p className="mt-4 text-[#7d5a44]">{String(data.subtitle)}</p> : null}
          </div>
          <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
            {[immediate, shortTerm, longTerm].map((block, i) => (
              <div key={i} className="rounded-[2rem] border border-[#d4b499]/20 bg-white p-8">
                <h3 className="mb-4 font-serif text-xl text-[#4a3221]">{block.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-[#7d5a44]">{block.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}

function CareListsSection({ data, mode }: { data: Record<string, unknown>; mode: 'care' | 'home' }) {
  const doList = (mode === 'care' ? data.doList : data.recommended) as { title: string; description: string }[] | undefined;
  const dontList = (mode === 'care' ? data.dontList : data.avoid) as { title: string; description: string }[] | undefined;
  if (!doList?.length && !dontList?.length) return null;
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl text-[#4a3221] md:text-5xl">{String(data.title)}</h2>
          {data.subtitle ? <p className="mt-4 text-[#7d5a44]">{String(data.subtitle)}</p> : null}
        </div>
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {doList && doList.length > 0 ? (
            <div>
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">
                {mode === 'care' ? 'Recomendado' : 'Recomendado'}
              </p>
              <ul className="space-y-6">
                {doList.map((item, i) => (
                  <li key={i}>
                    <p className="font-bold text-[#4a3221]">{item.title}</p>
                    <p className="mt-1 text-sm text-[#7d5a44]">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {dontList && dontList.length > 0 ? (
            <div>
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#a5846e]">Evitar</p>
              <ul className="space-y-6">
                {dontList.map((item, i) => (
                  <li key={i}>
                    <p className="font-bold text-[#4a3221]">{item.title}</p>
                    <p className="mt-1 text-sm text-[#7d5a44]">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function AvoidSection({ data }: { data: Record<string, unknown> }) {
  const items = data.items as { icon: string; title: string; description: string }[] | undefined;
  if (!Array.isArray(items)) return null;
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl text-[#4a3221] md:text-5xl">{String(data.title)}</h2>
          {data.subtitle ? <p className="mt-4 text-[#7d5a44]">{String(data.subtitle)}</p> : null}
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4 rounded-3xl border border-[#d4b499]/20 bg-white p-6">
              <ServiceIcon name={item.icon} className="mt-1 h-6 w-6 shrink-0 text-[#d4b499]" />
              <div>
                <h3 className="font-bold text-[#4a3221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#7d5a44]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection({ data }: { data: Record<string, unknown> }) {
  const individual = data.individual as { title: string; items: string[] } | undefined;
  const combined = data.combined as { title: string; items: string[] } | undefined;
  if (!individual || !combined) return null;
  return (
    <section className="bg-[#fbf6f3] py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl text-[#4a3221] md:text-5xl">{String(data.title)}</h2>
          {data.subtitle ? <p className="mt-4 text-[#7d5a44]">{String(data.subtitle)}</p> : null}
        </div>
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          {[individual, combined].map((col, idx) => (
            <div key={idx} className={`rounded-[2rem] border p-10 ${idx === 1 ? 'border-[#d4b499] bg-white shadow-lg' : 'border-[#d4b499]/20 bg-white/80'}`}>
              <h3 className="mb-8 font-serif text-2xl text-[#4a3221]">{col.title}</h3>
              <ul className="space-y-4">
                {col.items.map((line, i) => (
                  <li key={i} className="flex gap-3 text-sm font-medium text-[#7d5a44]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4b499]" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AftercareSection({ data }: { data: Record<string, unknown> }) {
  const first24h = data.first24h as { title: string; description: string }[] | undefined;
  const firstWeek = data.firstWeek as { title: string; description: string }[] | undefined;
  if (!first24h?.length && !firstWeek?.length) return null;
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="mb-16 text-center">
          <h2 className="font-serif text-4xl text-[#4a3221] md:text-5xl">{String(data.title)}</h2>
          {data.subtitle ? <p className="mt-4 text-[#7d5a44]">{String(data.subtitle)}</p> : null}
        </div>
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
          {first24h && first24h.length > 0 ? (
            <div className="rounded-[2rem] border border-[#d4b499]/20 bg-white p-10">
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">Primeras 24 h</p>
              <ul className="space-y-5">
                {first24h.map((item, i) => (
                  <li key={i}>
                    <p className="font-bold text-[#4a3221]">{item.title}</p>
                    <p className="mt-1 text-sm text-[#7d5a44]">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {firstWeek && firstWeek.length > 0 ? (
            <div className="rounded-[2rem] border border-[#d4b499]/20 bg-white p-10">
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">Primera semana</p>
              <ul className="space-y-5">
                {firstWeek.map((item, i) => (
                  <li key={i}>
                    <p className="font-bold text-[#4a3221]">{item.title}</p>
                    <p className="mt-1 text-sm text-[#7d5a44]">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ProcessAndDetailsSection({
  process,
  service,
  processImg,
}: {
  process: Record<string, unknown>;
  service: CategoryServicePair['service'];
  processImg: string;
}) {
  const steps = process.steps as { number: number; title: string; description: string }[] | undefined;
  const includes = process.includes as string[] | undefined;
  const rows = renderDetailsRows(service.details as Record<string, unknown>);

  return (
    <section id="detalles" className="container mx-auto scroll-mt-28 px-6 py-32 lg:px-24">
      <div className="grid items-center gap-20 lg:grid-cols-12">
        <div className="relative group lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-[0_40px_100px_rgba(74,50,33,0.1)]">
            <img src={processImg} alt={service.name} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          </div>
        </div>
        <div className="lg:col-span-6">
          <h2 className="mb-4 font-serif text-4xl tracking-tighter text-[#4a3221] uppercase md:text-6xl">{service.name}</h2>
          <div className="mb-10 flex items-center gap-6">
            <span className="font-serif text-3xl italic text-[#d4b499]">{formatServicePrice(service.price, service.currency)}</span>
            <div className="h-px flex-grow bg-[#d4b499]/30" />
          </div>
          <p className="mb-12 text-lg font-medium leading-relaxed text-[#4a3221] opacity-80">{service.description}</p>

          <div className="mb-10 space-y-6 border-t border-[#4a3221]/10 pt-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">Detalles del servicio</p>
            <ul className="space-y-4">
              {process.duration ? (
                <li className="flex items-baseline justify-between gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#7d5a44]">Duración sesión</span>
                  <div className="mb-1 flex-grow border-b border-dotted border-[#d4b499]/20" />
                  <span className="text-sm font-bold text-[#4a3221]">
                    {String(process.duration)} {process.durationUnit ? String(process.durationUnit) : ''}
                  </span>
                </li>
              ) : null}
              {rows.map((r, i) => (
                <li key={i} className="flex items-baseline justify-between gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#7d5a44]">{r.label}</span>
                  <div className="mb-1 flex-grow border-b border-dotted border-[#d4b499]/20" />
                  <span className="max-w-[55%] text-right text-sm font-bold text-[#4a3221]">{r.val}</span>
                </li>
              ))}
            </ul>
          </div>

          {includes && includes.length > 0 ? (
            <div className="mb-12 rounded-[2.5rem] border border-[#d4b499]/20 bg-white/50 p-10">
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#4a3221]">¿Qué incluye?</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {includes.map((t, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-[#7d5a44]">
                    <CheckCircle2 size={14} className="shrink-0 text-[#d4b499]" /> {t}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <LeadTrigger
            mode="booking"
            suggestedTreatments={[service.name]}
            className="inline-flex items-center gap-4 rounded-full bg-[#4a3221] px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-[#d4b499]"
          >
            Reservar tratamiento <ArrowRight size={16} />
          </LeadTrigger>
        </div>
      </div>

      {steps && steps.length > 0 ? (
        <div className="mt-32 rounded-[3rem] bg-[#4a3221] px-6 py-20 text-[#f7f0eb] lg:px-24">
          <div className="mb-16 text-center">
            <span className="mb-6 block text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">Metodología</span>
            <h3 className="font-serif text-4xl tracking-tighter uppercase md:text-6xl">{String(process.title)}</h3>
            {process.subtitle ? <p className="mt-4 text-sm font-medium opacity-70">{String(process.subtitle)}</p> : null}
          </div>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={i} className="group relative border-t border-white/10 pt-12 transition-colors hover:border-[#d4b499]">
                <span className="absolute -top-6 left-0 font-serif text-5xl italic text-[#d4b499] opacity-30">
                  {String(step.number).padStart(2, '0')}
                </span>
                <h4 className="mb-4 font-serif text-xl uppercase tracking-tight transition-colors group-hover:text-[#d4b499]">{step.title}</h4>
                <p className="text-sm font-medium leading-relaxed opacity-60">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function DetailsWithoutProcess({
  service,
}: {
  service: CategoryServicePair['service'];
}) {
  const rows = renderDetailsRows(service.details as Record<string, unknown>);
  return (
    <section id="detalles" className="container mx-auto scroll-mt-28 px-6 py-24 lg:px-24">
      <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-[#d4b499]/20 bg-white p-12 shadow-sm">
        <h2 className="mb-2 font-serif text-3xl text-[#4a3221] md:text-4xl">{service.name}</h2>
        <p className="mb-8 font-serif text-2xl italic text-[#d4b499]">{formatServicePrice(service.price, service.currency)}</p>
        <p className="mb-10 text-lg font-medium leading-relaxed text-[#7d5a44]">{service.description}</p>
        <p className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">Detalles</p>
        <ul className="mb-10 space-y-4">
          {rows.map((r, i) => (
            <li key={i} className="flex flex-col gap-1 border-b border-[#4a3221]/5 pb-4 last:border-0 sm:flex-row sm:justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-[#7d5a44]">{r.label}</span>
              <span className="text-sm font-bold text-[#4a3221] sm:max-w-[60%] sm:text-right">{r.val}</span>
            </li>
          ))}
        </ul>
        <LeadTrigger
          mode="booking"
          suggestedTreatments={[service.name]}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#4a3221] px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#f7f0eb] hover:bg-[#d4b499]"
        >
          Reservar por WhatsApp <ArrowRight size={16} />
        </LeadTrigger>
      </div>
    </section>
  );
}

function CtaSection({ data, serviceName }: { data: Record<string, unknown>; serviceName: string }) {
  return (
    <section className="relative overflow-hidden bg-[#f7f0eb] py-40 text-center">
      <div className="container relative z-10 mx-auto px-6">
        <h2 className="mb-6 font-serif text-5xl leading-none tracking-tighter text-[#4a3221] md:text-7xl">{String(data.title)}</h2>
        {data.subtitle ? <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-[#7d5a44]">{String(data.subtitle)}</p> : null}
        {data.tip ? <p className="mb-10 text-sm italic text-[#d4b499]">{String(data.tip)}</p> : null}
        {data.promise ? <p className="mb-10 text-sm font-bold text-[#4a3221]">{String(data.promise)}</p> : null}
        {data.highlight ? <p className="mb-10 font-serif text-xl text-[#d4b499]">{String(data.highlight)}</p> : null}
        <LeadTrigger
          mode="booking"
          suggestedTreatments={[serviceName]}
          className="inline-flex items-center gap-2 rounded-full bg-[#4a3221] px-14 py-6 text-xs font-black uppercase tracking-[0.3em] text-[#f7f0eb] shadow-2xl transition-colors hover:bg-[#d4b499]"
        >
          <MessageCircle size={18} /> WhatsApp
        </LeadTrigger>
      </div>
    </section>
  );
}

function renderSection(
  key: string,
  value: unknown,
  pair: CategoryServicePair,
  processImg: string,
): ReactNode {
  if (!isRecord(value)) return null;
  const service = pair.service;

  switch (key) {
    case 'benefits':
      return <BenefitsSection key={key} data={value} />;
    case 'problemSection':
      return <ProblemLikeSection key={key} data={value} variant="problem" />;
    case 'understandingSection':
      return <ProblemLikeSection key={key} data={value} variant="understanding" />;
    case 'expectations':
      return <ExpectationsSection key={key} data={value} />;
    case 'careInstructions':
      return <CareListsSection key={key} data={value} mode="care" />;
    case 'homecare':
      return <CareListsSection key={key} data={value} mode="home" />;
    case 'avoidSection':
      return <AvoidSection key={key} data={value} />;
    case 'comparison':
      return <ComparisonSection key={key} data={value} />;
    case 'aftercare':
      return <AftercareSection key={key} data={value} />;
    case 'process':
      return <ProcessAndDetailsSection key={key} process={value} service={service} processImg={processImg} />;
    case 'faq':
      if (!Array.isArray(value)) return null;
      return <ServiceFaqAccordion key={key} items={value as FaqItem[]} />;
    case 'cta':
      return <CtaSection key={key} data={value} serviceName={service.name} />;
    default:
      return null;
  }
}

export function ServiceDetailContent({ pair }: { pair: CategoryServicePair }) {
  const { service, categoryTitle } = pair;
  const pageUnknown = (service as { page?: unknown }).page;
  if (!isRecord(pageUnknown) || !isRecord(pageUnknown.hero)) {
    return <SimpleServiceFallback pair={pair} />;
  }

  const page = pageUnknown as Record<string, unknown>;
  const hero = page.hero as Record<string, string>;
  const heroImg = getServiceHeroImage(service.id);
  const processImg = getServiceProcessImage(service.id);
  const sectionKeys = Object.keys(page).filter((k) => k !== 'hero');

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f0eb] font-sans text-[#4a3221] selection:bg-[#d4b499] selection:text-white">
      <section className="relative flex min-h-[55vh] items-center justify-center pb-32 pt-48 text-center">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f0eb] via-[#f7f0eb]/95 to-[#f7f0eb]" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#d4b499]">{categoryTitle}</p>
          <div className="mx-auto mb-8 h-px w-24 bg-[#d4b499]" />
          <h1 className="font-serif text-5xl leading-none tracking-tight text-[#4a3221] md:text-[8.5rem]">
            {hero.title}
            <span className="font-script -mt-2 block text-4xl lowercase text-[#d4b499] md:-mt-8 md:text-9xl">{hero.titleHighlight}</span>
          </h1>
          <div className="mx-auto mt-8 mb-12 h-px w-24 bg-[#d4b499]" />
          {hero.subtitle ? (
            <p className="mx-auto max-w-2xl text-lg font-medium italic leading-relaxed tracking-wide text-[#7d5a44] text-balance md:text-2xl">
              &ldquo;{hero.subtitle}&rdquo;
            </p>
          ) : null}
          <div className="mt-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <LeadTrigger
              mode="booking"
              suggestedTreatments={[service.name]}
              className="rounded-full bg-[#4a3221] px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#f7f0eb] shadow-xl transition-all hover:bg-[#d4b499]"
            >
              Agendar mi cita
            </LeadTrigger>
            <a
              href="#detalles"
              className="rounded-full border border-[#4a3221]/20 px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all hover:bg-white"
            >
              Ver detalles
            </a>
          </div>
        </div>
      </section>

      {!sectionKeys.includes('process') ? <DetailsWithoutProcess service={service} /> : null}

      {sectionKeys.map((key) => renderSection(key, page[key], pair, processImg))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Montserrat:wght@400;500;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}</style>
    </div>
  );
}
