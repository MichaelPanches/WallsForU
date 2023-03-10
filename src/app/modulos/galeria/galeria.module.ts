import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarComponent } from './buscar/buscar.component';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './listar/listar.component';
import { WallpaperComponent } from './wallpaper/wallpaper.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HttpClientModule }from '@angular/common/http';
import { GaleriaComponent } from './galeria/galeria.component';
import { HeaderComponent } from 'src/app/componentes/header/header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ImagenesCategoriaComponent } from './imagenes-categoria/imagenes-categoria.component';
import { PaginaWallpaperComponent } from './pagina-wallpaper/pagina-wallpaper.component';



@NgModule({
  declarations: [
    BuscarComponent,
    ListarComponent,
    WallpaperComponent,
    GaleriaComponent,
    ListarCategoriasComponent,
    CategoriaComponent,
    ImagenesCategoriaComponent,
    PaginaWallpaperComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    BuscarComponent,
    ListarComponent,
    WallpaperComponent
  ]
})
export class GaleriaModule { }
