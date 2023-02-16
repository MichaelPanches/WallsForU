import { Component, Input, OnInit } from '@angular/core';
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
  @Input() public id!: number;
  usuario!: UsuarioInterfaz;


  constructor(private router: Router, public activeModal: NgbActiveModal,private _cuentasService: CuentasService) {
    console.log(this.id)
  } 
  
  ngOnInit(): void {
    this.usuario = this._cuentasService.getUsuario(this.id);
    console.log(this.usuario)
  }
  

  onSubmit(nombre: string, apellidos: string, email: string, password: string, repeatPassword: string, admin: boolean) {
    if (admin){
      this.usuario.rol = 1;
    } else {
      this.usuario.rol = 0;
    }

    this.usuario = {
      id: this.id,
      nombre: nombre,
      apellido: apellidos,
      email: email,
      rol: this.usuario.rol,
      password: password,
    }

    this._cuentasService.modUsuario(this.usuario);
  }

}
