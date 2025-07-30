import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'assets',
  standalone: true
})
export class AssetsPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${environment.assetsUrl}/${value}`;
  }

}
