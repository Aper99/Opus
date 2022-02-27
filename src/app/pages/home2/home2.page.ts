import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {

  tareas: Tarea[] = [
    {
      numero: 81470,
      fecha: '21/12/2021',
      hora: '14:30',
      cliente: 'Fer Buen Amigo',
      ruta: 'R2,6',
      sistema: 'BARIS',
      estado: 'Cerrado',
      // eslint-disable-next-line max-len
      descripcion: 'Este cliente imprime su informe en matricial, entonces moleta ese fondo gris que tiene nuestro informe de cuenta. Verificar para colocar una configuracion si es que quiere que no aparezca zebrado los informes',
    },
    {
      numero: 75796,
      fecha: '02/09/2021',
      hora: '14:10',
      cliente: 'JHF Informatica',
      ruta: '',
      sistema: 'Tareas Tecnicas',
      estado: 'Activo',
      // eslint-disable-next-line max-len
      descripcion: 'Este cliente imprime su informe en matricial, entonces moleta ese fondo gris que tiene nuestro informe de cuenta. Verificar para colocar una configuracion si es que quiere que no aparezca zebrado los informes',
    },
    {
      numero: 81475,
      fecha: '21/12/2021',
      hora: '14:30',
      cliente: 'Rigmar Fabrica',
      ruta: 'R7',
      sistema: 'Programacion',
      estado: 'Cerrado',
      // eslint-disable-next-line max-len
      descripcion: 'Este cliente imprime su informe en matricial, entonces moleta ese fondo gris que tiene nuestro informe de cuenta. Verificar para colocar una configuracion si es que quiere que no aparezca zebrado los informes',
    }
  ];


  constructor() {

  }
  ngOnInit(): void {

  }

}

interface Tarea {
  numero: number;
  fecha: string;
  hora: string;
  cliente: string;
  ruta: string;
  sistema: string;
  estado: string;
  descripcion: string;
}
