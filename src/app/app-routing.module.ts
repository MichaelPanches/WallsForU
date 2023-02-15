import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdministradorComponent } from './modulos/administrar/inicio-administrador/inicio-administrador.component';
import { ListaAdministrarComponent } from './modulos/administrar/lista-administrar/lista-administrar.component';
import { ListaUsuariosComponent } from './modulos/administrar/lista-usuarios/lista-usuarios.component';
//import { ListaAdministrarComponent } from './modulos/administrar/lista-administrar/lista-administrar.component';
import { GaleriaComponent } from './modulos/galeria/galeria/galeria.component';
import { ListarComponent } from './modulos/gestion-wallpapers/listar/listar.component';

const routes: Routes = [
  { path: '', component: GaleriaComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'misWallpapers', component: ListarComponent },
  { path: 'listaAdministrar', component: ListaAdministrarComponent },
  { path: 'inicioAdministrar', component: InicioAdministradorComponent },
  { path: 'usuariosAdministrar', component: ListaUsuariosComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
