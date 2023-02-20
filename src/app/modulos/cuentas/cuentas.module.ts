import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ModificarCampoModalComponent } from './modificar-campo-modal/modificar-campo-modal.component';



@NgModule({
  declarations: [
    LoginModalComponent,
    RegisterModalComponent,
    MiPerfilComponent,
    ModificarCampoModalComponent,
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    LoginModalComponent,
    RegisterModalComponent,
    AppRoutingModule,
  ]
  
})
export class CuentasModule { }
