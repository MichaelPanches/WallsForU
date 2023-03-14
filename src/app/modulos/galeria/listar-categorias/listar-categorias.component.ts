import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent {
  Categorias!: CategoriaInterfaz[];
  busqueda = "";
  messageReceived: any;
    


  constructor(private router: Router, public _categoriasService: CategoriasService) {

  };

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  refreshComponent(){
    this.router.navigate([this.router.url])
  }

  obtenerCategorias(){
    this._categoriasService.getCategorias().subscribe(data => {
      console.log(data)
      this.Categorias = data;
    
    });
    
  };
  


}
