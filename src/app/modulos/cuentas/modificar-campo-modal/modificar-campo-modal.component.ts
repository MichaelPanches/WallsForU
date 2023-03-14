import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-modificar-campo-modal',
  templateUrl: './modificar-campo-modal.component.html',
  styleUrls: ['./modificar-campo-modal.component.css']
})
export class ModificarCampoModalComponent implements OnInit {
  @Input() usuario!: any;
  @Input() campo!: string;
  @Input() propiedad!: string;
  valor!: string;
  modUser!: FormGroup;
  submitted = false;
  contrasenaNoCoincide = false;
  color = localStorage.getItem("siteColor"); 

  constructor(private router: Router, public activeModal: NgbActiveModal, private _cuentasService: CuentasService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    
    const myproperty = this.propiedad;
    this.modUser = this.formBuilder.group({
      campo: [this.usuario[myproperty], this.campo != "Contraseña" ? [Validators.required, this.validarMail(this.campo)] : []],
      contra: ['',  this.campo == "Contraseña" ? [Validators.required, this.validarAnterior(this.usuario[myproperty])] : []],
      nuevaContra: ['',  this.campo == "Contraseña" ? [Validators.required] : []],
      repetirContra: ['',  this.campo == "Contraseña" ? [Validators.required] : []]
    }, {
      validators: [this.samePassword('nuevaContra', 'repetirContra')],
      updateOn: 'submit'
    }
    );

  }

  modificar(){
    this.submitted = true;
    if (this.modUser.invalid) {
      return;
    }

    const myproperty = this.propiedad;

    if (this.campo == "Contraseña"){
      this.usuario[myproperty] = this.modUser.controls['nuevaContra'].value;
    } else {
      this.usuario[myproperty] = this.modUser.controls['campo'].value;
    }

    console.log(this.usuario[myproperty])
    console.log(this.usuario[myproperty])

    this.activeModal.close();

  }

  get f() { return this.modUser.controls; }

  validarMail(campo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (campo == 'Email') {
        if (control.value && !/\S+@\S+\.\S+/.test(control.value)) {
          return { correoInvalido: true };
        }
      }

      return null;
    };
  }

  validarAnterior(contra: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      
        if (control.value) {
          if (contra != control.value) {

            return { anteriorContra: true };
          }
        }

      return null;
    };
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



  refreshComponent() {
    this.router.navigate([this.router.url])
  }


}
