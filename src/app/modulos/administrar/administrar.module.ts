import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAdministrarComponent } from './lista-administrar/lista-administrar.component';
import { GestionWallpapersModule } from '../gestion-wallpapers/gestion-wallpapers.module';
import { InicioAdministradorComponent } from './inicio-administrador/inicio-administrador.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AgregarUsuarioModalComponent } from './agregar-usuario-modal/agregar-usuario-modal.component';
import { EditarUsuarioModalComponent } from './editar-usuario-modal/editar-usuario-modal.component';
import { ModificarWallpaperModalComponent } from './modificar-wallpaper-modal/modificar-wallpaper-modal.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { AgregarCategoriaModalComponent } from './agregar-categoria-modal/agregar-categoria-modal.component';
import { ModificarCategoriaModalComponent } from './modificar-categoria-modal/modificar-categoria-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaAdministrarComponent,
    InicioAdministradorComponent,
    ListaUsuariosComponent,
    AgregarUsuarioModalComponent,
    EditarUsuarioModalComponent,
    ModificarWallpaperModalComponent,
    ListaCategoriasComponent,
    AgregarCategoriaModalComponent,
    ModificarCategoriaModalComponent,
    
  ],
  imports: [
    CommonModule,
    GestionWallpapersModule,
    ReactiveFormsModule
  ]
})
export class AdministrarModule { }
