import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdministradorComponent } from './modulos/administrar/inicio-administrador/inicio-administrador.component';
import { ListaAdministrarComponent } from './modulos/administrar/lista-administrar/lista-administrar.component';
import { ListaCategoriasComponent } from './modulos/administrar/lista-categorias/lista-categorias.component';
import { ListaUsuariosComponent } from './modulos/administrar/lista-usuarios/lista-usuarios.component';
import { MiPerfilComponent } from './modulos/cuentas/mi-perfil/mi-perfil.component';
//import { ListaAdministrarComponent } from './modulos/administrar/lista-administrar/lista-administrar.component';
import { GaleriaComponent } from './modulos/galeria/galeria/galeria.component';
import { ImagenesCategoriaComponent } from './modulos/galeria/imagenes-categoria/imagenes-categoria.component';
import { ListarCategoriasComponent } from './modulos/galeria/listar-categorias/listar-categorias.component';
import { ListarComponent } from './modulos/gestion-wallpapers/listar/listar.component';

const routes: Routes = [
  { path: '', component: GaleriaComponent, pathMatch: 'full' },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'misWallpapers', component: ListarComponent },
  {
    path: 'administrador', children: [
      { path: '', component: InicioAdministradorComponent },
      { path: 'wallpapers', component: ListaAdministrarComponent },
      { path: 'usuarios', component: ListaUsuariosComponent },
      { path: 'categorias', component: ListaCategoriasComponent },
    ]
  },
  { path: 'miPerfil', component: MiPerfilComponent },
  {
    path: 'categorias', children: [
      { path: '', component: ListarCategoriasComponent },
      { path: ':titulo', component: ImagenesCategoriaComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
