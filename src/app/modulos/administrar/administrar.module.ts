import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAdministrarComponent } from './lista-administrar/lista-administrar.component';
import { GestionWallpapersModule } from '../gestion-wallpapers/gestion-wallpapers.module';
import { InicioAdministradorComponent } from './inicio-administrador/inicio-administrador.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AgregarUsuarioModalComponent } from './agregar-usuario-modal/agregar-usuario-modal.component';
import { EditarUsuarioModalComponent } from './editar-usuario-modal/editar-usuario-modal.component';
import { ModificarWallpaperModalComponent } from './modificar-wallpaper-modal/modificar-wallpaper-modal.component';



@NgModule({
  declarations: [
    ListaAdministrarComponent,
    InicioAdministradorComponent,
    ListaUsuariosComponent,
    AgregarUsuarioModalComponent,
    EditarUsuarioModalComponent,
    ModificarWallpaperModalComponent,
  ],
  imports: [
    CommonModule,
    GestionWallpapersModule
  ]
})
export class AdministrarModule { }
