import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './modulos/galeria/galeria/galeria.component';
import { ListarComponent } from './modulos/gestion-wallpapers/listar/listar.component';

const routes: Routes = [
  { path: '', component: GaleriaComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'misWallpapers', component: ListarComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
