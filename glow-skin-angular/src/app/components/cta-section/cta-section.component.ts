import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.scss',
})
export class CtaSectionComponent {
  @Input() title: string = '¿Qué esperas para devolverle el Glow a tu Piel?';
  @Input() buttonText: string = 'Agenda tu cita hoy';
  @Input() buttonUrl: string = 'https://wa.link/h5481r';
  @Input() buttonStyle: 'primary' | 'secondary' = 'primary';
  @Input() showUnderline: boolean = true;
  @Input() underlineText: string = 'devolverle el Glow a tu Piel';
}
