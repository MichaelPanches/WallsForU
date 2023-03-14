import { Component } from '@angular/core';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-lista-administrar',
  templateUrl: './lista-administrar.component.html',
  styleUrls: ['./lista-administrar.component.css']
})
export class ListaAdministrarComponent {
  wallpapers!: WallpaperInterfaz[];
  busqueda = "";
  filtro = "";
  currentPage = 1;
  pageSize = 16;

  constructor(private router: Router, public _galeriaService: GaleriaService) {
    this._galeriaService.getUpdate().subscribe
      (message => {
        this.ngOnInit();
      });
  };

  ngOnInit(): void {
    this.obtenerWallpapers();
    this._galeriaService.getUpdate().subscribe((value: boolean) => {
      if (value) {
        this.obtenerWallpapers();
      }
    })
  }

  refreshComponent() {
    this.router.navigate([this.router.url])
  }

  obtenerWallpapers() {
    this._galeriaService.getWallpapers("").subscribe(data => {
      console.log(data)
      this.wallpapers = data;
    });
  };

  filtrar() {
    var filteredWallpapers = this.wallpapers;
    if (this.filtro == "titulo") {
      filteredWallpapers = this.wallpapers.filter(wallpaper => wallpaper.titulo.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } else if (this.filtro == "categorias") {
      filteredWallpapers = this.wallpapers.filter(wallpaper => wallpaper.categorias.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } else if (this.filtro == "tags") {
      filteredWallpapers = this.wallpapers.filter(wallpaper => wallpaper.tags.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } else {
      filteredWallpapers = this.wallpapers.filter(wallpaper => wallpaper.titulo.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()) || wallpaper.categorias.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()) || wallpaper.tags.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));

    } 

    if (filteredWallpapers.length < (this.currentPage - 1) * this.pageSize) {
      this.currentPage = 1; 
    }

    return filteredWallpapers;
  }

  previousPage() {
    this.currentPage--;
  }
  
  nextPage() {
    this.currentPage++;
  }

  
  totalPages() {
    return Math.ceil( (this.wallpapers ? this.filtrar() : []).length / this.pageSize);
  }

}
