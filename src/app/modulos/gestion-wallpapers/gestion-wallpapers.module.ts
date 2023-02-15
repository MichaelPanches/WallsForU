import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubirModalComponent } from './subir-modal/subir-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment.development';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ListarComponent } from './listar/listar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { WallpaperComponent } from '../galeria/wallpaper/wallpaper.component';
import { GaleriaModule } from '../galeria/galeria.module';
import { MiWallpaperComponent } from './mi-wallpaper/mi-wallpaper.component';



@NgModule({
  declarations: [
    SubirModalComponent,
    ListarComponent,
    MiWallpaperComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    AppRoutingModule,
    GaleriaModule
  ],
  exports: [
    SubirModalComponent,
    ListarComponent,
  ]
})
export class GestionWallpapersModule { }
