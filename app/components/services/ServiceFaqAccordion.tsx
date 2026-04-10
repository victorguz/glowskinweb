'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export type FaqItem = { question: string; answer: string };

export function ServiceFaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-40 bg-white">
      <div className="container mx-auto max-w-4xl px-6 lg:px-24">
        <div className="mb-24 text-center">
          <h2 className="mb-4 font-serif text-4xl tracking-tighter text-[#4a3221] uppercase md:text-6xl">
            Preguntas frecuentes
          </h2>
          <div className="mx-auto h-px w-16 bg-[#d4b499]" />
        </div>
        <div className="space-y-0">
          {items.map((faq, i) => (
            <div key={i} className="border-b border-[#4a3221]/10">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="group flex w-full items-center justify-between py-10 text-left"
              >
                <h3
                  className={`font-serif text-xl transition-colors ${
                    open === i ? 'italic text-[#d4b499]' : 'text-[#4a3221]'
                  }`}
                >
                  {faq.question}
                </h3>
                <span className="ml-4 shrink-0">
                  {open === i ? (
                    <Minus size={20} className="text-[#d4b499]" />
                  ) : (
                    <Plus size={20} className="opacity-30 transition-opacity group-hover:opacity-100" />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  open === i ? 'max-h-[480px] pb-10' : 'max-h-0'
                }`}
              >
                <p className="max-w-2xl text-lg font-medium leading-relaxed text-[#7d5a44]">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
