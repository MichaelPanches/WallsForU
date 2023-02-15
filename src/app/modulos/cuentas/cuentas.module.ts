import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    LoginModalComponent,
    RegisterModalComponent
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
