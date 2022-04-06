import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {

  employees = null;

  constructor(private empleadoService: EmpleadoService,
    public loadingController: LoadingController) { }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.listarEmpleados();
  }


  private async listarEmpleados() {

    const loading = await this.loadingController.create({
      message: 'Consultando...',
    });
    await loading.present();


    this.empleadoService.list().subscribe(async (data) => {
      if (data.success) {
        this.employees = data.empleados;
      }
      await loading.dismiss();
    });
  }

}
