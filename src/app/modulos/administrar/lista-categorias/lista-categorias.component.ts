import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { AgregarCategoriaModalComponent } from '../agregar-categoria-modal/agregar-categoria-modal.component';
import { ModificarCategoriaModalComponent } from '../modificar-categoria-modal/modificar-categoria-modal.component';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent {

  categorias!: CategoriaInterfaz[];
  busqueda = "";

  constructor(private _categoriasService: CategoriasService, private router: Router, private modalService: NgbModal){


  }

  ngOnInit(): void {
    this.obtenerCategorias(this.busqueda);
    this._categoriasService.getUpdate().subscribe((value: boolean) => {
      if(value) {
  
        this.obtenerCategorias(this.busqueda);
      }
    
  })
  }

  openAgregar(): void {
    const modalRef = this.modalService.open(AgregarCategoriaModalComponent, { centered: true, size: 'md' });
  }

  openModificar(titulo: string): void {
    const modalRef = this.modalService.open(ModificarCategoriaModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.titulo = titulo;
      
    
  }

  

  eliminarCategoria(titulo: string){
    this._categoriasService.deleteCategoria(titulo);
  }

  refreshComponent() {
    this.router.navigate([this.router.url])
  }

  obtenerCategorias(termino: string){
      this._categoriasService.getCategoriasSearch(termino).subscribe(data => {
        this.categorias = data;
      });


    
    
  };

}
