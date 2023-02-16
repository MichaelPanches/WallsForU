import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
  usuario!: UsuarioInterfaz;


  constructor(private router: Router, public activeModal: NgbActiveModal,private _cuentasService: CuentasService) {
    
  } 
  

  onSubmit(nombre: string, apellidos: string, email: string, password: string, repeatPassword: string) {
    this.usuario = {
      id: 0,
      nombre: nombre,
      apellido: apellidos,
      email: email,
      rol: 1,
      password: password,
    }

    this._cuentasService.addUsuario(this.usuario);

  }
  

}
