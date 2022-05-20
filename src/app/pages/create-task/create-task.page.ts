/* eslint-disable @typescript-eslint/naming-convention */
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SistemaService } from 'src/app/services/sistema.service';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
})
export class CreateTaskPage implements OnInit {

  tareaForm = this.fb.group({
    fecha: [new Date().toISOString().slice(0, 16), Validators.required],
    cliente: ['', Validators.required],
    sistema: ['', Validators.required],
    empleado: ['', Validators.required],
    descripcion: ['', Validators.required],
    estado : ['E']
  });


  public codigo: string;
  public clientes = null;
  public sistemas = null;
  public empleados = null;

  public fecha = '';

  constructor(private activatedRoute: ActivatedRoute,
    private tareaService: TareaService,
    private clienteService: ClienteService,
    private sistemaService: SistemaService,
    private empleadoService: EmpleadoService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController) { }


  ngOnInit() {

    this.obtenerTarea();
  }

  async guardarTarea() {

    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const tarea = this.tareaForm.value;
    const tmpTarea = {
      tra_numero: this.codigo === '0' ? null : Number(this.codigo),
      tra_fecha: `${tarea.fecha}:00Z`,
      tra_codsis: tarea.sistema,
      tra_codcli: tarea.cliente,
      tra_codemp: tarea.empleado,
      tra_descripcion: tarea.descripcion,
      tra_estado: tarea.estado,
    };

    this.tareaService.create(tmpTarea).subscribe(async (data: any) => {
      loading.dismiss();
      const message = data.success ? 'Tarea guardada con exito' : 'Error al guardar la Tarea. Intente de nuevo más tarde';
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();

      this.router.navigate(['/home/tasks']);

    });

  }

  async obtenerTarea() {

    this.obtenerClientes();
    this.obtenerSistemas();
    this.obteneEmpleados();

    this.codigo = this.activatedRoute.snapshot.params.id;

    //caso el codigo sea distinto a 0 hace la consulta a la bd
    if (this.codigo !== '0') {
      this.tareaService.getById(this.codigo).subscribe((data) => {
        if (data.success) {

          this.tareaForm.setValue({
            fecha: String(data.tarea.tra_fecha).substring(0, 16),
            cliente: data.tarea.tra_codcli,
            sistema: data.tarea.tra_codsis,
            empleado: data.tarea.tra_codemp,
            descripcion: data.tarea.tra_descripcion,
            estado: data.tarea.tra_estado,
          });
        }


      });
    }

  }

  private obtenerClientes() {
    this.clienteService.list().subscribe(data => {
      this.clientes = data.success ? data.clientes : null;
    });
  }

  private obtenerSistemas() {
    this.sistemaService.list().subscribe(data => {
      this.sistemas = data.success ? data.sistemas : null;
    });
  }

  private obteneEmpleados() {
    this.empleadoService.list().subscribe(data => {
      this.empleados = data.success ? data.empleados : null;
    });
  }

}
