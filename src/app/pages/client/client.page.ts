/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

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


  private codigo: string;

  constructor(private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router) { }

  ngOnInit() {


    this.codigo = this.activatedRoute.snapshot.params.id;

    //caso el codigo sea distinto a 0 hace la consulta a la bd
    if (this.codigo !== '0') {
      this.clienteService.getById(this.codigo).subscribe(data => {
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

  async guardarCliente() {

    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const cliente = this.clienteForm.value;
    const tmpCliente = {
    cli_codigo : this.codigo === '0' ? null : Number(this.codigo),
    cli_nombre: cliente.nombre,
    cli_rucci: cliente.ci,
    cli_telefono: cliente.telefono,
    cli_email: cliente.email,
    cli_direccion: cliente.direccion,
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


}


