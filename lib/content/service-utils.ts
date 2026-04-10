import { SERVICES_DATA } from '@/lib/content/services';

export type CategoryServicePair = {
  categoryId: string;
  categoryTitle: string;
  service: (typeof SERVICES_DATA.categories)[number]['services'][number];
};

export function getAllCategoryServices(): CategoryServicePair[] {
  const out: CategoryServicePair[] = [];
  for (const cat of SERVICES_DATA.categories) {
    for (const service of cat.services) {
      out.push({
        categoryId: cat.id,
        categoryTitle: cat.title,
        service,
      });
    }
  }
  return out;
}

export function getServiceBySlug(slug: string): CategoryServicePair | null {
  return getAllCategoryServices().find(({ service }) => service.id === slug) ?? null;
}

export function getAllServiceSlugs(): string[] {
  return getAllCategoryServices().map(({ service }) => service.id);
}

function cop(n: number): string {
  return `$ ${n.toLocaleString('es-CO')}`;
}

export function formatServicePrice(price: number, currency: string): string {
  if (currency === 'COP') return cop(price);
  return `${price} ${currency}`;
}
