import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-agregar-usuario-modal',
  templateUrl: './agregar-usuario-modal.component.html',
  styleUrls: ['./agregar-usuario-modal.component.css']
})
export class AgregarUsuarioModalComponent {
  usuario!: UsuarioInterfaz;


  constructor(private router: Router, public activeModal: NgbActiveModal,private _cuentasService: CuentasService) {
    
  } 
  

  onSubmit(nombre: string, apellidos: string, email: string, password: string, repeatPassword: string, admin: boolean) {
    var rol: number;
    if (admin){
      var rol = 1;
    } else {
      var rol = 0;
    }

    this.usuario = {
      id: 0,
      nombre: nombre,
      apellido: apellidos,
      email: email,
      rol: rol,
      password: password,
    }

    this._cuentasService.addUsuario(this.usuario);

  }

}
