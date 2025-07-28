import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NosotrosComponent {
  // Información de contacto
  contactInfo = {
    whatsapp: 'https://wa.link/h5481r',
  };
}
