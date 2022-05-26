import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuarioForm: FormGroup;

  constructor(private usuarioService: UsuarioService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController) {

    this.usuarioForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      passwd: ['', Validators.required],
      passwdc: ['', Validators.required],
    });

  }

  ionViewWillEnter() {
    this.usuarioForm.reset();
  }

  ngOnInit() {
  }

  async guardarUsuario() {

    //validar que las contraseñas coincidan
    const usuario = this.usuarioForm.value;

    if (usuario.passwd !== usuario.passwdc) {
      const alert = await this.alertController.create({
        message: 'Las Contraseñas no coinciden'
      });
      alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const tmpUsuario = {
      name: usuario.name,
      email: usuario.email,
      passwd: usuario.passwd,
    };


    this.usuarioService.create(tmpUsuario).subscribe(async (data: any) => {
      loading.dismiss();
      const message = data.success ? 'Usuario guardado con exito' : 'Error al guardar el usuario. Intente de nuevo más tarde';
      const toast = await this.toastController.create({
        message,
        duration: 2000
      });
      toast.present();

      this.router.navigate(['/']);

    });
  }

}
