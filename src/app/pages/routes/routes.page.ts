import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {

  // rutas = [
  //   {
  //     nombre: 'Ruta 1',
  //     clientes : [{nombre: 'Local 1'},{nombre: 'Empresa 3'},{nombre: 'Comercial 9'}]
  //   },
  //   {
  //     nombre: 'Ruta 2',
  //     clientes : [{nombre: 'Local 12'},{nombre: 'Empresa 8'},{nombre: 'Comercial 2'}]
  //   },
  //   {
  //     nombre: 'Ruta 3',
  //     clientes : [{nombre: 'Local 4'},{nombre: 'Empresa 7'},{nombre: 'Comercial 5'}]
  //   },
  // ];

  rutas = null;

  constructor(private rutaService: RutaService,
              public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.listarRutas();
  }

  async listarRutas() {
    const loading = await this.loadingController.create({
      message: 'Consultando...',
    });
    await loading.present();

    this.rutaService.listGroup().subscribe(data => {
      console.log(data.rutas);
      if (data.success) {
        this.rutas = data.rutas;
      } else {
        this.rutas = null;
      }
      loading.dismiss();


    });
  }

}
