import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {


  clients =[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {

    this.clienteService.list().subscribe(data => {
      if (data.success){
        this.clients = data.clientes;
      }else{
        this.clients = [];
      }


    });
  }

}
