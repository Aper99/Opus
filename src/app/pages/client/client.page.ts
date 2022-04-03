/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private router: ActivatedRoute, private clienteService: ClienteService, private fb: FormBuilder) { }

  ngOnInit() {


    this.codigo = this.router.snapshot.params.id;

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

  guardarCliente() {
    const cliente = this.clienteForm.value;
    const tmpCliente = {
    cli_codigo : cliente.codigo === '0' ? null : Number(this.codigo),
    cli_nombre: cliente.nombre,
    cli_rucci: cliente.ci,
    cli_telefono: cliente.telefono,
    cli_email: cliente.email,
    cli_direccion: cliente.direccion,
    };

    this.clienteService.create(tmpCliente).subscribe(data => console.log(data));
  }


}


