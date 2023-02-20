import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModificarCampoModalComponent } from '../modificar-campo-modal/modificar-campo-modal.component';
import { Subscription } from 'rxjs';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {
  usuario = JSON.parse(localStorage.getItem("Usuario")!);

  constructor(private modalService: NgbModal, private _cuentasService : CuentasService){

  }

  modificarCampo(campo: string, propiedad: string): void {
    const modalRef = this.modalService.open(ModificarCampoModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.usuario = this.usuario;
    modalRef.componentInstance.campo = campo;
    modalRef.componentInstance.propiedad = propiedad;

    modalRef.closed.subscribe(() => {
      localStorage.setItem("Usuario", JSON.stringify(this.usuario))
      this._cuentasService.modUsuario(this.usuario);
    
    })
  }


  

  

}
