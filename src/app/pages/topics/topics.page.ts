import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.page.html',
  styleUrls: ['./topics.page.scss'],
})
export class TopicsPage implements OnInit {

  topics = null;

  constructor(private sistemaService: SistemaService,
    public loadingController: LoadingController) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.listarSistemas();
  }


  public async listarSistemas() {

    const loading = await this.loadingController.create({
      message: 'Consultando...',
    });
    await loading.present();


    this.sistemaService.list().subscribe(async (data) => {
      if (data.success) {
        this.topics = data.sistemas;
      }
      await loading.dismiss();
    });
  }
}
