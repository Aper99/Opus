/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthenticationService, TOKEN_KEY } from 'src/app/services/authentication.service';
import { TareaService } from 'src/app/services/tarea.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-home3',
  templateUrl: './home3.page.html',
  styleUrls: ['./home3.page.scss'],
})
export class Home3Page implements OnInit {

  estado = 'all';
  tareas = null;
  subscription: Subscription;
  public user = null;
  private helper = new JwtHelperService();

  constructor(private tareaService: TareaService,
    private authService: AuthenticationService,
    private router: Router,
    public loadingController: LoadingController) { }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();

    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/home/tasks') {
        this.onEnter();
      }
    });
  }

  public async onEnter(): Promise<void> {
    const token = await Storage.get({key: TOKEN_KEY});
    const decodedToken = this.helper.decodeToken(token.value);
    this.user = decodedToken;
    this.listarTareas();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  async listarTareas() {
    const loading = await this.loadingController.create({
      message: 'Consultando...',
    });
    await loading.present();

    const tmpEstado = this.estado === 'all' ? null : this.estado;
    const tmpUsuario = this.user && this.user.id ? this.user.id : null;

    this.tareaService.list(tmpEstado,tmpUsuario).subscribe(data => {
      if (data.success) {
        this.tareas = data.tareas;
      } else {
        this.tareas = null;
      }
      loading.dismiss();


    });
  }

  colorEstado(estado: string): string {
    switch (estado) {
      case 'A':
        return 'success';
      case 'F':
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



