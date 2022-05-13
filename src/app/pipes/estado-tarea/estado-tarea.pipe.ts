import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTarea'
})
export class EstadoTareaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'A':
        return 'Activo';
      case 'F':
          return 'Finalizado';
      case 'P':
          return 'Pausado';
      default:
        return 'sin estado';
    }
  }

}
