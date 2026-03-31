import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

export interface CasoReal {
  id: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-casos-reales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './casos-reales.component.html',
  styleUrl: './casos-reales.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CasosRealesComponent {
  @Input() title: string = 'Casos Reales';
  @Input() subtitle: string =
    'Fotos reales de nuestros pacientes que ya están luciendo una piel Glow Skin.';
  @Input() description: string = 'Compruébalo tú mismo';
  @Input() casos: CasoReal[] = [];

  selectedCaso: CasoReal | null = null;
  isFullscreen = false;
  environment = environment;

  openFullscreen(caso: CasoReal) {
    this.selectedCaso = caso;
    this.isFullscreen = true;
    document.body.style.overflow = 'hidden';
  }

  closeFullscreen() {
    this.selectedCaso = null;
    this.isFullscreen = false;
    document.body.style.overflow = 'auto';
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeFullscreen();
    }
  }
}
