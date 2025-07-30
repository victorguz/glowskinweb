import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsPipePipe } from '../../pipes/assets-pipe.pipe';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, AssetsPipePipe],
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {}
