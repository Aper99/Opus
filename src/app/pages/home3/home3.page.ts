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


  // tareas: Tarea[] = [
  //   {
  //     numero: 81470,
  //     fecha: '21/12/2021',
  //     hora: '14:30',
  //     cliente: 'Empresa S.A',
  //     ruta: 'R2,6',
  //     sistema: 'Sistema 2',
  //     estado: 'Activo',
  //     // eslint-disable-next-line max-len
  //     descripcion: 'Este cliente tiene problemas con su impresora. Verificar si no le falta toner y comprar en caso de que sea necesario',
  //   },
  //   {
  //     numero: 75796,
  //     fecha: '02/09/2021',
  //     hora: '14:10',
  //     cliente: 'Informatica S.A',
  //     ruta: '',
  //     sistema: 'Tareas Tecnicas',
  //     estado: 'Inactivo',
  //     // eslint-disable-next-line max-len
  //     descripcion: 'Verificacion del estado de los servidores',
  //   },
  //   {
  //     numero: 81475,
  //     fecha: '21/12/2021',
  //     hora: '14:30',
  //     cliente: 'Fabrica de Colchones',
  //     ruta: 'R7',
  //     sistema: 'Programacion',
  //     estado: 'Finalizado',
  //     // eslint-disable-next-line max-len
  //     descripcion: 'Crear un reporte de las ventas del mes',
  //   }
  // ];

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

    this.tareaService.list().subscribe(data => {
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



