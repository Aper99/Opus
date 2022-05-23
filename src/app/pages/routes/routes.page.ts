import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.page.html',
  styleUrls: ['./routes.page.scss'],
})
export class RoutesPage implements OnInit {



  rutas = null;
  subscription: Subscription;

  constructor(private rutaService: RutaService,
    public loadingController: LoadingController,
    public router: Router) { }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/home/routes') {
        this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    this.listarRutas();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  async listarRutas() {
    const loading = await this.loadingController.create({
      message: 'Consultando...',
    });
    await loading.present();

    this.rutaService.listGroup().subscribe(data => {
      if (data.success) {
        this.rutas = data.rutas;
      } else {
        this.rutas = null;
      }
      loading.dismiss();


    });
  }

}
