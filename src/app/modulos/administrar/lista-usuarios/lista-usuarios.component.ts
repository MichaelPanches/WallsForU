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
  busqueda = "";
  filtro = "nombre";

  constructor(private _cuentasService: CuentasService, private router: Router, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.obtenerUsuarios();
    this._cuentasService.getUpdate().subscribe((value: boolean) => {
      if (value) {
        this.obtenerUsuarios();
      }

    })
  }

  openAgregar(): void {
    const modalRef = this.modalService.open(AgregarUsuarioModalComponent, { centered: true, size: 'md' });
  }

  openModificar(usuario: UsuarioInterfaz): void {
    const modalRef = this.modalService.open(EditarUsuarioModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.usuario = usuario;
  }

  eliminarUsuario(id: number) {
    this._cuentasService.deleteUsuario(id).subscribe(data => {
      this._cuentasService.sendUpdate(true);
    });
  }

  obtenerUsuarios() {
    this._cuentasService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  };

  convertirEnAsteriscos(texto: string): string {
    const asteriscos = new Array(texto.length).fill('*');
    return asteriscos.join('');
  }

  filtrar() {
    if (this.filtro == "nombre") {
      return this.usuarios.filter(usuario => usuario.nombre.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } else if (this.filtro == "id" && this.busqueda != "") {
      return this.usuarios.filter(usuario => usuario.id!.toString() == this.busqueda);
    } else if (this.filtro == "apellido") {
      return this.usuarios.filter(usuario => usuario.apellido.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } else if (this.filtro == "email") {
      return this.usuarios.filter(usuario => usuario.email.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    }

    return this.usuarios;
  }

}
