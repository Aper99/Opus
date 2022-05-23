/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.page.html',
  styleUrls: ['./create-route.page.scss'],
})
export class CreateRoutePage implements OnInit {

  rutaForm = this.fb.group({
    codigo: ['0', Validators.required],
    descripcion: ['', Validators.required],
  });


  public codigo: string;

  constructor(private activatedRoute: ActivatedRoute,
    private rutaService: RutaService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {

    this.obtenerRuta();
  }

  async guardarRuta() {

    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const ruta = this.rutaForm.value;
    const tmpRuta = {
      rut_codigo: this.codigo === '0' ? null : Number(this.codigo),
      rut_descripcion: ruta.descripcion,

    };


    this.rutaService.create(tmpRuta).subscribe(async (data: any) => {
      loading.dismiss();
      const message = data.success ? 'Ruta guardado con exito' : 'Error al guardar la Ruta. Intente de nuevo más tarde';
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();

      this.router.navigate(['/home/routes']);

    });
  }

  async eliminar() {

    const alert = await this.alertController.create({
      header: 'Eliminar Ruta',
      message: '¿Esta Seguro que desea eliminar la Ruta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
        }, {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: () => {
            this.rutaService.delete(this.codigo).subscribe( async (data: any) => {
              if(data.success){
                const toast = await this.toastController.create({
                  message: 'Eliminado con exito',
                  duration: 2000
                });
                toast.present();
                this.router.navigate(['/home/routes']);
              }else{
                const error = data.error;
                if (error === '23503'){
                  const toast = await this.toastController.create({
                    message: 'La Ruta es actualmente utilizada. No es posible eliminar',
                    duration: 2000
                  });
                  toast.present();
                }
              }

            });
          }
        }
      ]
    });

    await alert.present();



  }

  private async obtenerRuta() {


    this.codigo = this.activatedRoute.snapshot.params.id;

    //caso el codigo sea distinto a 0 hace la consulta a la bd
    if (this.codigo !== '0') {
      this.rutaService.getById(this.codigo).subscribe( (data) => {
        if (data.success) {

          this.rutaForm.setValue({
            codigo: data.ruta.rut_codigo,
            descripcion: data.ruta.rut_descripcion,
          });
        }

      });
    }

  }

}
