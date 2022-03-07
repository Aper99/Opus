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
    cliente: 'Fer Buen Amigo',
    ruta: 'R2,6',
    sistema: 'BARIS',
    estado: 'Activo',
    // eslint-disable-next-line max-len
    descripcion: 'Este cliente imprime su informe en matricial, entonces moleta ese fondo gris que tiene nuestro informe de cuenta. Verificar para colocar una configuracion si es que quiere que no aparezca zebrado los informes',
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
