import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {

  rutas = [
    {
      nombre: 'Ruta 1',
      clientes : [{nombre: 'Local 1'},{nombre: 'Empresa 3'},{nombre: 'Comercial 9'}]
    },
    {
      nombre: 'Ruta 2',
      clientes : [{nombre: 'Local 12'},{nombre: 'Empresa 8'},{nombre: 'Comercial 2'}]
    },
    {
      nombre: 'Ruta 3',
      clientes : [{nombre: 'Local 4'},{nombre: 'Empresa 7'},{nombre: 'Comercial 5'}]
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
