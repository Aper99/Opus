import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskPageRoutingModule } from './task-routing.module';

import { TaskPage } from './task.page';
import { EstadoTareaModule } from 'src/app/pipes/estado-tarea/estado-tarea.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TaskPageRoutingModule,
    EstadoTareaModule
  ],
  declarations: [TaskPage]
})
export class TaskPageModule {}
