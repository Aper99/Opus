/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-home3',
  templateUrl: './home3.page.html',
  styleUrls: ['./home3.page.scss'],
})
export class Home3Page implements OnInit {

  estado = 'all';
  tareas = null;
  subscription: Subscription;

  constructor(private tareaService: TareaService,
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

    this.tareaService.list(tmpEstado).subscribe(data => {
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



