import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { FormGroup, Validators } from '@angular/forms';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  login!: FormGroup;
  submitted = false;
  usuario!: UsuarioInterfaz;

  constructor(private router: Router, public activeModal: NgbActiveModal, private _cuentasService: CuentasService, private formBuilder: FormBuilder) {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]],
      password: ['', [Validators.required]]
    },
      {
        validators: [this.mailExist('email'), this.passwordBad('email', 'password'),],
      }
    );
  }

  onSubmit() {
    this._cuentasService.getUsuarioEmail(this.login.controls['email'].value).subscribe(data => {
      this.usuario = {
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        rol: data.rol,
      };
      this.submitted = true;

      if (this.login.invalid) {
        return;
      }

      localStorage.setItem('Usuario', JSON.stringify(this.usuario));

      if (JSON.parse(localStorage.getItem("Usuario")!).rol == 1) {
        this.router.navigate(['/administrador']);
        this.activeModal.close();
      } else {
        this.refreshComponent();
        this.activeModal.close();
      }


    });
  }

  get f() { return this.login.controls; }


  refreshComponent() {
    this.router.navigate([this.router.url])
  }

  mailExist(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if ((control.errors && !control.errors['mailExist'])) {
        return
      }

      this._cuentasService.getUsuarioEmail(control.value).subscribe(data => {
        this.usuario = data;
        if (data == null) {

          control.setErrors({ mailExist: true });
        } else {
          control.setErrors(null);
          return

        }
        this.submitted = false;
      });

    }
  }
  
  passwordBad(controlName: string, controlNamePassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const controlPassword = formGroup.controls[controlNamePassword];

      if (controlPassword.errors && !(controlPassword.errors['passwordBad'])) {
        return
      }

      if (this.usuario != undefined){
        if (this.usuario.password != controlPassword.value) {
          controlPassword.setErrors({ passwordBad: true });
          

        } else {
          controlPassword.setErrors(null);
        }
      }
        this.submitted = false;

    }
  }


}
