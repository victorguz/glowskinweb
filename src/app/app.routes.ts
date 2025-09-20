import { Routes } from '@angular/router';

import { ServiceIds } from './constants/services';
import { CasosRealesComponent } from './pages/casos-reales/casos-reales.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { ServiceTemplateComponent } from './pages/servicios/service-template/service-template.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, children: [] },
  { path: 'home', component: HomeComponent },
  { path: 'precios', component: PreciosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'casos-reales', component: CasosRealesComponent },
  // Service routes using template
  {
    path: 'servicios/:id',
    component: ServiceTemplateComponent,
  },
  {
    path: ServiceIds.LIMPIEZA_FACIAL,
    component: ServiceTemplateComponent,
    data: {
      serviceId: ServiceIds.LIMPIEZA_FACIAL,
    },
  },
  {
    path: ServiceIds.LIMPIEZA_FACIAL_ANTI_ACNE,
    component: ServiceTemplateComponent,
    data: {
      serviceId: ServiceIds.LIMPIEZA_FACIAL_ANTI_ACNE,
    },
  },
  {
    path: ServiceIds.LIMPIEZA_FACIAL_PIELES_SENSIBLES,
    component: ServiceTemplateComponent,
    data: {
      serviceId: ServiceIds.LIMPIEZA_FACIAL_PIELES_SENSIBLES,
    },
  },
  // { path: 'blog', component: BlogComponent },
  // Dynamic routes - these will be handled by the components themselves
  // { path: 'blog/:slug', component: BlogComponent },
  // { path: 'blog-post/:id', component: BlogComponent },
  // Placeholder routes for future implementation
  { path: 'agendar', component: HomeComponent }, // Redirect to home for now
  { path: 'confirmacion-pago', component: HomeComponent }, // Redirect to home for now
  { path: '**', redirectTo: '' },
];
