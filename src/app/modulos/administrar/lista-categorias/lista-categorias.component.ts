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
  filtro = "titulo";

  constructor(private _categoriasService: CategoriasService, private router: Router, private modalService: NgbModal){


  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this._categoriasService.getUpdate().subscribe((value: boolean) => {
      if(value) {
  
        this.obtenerCategorias();
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

  

  eliminarCategoria(id: number){
    this._categoriasService.deleteCategoria(id).subscribe(data => {
      this._categoriasService.sendUpdate(true);
    });
  }

  refreshComponent() {
    this.router.navigate([this.router.url])
  }



  obtenerCategorias(){
      this._categoriasService.getCategorias().subscribe(data => {
        this.categorias = data;
      });


    
    
  };

  filtrar() {
    if (this.filtro == "titulo") {
      return this.categorias.filter(categoria => categoria.titulo.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } else if (this.filtro == "id" && this.busqueda != "") {
      return this.categorias.filter(categoria => categoria.id!.toString() == this.busqueda);
    } else if (this.filtro == "descripcion") {
      return this.categorias.filter(categoria => categoria.descripcion.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    }

    return this.categorias;
  }

}
