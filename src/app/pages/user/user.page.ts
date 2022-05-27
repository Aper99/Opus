import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  usuarioForm = this.fb.group({
    email: ['', Validators.required],
    name: ['', Validators.required],
    passwd: ['', Validators.required],
  });

  public user = null;
  private helper = new JwtHelperService();
  private codigo: string = null;
  constructor(private authService: AuthenticationService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    public alertController: AlertController) { }



  ngOnInit() {
  }

  ionViewWillEnter(){
    const decodedToken = this.helper.decodeToken(this.authService.getToken());
    this.user = decodedToken;
    this.obtenerUsuario();
  }

  async guardarUsuario() {

    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();

    const usuario = this.usuarioForm.value;
    const tmpUsuario = {
      id: this.codigo === '0' ? null : Number(this.codigo),
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

  private async obtenerUsuario() {


    this.codigo = this.user.id;

    //caso el codigo sea distinto a 0 hace la consulta a la bd
    if (this.codigo !== '0') {
      this.usuarioService.getById(this.codigo).subscribe( (data) => {
        if (data.success) {
          this.usuarioForm.setValue({
            email: data.usuario.email,
            passwd: data.usuario.passwd,
            name: data.usuario.name,
          });
        }

      });
    }

  }

}
