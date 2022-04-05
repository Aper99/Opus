/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.page.html',
  styleUrls: ['./topic.page.scss'],
})
export class TopicPage implements OnInit {

  sistemaForm = this.fb.group({
    descripcion: ['', Validators.required],
  });

  public codigo: string;

  constructor(private activatedRoute: ActivatedRoute,
    private sistemaService: SistemaService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController) { }

  ngOnInit() {
    this.obtenerSistema();
  }

  public async guardarSistema(){
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const sistema = this.sistemaForm.value;
    const tmpSistema = {
      sis_codigo: this.codigo === '0' ? null : Number(this.codigo),
      sis_descripcion: sistema.descripcion,
    };


    this.sistemaService.create(tmpSistema).subscribe(async (data: any) => {
      const message = data.success ? 'Sistema guardado con exito' : 'Error al guardar el sistema. Intente de nuevo más tarde';
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      loading.dismiss();
      toast.present();

      this.router.navigate(['/topics']);

    });
  };

  private async obtenerSistema() {

    this.codigo = this.activatedRoute.snapshot.params.id;

    //caso el codigo sea distinto a 0 hace la consulta a la bd
    if (this.codigo !== '0') {
      this.sistemaService.getById(this.codigo).subscribe( (data) => {
        if (data.success) {

          this.sistemaForm.setValue({
            descripcion: data.sistema.sis_descripcion,
          });
        }

      });
    }

  }



}
