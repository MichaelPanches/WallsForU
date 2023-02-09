import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarComponent } from './buscar/buscar.component';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ListarComponent } from './listar/listar.component';
import { WallpaperComponent } from './wallpaper/wallpaper.component';



@NgModule({
  declarations: [
    BuscarComponent,
    ListarComponent,
    WallpaperComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    BuscarComponent
  ]
})
export class GaleriaModule { }
