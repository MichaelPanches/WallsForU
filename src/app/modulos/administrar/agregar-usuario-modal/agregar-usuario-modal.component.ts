import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-usuario-modal',
  templateUrl: './agregar-usuario-modal.component.html',
  styleUrls: ['./agregar-usuario-modal.component.css']
})
export class AgregarUsuarioModalComponent {
  usuario!: UsuarioInterfaz;
  addUser!: FormGroup;
  submitted = false;
  color = localStorage.getItem("siteColor"); 

  constructor(private router: Router, public activeModal: NgbActiveModal, private _cuentasService: CuentasService, private formBuilder: FormBuilder) {
    this.addUser = this.formBuilder.group({
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


  onSubmit(admin: boolean) {
    this.submitted = true;
    if (this.addUser.invalid) {
      console.log(this.addUser)
      console.log(this.addUser.invalid)
      return;
    }

    var rol: number;
    if (admin) {
      var rol = 1;
    } else {
      var rol = 0;
    }

    this.usuario = {
      id: 0,
      nombre: this.addUser.controls['nombre'].value,
      apellido: this.addUser.controls['apellidos'].value,
      email: this.addUser.controls['email'].value,
      rol: rol,
      password: this.addUser.controls['password'].value,
    }

    this._cuentasService.addUsuario(this.usuario).subscribe( data => {
      this._cuentasService.sendUpdate(true);
      this.activeModal.close();
        });

  }

  get f() { return this.addUser.controls; }


  mailUsed(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors['mailUsed']) {
        return
      }

     /* if (this._cuentasService.getUsuarioEmail(control.value)) {
        control.setErrors({ mailUsed: true });
      } else {*/
        control.setErrors(null);
     /* }*/

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
