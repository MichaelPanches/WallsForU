import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-editar-usuario-modal',
  templateUrl: './editar-usuario-modal.component.html',
  styleUrls: ['./editar-usuario-modal.component.css']
})
export class EditarUsuarioModalComponent implements OnInit {
  @Input() public usuario!: UsuarioInterfaz;
  modUser!: FormGroup;
  submitted = false;


  constructor(private router: Router, public activeModal: NgbActiveModal, private _cuentasService: CuentasService, private formBuilder: FormBuilder) { } 
  
  ngOnInit(): void {
    console.log(this.usuario)

    this.modUser = this.formBuilder.group({
      nombre: [this.usuario.nombre , [Validators.required]],
      apellidos: [this.usuario.apellido, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]],
      password: [this.usuario.password, [Validators.required]],
      passwordConf: [this.usuario.password, [Validators.required]],

    }, {
      validators: [this.mailUsed('email'), this.samePassword('password', 'passwordConf'),],
      updateOn: 'submit'
    }
    );


  }

  get f() { return this.modUser.controls; }
  

  onSubmit(admin: boolean) {
    this.submitted = true;
    if (this.modUser.invalid) {
      return;
    }

    if (admin){
      this.usuario.rol = 1;
    } else {
      this.usuario.rol = 0;
    }

    this.usuario = {
      id: this.usuario.id,
      nombre: this.modUser.controls['nombre'].value,
      apellido: this.modUser.controls['apellidos'].value,
      email: this.modUser.controls['email'].value,
      rol: this.usuario.rol,
      password: this.modUser.controls['password'].value,
    }

    this._cuentasService.modUsuario(this.usuario).subscribe( data => {
      this._cuentasService.sendUpdate(true);
      this.activeModal.close();

        });
  }

  mailUsed(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors['mailUsed']) {
        return
      }

      /*if (this._cuentasService.getUsuarioEmail(control.value) && (control.value != this.usuario.email)) {
        control.setErrors({ mailUsed: true });
      } else {*/
        control.setErrors(null);
      /*}*/

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
