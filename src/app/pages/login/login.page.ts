/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials = this.fb.group({
    username: ['', Validators.required],
    password: ['',Validators.required],
  });

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) =>{
        await loading.dismiss();
        this.router.navigate(['/home']);
      },
      async (res) =>{
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error al iniciar sesion',
          message: res.error.error,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  get username(){
    return this.credentials.get('username');
  }

  get password(){
    return this.credentials.get('password');
  }

}
