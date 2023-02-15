import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAdministrarComponent } from './modulos/administrar/lista-administrar/lista-administrar.component';
import { GaleriaComponent } from './modulos/galeria/galeria/galeria.component';
import { ListarComponent } from './modulos/gestion-wallpapers/listar/listar.component';

const routes: Routes = [
  { path: '', component: GaleriaComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'misWallpapers', component: ListarComponent },
  { path: 'listaAdministrar', component: ListaAdministrarComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
