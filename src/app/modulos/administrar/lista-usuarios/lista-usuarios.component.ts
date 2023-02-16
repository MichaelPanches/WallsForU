import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { AgregarUsuarioModalComponent } from '../agregar-usuario-modal/agregar-usuario-modal.component';
import { EditarUsuarioModalComponent } from '../editar-usuario-modal/editar-usuario-modal.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios!: UsuarioInterfaz[];

  constructor(private _cuentasService: CuentasService, private router: Router, private modalService: NgbModal){
    this.usuarios = _cuentasService.getUsuarios();

  }
  ngOnInit(): void {
    this.usuarios = this._cuentasService.getUsuarios();
  }

  openAgregar(): void {
    const modalRef = this.modalService.open(AgregarUsuarioModalComponent, { centered: true, size: 'md' });
  }

  openModificar(id: number): void {
    const modalRef = this.modalService.open(EditarUsuarioModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.id = id;
      
    
  }


  eliminarUsuario(id: number){
    this._cuentasService.deleteUsuario(id);
    this.ngOnInit();

  }

  refreshComponent() {
    this.router.navigate([this.router.url])
  }

}
