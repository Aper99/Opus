import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  tarea = {
    numero: 81470,
    fecha: '21/12/2021',
    hora: '14:30',
    cliente: 'Empresa S.A',
    ruta: 'R2,6',
    sistema: 'Sistema 2',
    estado: 'Activo',
    // eslint-disable-next-line max-len
    descripcion: 'Este cliente tiene problemas con su impresora. Verificar si no le falta toner y comprar en caso de que sea necesario',
  };

  constructor() { }

  ngOnInit() {
  }

  colorEstado(estado: string): string {
    switch (estado) {
      case 'Activo':
        return 'success';
      case 'Cerrado':
        return 'danger';
      default:
        return 'light';
    }

  }
}
