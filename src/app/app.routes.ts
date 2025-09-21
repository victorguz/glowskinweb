import { Routes } from '@angular/router';

import { BlogIds, BlogRoutes } from './constants/blogs';
import { ServiceIds } from './constants/services';
import { BlogPostComponent } from './pages/blog/blog-post/blog-post.component';
import { BlogComponent } from './pages/blog/blog.component';
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
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogPostComponent },

  // Blog routes - Static routes for SEO
  {
    path: BlogRoutes.EXOSOMAS_FACIALES_REVOLUCION,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.EXOSOMAS_FACIALES_REVOLUCION,
    },
  },
  {
    path: BlogRoutes.PDRN_PODER_REGENERATIVO,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.PDRN_PODER_REGENERATIVO,
    },
  },
  {
    path: BlogRoutes.CUIDADOS_POST_TRATAMIENTO,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.CUIDADOS_POST_TRATAMIENTO,
    },
  },
  {
    path: BlogRoutes.MICRONEEDLING_VS_OTROS,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.MICRONEEDLING_VS_OTROS,
    },
  },
  {
    path: BlogRoutes.GUIA_PREPARAR_PIEL,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.GUIA_PREPARAR_PIEL,
    },
  },
  {
    path: BlogRoutes.BENEFICIOS_MICRONEEDLING,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.BENEFICIOS_MICRONEEDLING,
    },
  },
  {
    path: BlogRoutes.ACNE_ADULTO,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.ACNE_ADULTO,
    },
  },
  {
    path: BlogRoutes.PORCELANIZACION_FACIAL,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.PORCELANIZACION_FACIAL,
    },
  },
  {
    path: BlogRoutes.RUTINA_CUIDADO_FACIAL,
    component: BlogPostComponent,
    data: {
      blogId: BlogIds.RUTINA_CUIDADO_FACIAL,
    },
  },

  // Legacy blog routes for compatibility (redirects)
  { path: 'agendar', component: HomeComponent }, // Redirect to home for now
  { path: 'confirmacion-pago', component: HomeComponent }, // Redirect to home for now

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

  { path: '**', redirectTo: '' },
];
