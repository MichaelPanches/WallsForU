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
  filtro = "0";

  constructor(private _cuentasService: CuentasService, private router: Router, private modalService: NgbModal){


  }
  ngOnInit(): void {
    this.obtenerUsuarios(this.filtro, this.busqueda);
    this._cuentasService.getUpdate().subscribe((value: boolean) => {
      if(value) {
  
        this.obtenerUsuarios(this.filtro, this.busqueda);
      }
    
  })
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
  }

  refreshComponent() {
    this.router.navigate([this.router.url])
  }

  obtenerUsuarios(filtro: string, termino: string){
    if(filtro == "0"){
      this._cuentasService.getUsuariosSearch(termino).subscribe(data => {
        this.usuarios = data;
      });

    }else{
      this._cuentasService.getUsuariosByFilter(filtro, termino).subscribe(data => {
        this.usuarios = data;
      });

    }
    
    
  };

}
