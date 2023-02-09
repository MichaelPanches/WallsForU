import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaleriaModule } from './modulos/galeria/galeria.module';
import { HeaderComponent } from './componentes/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GaleriaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
