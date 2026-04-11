import type { ReactNode } from 'react';
import type { EnrichedPricingItem } from '@/lib/content/pricing-enriched';

export function ProcedureDetailsCard({
  item,
  reserveSlot,
}: {
  item: EnrichedPricingItem;
  reserveSlot?: ReactNode;
}) {
  return (
    <div className="w-full rounded-2xl border border-[#d4b499]/30 bg-white/55 px-5 py-4 text-left">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4b499] mb-3">
        Qué incluye el procedimiento
      </p>
      <dl className="space-y-2 text-sm text-[#4a3221]">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
          <dt className="shrink-0 font-bold text-[#7d5a44]">Sesiones</dt>
          <dd className="font-medium">{item.sessionsSummary}</dd>
        </div>
        {item.durationSummary ? (
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="shrink-0 font-bold text-[#7d5a44]">Duración</dt>
            <dd className="font-medium">{item.durationSummary}</dd>
          </div>
        ) : null}
        {item.frequencySummary ? (
          <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
            <dt className="shrink-0 font-bold text-[#7d5a44]">Frecuencia</dt>
            <dd className="font-medium">{item.frequencySummary}</dd>
          </div>
        ) : null}
      </dl>
      {item.includes.length > 0 ? (
        <ul className="mt-4 space-y-1.5 text-sm text-[#7d5a44] leading-relaxed list-disc pl-5">
          {item.includes.map((line, li) => (
            <li key={li}>{line}</li>
          ))}
        </ul>
      ) : null}
      {reserveSlot ? (
        <div className="mt-6 flex justify-center border-t border-[#d4b499]/25 pt-5">
          {reserveSlot}
        </div>
      ) : null}
    </div>
  );
}
