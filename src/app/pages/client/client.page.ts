/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/cliente.service';
import { RutaService } from 'src/app/services/ruta.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  clienteForm = this.fb.group({
    nombre: ['', Validators.required],
    ci: [''],
    telefono: [''],
    email: ['', Validators.email],
    direccion: [''],
    ruta: [''],
  });


  public codigo: string;
  public rutas: any = null;

  constructor(private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private rutaService: RutaService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {

    this.obtenerCliente();
  }

  async guardarCliente() {

    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const cliente = this.clienteForm.value;
    const tmpCliente = {
      cli_codigo: this.codigo === '0' ? null : Number(this.codigo),
      cli_nombre: cliente.nombre,
      cli_rucci: cliente.ci,
      cli_telefono: cliente.telefono,
      cli_email: cliente.email,
      cli_direccion: cliente.direccion,
      cli_codrut: cliente.ruta,
    };


    this.clienteService.create(tmpCliente).subscribe(async (data: any) => {
      loading.dismiss();
      const message = data.success ? 'Cliente guardado con exito' : 'Error al guardar el cliente. Intente de nuevo más tarde';
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();

      this.router.navigate(['/clients']);

    });
  }

  async eliminar() {

    const alert = await this.alertController.create({
      header: 'Eliminar Cliente',
      message: '¿Esta Seguro que desea eliminar el cliente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
        }, {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: () => {
            this.clienteService.delete(this.codigo).subscribe( async (data: any) => {
              if(data.success){
                const toast = await this.toastController.create({
                  message: 'Eliminado con exito',
                  duration: 2000
                });
                toast.present();
                this.router.navigate(['/clients']);
              }else{
                const error = data.error;
                if (error === '23503'){
                  const toast = await this.toastController.create({
                    message: 'El cliente es actualmente utilizado. No es posible eliminar',
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

  private async obtenerCliente() {

    this.obtenerRutas();

    this.codigo = this.activatedRoute.snapshot.params.id;

    //caso el codigo sea distinto a 0 hace la consulta a la bd
    if (this.codigo !== '0') {
      this.clienteService.getById(this.codigo).subscribe( (data) => {
        if (data.success) {

          this.clienteForm.setValue({
            nombre: data.cliente.cli_nombre,
            ci: data.cliente.cli_rucci,
            telefono: data.cliente.cli_telefono,
            email: data.cliente.cli_email,
            direccion: data.cliente.cli_direccion,
            ruta: data.cliente.cli_codrut,
          });
        }

      });
    }

  }

  private obtenerRutas() {
    this.rutaService.list().subscribe(data => {
      this.rutas = data.success ? data.rutas : null;
    });
  }


}


