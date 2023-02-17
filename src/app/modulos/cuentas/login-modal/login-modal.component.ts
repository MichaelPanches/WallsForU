import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  advertencia: string;
  usu!: false |  UsuarioInterfaz;

  constructor(private router: Router, public activeModal: NgbActiveModal, private _cuentasService: CuentasService) {
    this.advertencia = "Incorrecto";
  }

  onSubmit(usuario: string, password: string) {
    this.usu  = this._cuentasService.validateUsuario(usuario, password);


    if (this._cuentasService.validateUsuario(usuario, password)) {
      alert('Inicio Correcto');
      this.activeModal.close();

      if (JSON.parse(localStorage.getItem("Usuario")!).rol == 1){
        this.router.navigate(['/inicioAdministrar']);
        this.activeModal.close();
      } else {
        this.refreshComponent();
        this.activeModal.close();
      }
      
    } else {
      alert('Inicio Incorrecto');
      this.activeModal.close();

    }
  }


  refreshComponent() {
    this.router.navigate([this.router.url])
  }


}
