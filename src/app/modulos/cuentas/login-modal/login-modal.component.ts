import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  login!: FormGroup;
  submitted = false;

  constructor(private router: Router, public activeModal: NgbActiveModal, private _cuentasService: CuentasService, private formBuilder: FormBuilder) {
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]],
      password: ['', [Validators.required]]
    },
      {
        validators: [this.mailExist('email'), this.passwordBad('email', 'password'),],
        updateOn: 'submit'
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.login.invalid) {
      return;
    }

    if (JSON.parse(localStorage.getItem("Usuario")!).rol == 1) {
      this.router.navigate(['/administrador']);
      this.activeModal.close();
    } else {
      this.refreshComponent();
      this.activeModal.close();
    }

  }

  get f() { return this.login.controls; }


  refreshComponent() {
    this.router.navigate([this.router.url])
  }

  mailExist(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors['mailExist']) {
        return
      }

      if (!this._cuentasService.validateEmail(control.value)) {
        control.setErrors({ mailExist: true });
      } else {
        control.setErrors(null);
      }

    }
  }

  passwordBad(controlName: string, controlNamePassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const controlPassword = formGroup.controls[controlNamePassword];

      if (control.errors || (controlPassword.errors && controlPassword.errors['required'])) {
        return
      }

      if (!this._cuentasService.validateUsuario(control.value, controlPassword.value)) {
        console.log("si")
        controlPassword.setErrors({ passwordBad: true });
      } else {
        controlPassword.setErrors(null);
      }

    }
  }


}
