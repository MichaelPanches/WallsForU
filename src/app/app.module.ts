import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaleriaModule } from './modulos/galeria/galeria.module';
import { HeaderComponent } from './componentes/header/header.component';
import { ErrorComponent } from './componentes/error/error.component';
import { CuentasModule } from './modulos/cuentas/cuentas.module';
import { RouterModule } from '@angular/router';
import { GestionWallpapersModule } from './modulos/gestion-wallpapers/gestion-wallpapers.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    GaleriaModule,
    CuentasModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
