/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  // tarea = {
  //   numero: 81470,
  //   fecha: '21/12/2021',
  //   hora: '14:30',
  //   cliente: 'Empresa S.A',
  //   ruta: 'R2,6',
  //   sistema: 'Sistema 2',
  //   estado: 'Activo',
  //   // eslint-disable-next-line max-len
  //   descripcion: 'Este cliente tiene problemas con su impresora. Verificar si no le falta toner y comprar en caso de que sea necesario',
  // };

  tareaForm = this.fb.group({
    estado: [false],
    obs: [''],
  });

  public codigo: string;
  public tarea: any = null;

  constructor(private activatedRoute: ActivatedRoute,
    private tareaService: TareaService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {
    this.obtenerTarea();
  }

  async finalizarTarea() {
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const tarea = this.tareaForm.value;
    const tmpTarea = {
      tra_numero: this.codigo === '0' ? null : Number(this.codigo),
      tra_estado: 'F',
      tra_obs: tarea.obs,
    };

console.log(tmpTarea);
    this.tareaService.create(tmpTarea).subscribe(async (data: any) => {
      loading.dismiss();
      const message = data.success ? 'Tarea actualizada con exito' : 'Error al guardar la Tarea. Intente de nuevo más tarde';
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();

      this.router.navigate(['/home/tasks']);

    });
  }

  async obtenerTarea() {

    this.codigo = this.activatedRoute.snapshot.params.id;

    //caso el codigo sea distinto a 0 hace la consulta a la bd
    if (this.codigo !== '0') {
      this.tareaService.getById(this.codigo).subscribe((data) => {
        if (data.success) {
          this.tarea = data.tarea;

          this.tareaForm.setValue({
            estado: data.tarea.tra_estado === 'A',
            obs: data.tarea.tra_obs,
          });
        } else {
          this.tarea = null;
        }

      });
    }

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
