import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './modulos/galeria/galeria/galeria.component';

const routes: Routes = [
  { path: '', component: GaleriaComponent },
  { path: 'galeia', component: GaleriaComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
