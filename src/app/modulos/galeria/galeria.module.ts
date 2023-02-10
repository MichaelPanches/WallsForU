import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarComponent } from './buscar/buscar.component';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ListarComponent } from './listar/listar.component';
import { WallpaperComponent } from './wallpaper/wallpaper.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.development';
import { provideStorage,getStorage } from '@angular/fire/storage';



@NgModule({
  declarations: [
    BuscarComponent,
    ListarComponent,
    WallpaperComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  exports: [
    BuscarComponent,
    ListarComponent
  ]
})
export class GaleriaModule { }
