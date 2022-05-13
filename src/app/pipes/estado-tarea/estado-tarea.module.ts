import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoTareaPipe } from './estado-tarea.pipe';



@NgModule({
  declarations: [EstadoTareaPipe],
  imports: [
    CommonModule
  ],
  exports: [EstadoTareaPipe]
})
export class EstadoTareaModule { }
