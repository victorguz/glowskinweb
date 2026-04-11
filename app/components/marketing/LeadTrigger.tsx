'use client';

import { useLeadForms } from './LeadFormsProvider';

type Props = {
  mode: 'booking' | 'contact';
  className?: string;
  children: React.ReactNode;
  suggestedTreatments?: string[];
};

export function LeadTrigger({ mode, className, children, suggestedTreatments }: Props) {
  const { openBooking, openContact } = useLeadForms();
  return (
    <button
      type="button"
      className={className}
      onClick={() => (mode === 'booking' ? openBooking(suggestedTreatments) : openContact())}
    >
      {children}
    </button>
  );
}
