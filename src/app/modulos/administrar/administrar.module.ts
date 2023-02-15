import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAdministrarComponent } from './lista-administrar/lista-administrar.component';



@NgModule({
  declarations: [
    ListaAdministrarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListaAdministrarComponent
  ]
})
export class AdministrarModule { }
