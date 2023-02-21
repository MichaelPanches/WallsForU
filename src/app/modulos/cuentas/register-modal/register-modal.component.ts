import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
  usuario!: UsuarioInterfaz;
  register!: FormGroup;
  submitted = false;

  constructor(private router: Router, public activeModal: NgbActiveModal, private _cuentasService: CuentasService, private formBuilder: FormBuilder) {
    this.register = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]],
      password: ['', [Validators.required]],
      passwordConf: ['', [Validators.required]],

    }, {
      validators: [this.mailUsed('email'), this.samePassword('password', 'passwordConf'),],
      updateOn: 'submit'
    }
    );
  }

  get f() { return this.register.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.register.invalid) {
      console.log(this.register)
      console.log(this.register.invalid)
      return;
    }

    this.usuario = {
      id: 0,
      nombre: this.register.controls['nombre'].value,
      apellido: this.register.controls['apellidos'].value,
      email: this.register.controls['email'].value,
      rol: 1,
      password: this.register.controls['password'].value,
    }

    this._cuentasService.addUsuario(this.usuario);

  }

  mailUsed(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors['mailUsed']) {
        return
      }

      if (this._cuentasService.validateEmail(control.value)) {
        control.setErrors({ mailUsed: true });
      } else {
        control.setErrors(null);
      }

    }



  }

  samePassword(controlNamePassword: string, controlNameConfirmation: string) {
    return (formGroup: FormGroup) => {
      const controlPassword = formGroup.controls[controlNamePassword];
      const controlConfirmation = formGroup.controls[controlNameConfirmation];

      if (controlConfirmation.errors && controlConfirmation.errors['required']) {
        return
      }

      if (controlPassword.value != controlConfirmation.value) {
        controlConfirmation.setErrors({ samePassword: true });
      } else {
        controlConfirmation.setErrors(null);
      }

    }



  }





}
