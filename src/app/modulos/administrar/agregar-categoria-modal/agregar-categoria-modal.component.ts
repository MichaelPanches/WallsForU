import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-agregar-categoria-modal',
  templateUrl: './agregar-categoria-modal.component.html',
  styleUrls: ['./agregar-categoria-modal.component.css']
})
export class AgregarCategoriaModalComponent {
  categoria!: CategoriaInterfaz;


  constructor(private router: Router, public activeModal: NgbActiveModal,private _categoriasService: CategoriasService) {
    
  } 
  

  onSubmit(titulo: string, descripcion: string) {

    this.categoria = {
      titulo: titulo,
      descripcion: descripcion,
    }

    this._categoriasService.addCategoria(this.categoria);

  }

}
