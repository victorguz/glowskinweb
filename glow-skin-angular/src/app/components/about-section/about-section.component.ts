import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
})
export class AboutSectionComponent {
  @Input() title: string = 'Sobre Glow Skin';
  @Input() subtitle: string = '';
  @Input() description: string =
    'Glow Skin es un espacio creado para cuidar, sanar y transformar. Aquí no solo buscamos la piel, también restauramos la confianza y el bienestar de cada uno de nuestros pacientes.';
  @Input() specialistName: string = 'Sofia Nieto';
  @Input() specialistTitle: string =
    'especialista en Cosmetología y Cosmiatría';
  @Input() specialistDescription: string =
    'estoy comprometida con un servicio basado en el cuidado, el conocimiento y el profesionalismo.';
  @Input() finalMessage: string =
    'En Glow Skin, cada tratamiento es personalizado y pensado para ayudarte a alcanzar la mejor versión de ti.';
  @Input() imageSrc: string =
    'assets/images/sofia/sofia nieto glow skin bq.png';
  @Input() imageAlt: string =
    'Retrato de Sofia Nieto, especialista de Glow Skin';
  @Input() reverseLayout: boolean = false;
}
