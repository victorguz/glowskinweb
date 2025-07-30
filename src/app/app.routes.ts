import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PreciosComponent } from './pages/precios/precios.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { CasosRealesComponent } from './pages/casos-reales/casos-reales.component';
import { BlogComponent } from './pages/blog/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'precios', component: PreciosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'casos-reales', component: CasosRealesComponent },
  { path: 'blog', component: BlogComponent },
  // Dynamic routes - these will be handled by the components themselves
  { path: 'blog/:slug', component: BlogComponent },
  { path: 'blog-post/:id', component: BlogComponent },
  // Placeholder routes for future implementation
  { path: 'agendar', component: HomeComponent }, // Redirect to home for now
  { path: 'confirmacion-pago', component: HomeComponent }, // Redirect to home for now
  { path: '**', redirectTo: '' },
];
