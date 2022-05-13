import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Home3PageRoutingModule } from './home3-routing.module';
import { EstadoTareaModule } from 'src/app/pipes/estado-tarea/estado-tarea.module';


import { Home3Page } from './home3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Home3PageRoutingModule,
    EstadoTareaModule
  ],
  declarations: [Home3Page]
})
export class Home3PageModule {}
