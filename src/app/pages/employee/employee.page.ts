/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

  empleadoForm = this.fb.group({
    nombre: ['', Validators.required],
    ci: [''],
    telefono: [''],
    direccion: [''],
    email: ['', [Validators.email,Validators.required]],
    password: ['', Validators.required],
  });


  public codigo: string;

  constructor(private activatedRoute: ActivatedRoute,
    private empleadoService: EmpleadoService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {

    this.obtenerEmpleados();
  }

  async guardarEmpleado() {

    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const empleado = this.empleadoForm.value;
    const tmpEmpleado = {
      emp_codigo: this.codigo === '0' ? null : Number(this.codigo),
      emp_nombre: empleado.nombre,
      emp_ci: empleado.ci,
      emp_telefono: empleado.telefono,
      emp_direccion: empleado.direccion,
      emp_email: empleado.email,
      emp_password: empleado.password,
    };


    this.empleadoService.create(tmpEmpleado).subscribe(async (data: any) => {
      loading.dismiss();
      const message = data.success ? 'Empleado guardado con exito' : 'Error al guardar el empleado. Intente de nuevo más tarde';
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();

      this.router.navigate(['/employees']);

    });
  }

  async eliminar() {

    const alert = await this.alertController.create({
      header: 'Eliminar Empleado',
      message: '¿Esta Seguro que desea eliminar el empleado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
        }, {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: () => {
            this.empleadoService.delete(this.codigo).subscribe( async (data: any) => {
              if(data.success){
                const toast = await this.toastController.create({
                  message: 'Eliminado con exito',
                  duration: 2000
                });
                toast.present();
                this.router.navigate(['/employees']);
              }else{
                const error = data.error;
                if (error === '23503'){
                  const toast = await this.toastController.create({
                    message: 'El empleado es actualmente utilizado. No es posible eliminar',
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

  private async obtenerEmpleados() {


    this.codigo = this.activatedRoute.snapshot.params.id;

    //caso el codigo sea distinto a 0 hace la consulta a la bd
    if (this.codigo !== '0') {
      this.empleadoService.getById(this.codigo).subscribe( (data) => {
        if (data.success) {

          this.empleadoForm.setValue({
            nombre: data.empleado.emp_nombre,
            ci: data.empleado.emp_ci,
            telefono: data.empleado.emp_telefono,
            direccion: data.empleado.emp_direccion,
            email: data.empleado.emp_email,
            password: data.empleado.emp_password,
          });
        }

      });
    }

  }


}
