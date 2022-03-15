import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home3',
  templateUrl: './home3.page.html',
  styleUrls: ['./home3.page.scss'],
})
export class Home3Page implements OnInit {


  tareas: Tarea[] = [
    {
      numero: 81470,
      fecha: '21/12/2021',
      hora: '14:30',
      cliente: 'Empresa S.A',
      ruta: 'R2,6',
      sistema: 'Sistema 2',
      estado: 'Activo',
      // eslint-disable-next-line max-len
      descripcion: 'Este cliente tiene problemas con su impresora. Verificar si no le falta toner y comprar en caso de que sea necesario',
    },
    {
      numero: 75796,
      fecha: '02/09/2021',
      hora: '14:10',
      cliente: 'Informatica S.A',
      ruta: '',
      sistema: 'Tareas Tecnicas',
      estado: 'Inactivo',
      // eslint-disable-next-line max-len
      descripcion: 'Verificacion del estado de los servidores',
    },
    {
      numero: 81475,
      fecha: '21/12/2021',
      hora: '14:30',
      cliente: 'Fabrica de Colchones',
      ruta: 'R7',
      sistema: 'Programacion',
      estado: 'Finalizado',
      // eslint-disable-next-line max-len
      descripcion: 'Crear un reporte de las ventas del mes',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  colorEstado(estado: string): string{
  switch (estado) {
    case 'Activo':
      return 'success';
    case 'Finalizado':
        return 'danger';
    default:
      return 'light';
  }
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



