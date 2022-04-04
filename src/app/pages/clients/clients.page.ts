import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {


  clients = null;

  constructor(private clienteService: ClienteService,
    public loadingController: LoadingController) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.listarClientes();
  }

  async listarClientes() {
    const loading = await this.loadingController.create({
      message: 'Consultando...',
    });
    await loading.present();

    this.clienteService.list().subscribe(data => {
      if (data.success) {
        this.clients = data.clientes;
      } else {
        this.clients = null;
      }
      loading.dismiss();


    });
  }

}
