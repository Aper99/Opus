import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@capacitor/storage';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  configForm = this.fb.group({
    nombre: ['', Validators.required],
  });


  constructor(private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.obtenerConfiguraciones();
  }

  async obtenerConfiguraciones(){
    const token = await Storage.get({key: 'empresa-nombre'});
    this.configForm.setValue({
      nombre: token.value,
    });
  }

  async guardarConfiguraciones(){
    const loading = await this.loadingController.create({
      message: 'Guardando...',
    });
    await loading.present();
    const config = this.configForm.value;
    await Storage.set({key: 'empresa-nombre', value: config.nombre});
    this.obtenerConfiguraciones();
    await loading.dismiss();
    const toast = await this.toastController.create({
      message: 'Configuraciones Guardadas!!!',
      duration: 2000
    });
    await toast.present();
  }

}
