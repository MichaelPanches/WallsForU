import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-modificar-categoria-modal',
  templateUrl: './modificar-categoria-modal.component.html',
  styleUrls: ['./modificar-categoria-modal.component.css']
})
export class ModificarCategoriaModalComponent {
  @Input() public titulo!: string;
  categoria!: CategoriaInterfaz;


  constructor(private router: Router, public activeModal: NgbActiveModal,private _categoriasService: CategoriasService) {
  } 
  
  ngOnInit(): void {
    this.categoria = this._categoriasService.getCategoria(this.titulo);
  }
  

  onSubmit(titulo: string, descripcion: string) {

    var categoria = {
      titulo: titulo,
      descripcion: descripcion,
    }

    this._categoriasService.modCategoria(categoria, this.categoria);
  }

}
