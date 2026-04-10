import type { LucideIcon } from 'lucide-react';
import {
  Ban,
  CheckCircle2,
  Droplets,
  FlaskConical,
  Flower2,
  Heart,
  Leaf,
  RefreshCw,
  Shield,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  TrendingDown,
  Zap,
  AlertTriangle,
  Flame,
  CircleX,
  ListChecks,
  Stethoscope,
  CircleDot,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  flash: Zap,
  heart: Heart,
  'checkmark-circle': CheckCircle2,
  water: Droplets,
  flower: Flower2,
  leaf: Leaf,
  snow: Snowflake,
  shield: Shield,
  ban: Ban,
  warning: AlertTriangle,
  flame: Flame,
  'close-circle': CircleX,
  flask: FlaskConical,
  refresh: RefreshCw,
  sparkles: Sparkles,
  'trending-down': TrendingDown,
  star: Star,
  'shield-checkmark': ShieldCheck,
  medical: Stethoscope,
  'checkmark-done': ListChecks,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = MAP[name] ?? CircleDot;
  return <Icon className={className} strokeWidth={1.25} />;
}
