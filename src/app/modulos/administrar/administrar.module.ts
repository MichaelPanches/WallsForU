import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAdministrarComponent } from './lista-administrar/lista-administrar.component';
import { GestionWallpapersModule } from '../gestion-wallpapers/gestion-wallpapers.module';
import { InicioAdministradorComponent } from './inicio-administrador/inicio-administrador.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';



@NgModule({
  declarations: [
    ListaAdministrarComponent,
    InicioAdministradorComponent,
    ListaUsuariosComponent,
  ],
  imports: [
    CommonModule,
    GestionWallpapersModule
  ]
})
export class AdministrarModule { }
