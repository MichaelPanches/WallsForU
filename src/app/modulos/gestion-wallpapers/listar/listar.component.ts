import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  wallpapers!: WallpaperInterfaz[];
  color = localStorage.getItem("siteColor"); 
  busqueda = "";
  filtro = "";
  messageReceived: any;
  currentPage = 1;
  pageSize = 16;
  

  constructor(private router: Router, public _galeriaService: GaleriaService) {
    this._galeriaService.getUpdate().subscribe
             (message => {
              this.obtenerWallpapers();
             });
  };

  ngOnInit(): void {
    this.obtenerWallpapers();
  }

  refreshComponent(){
    this.router.navigate([this.router.url])
  }

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

  obtenerWallpapers(){
    this._galeriaService.getWallpapersByUser(JSON.parse(localStorage.getItem("Usuario")!).id).subscribe(data => {
      console.log(data)
      this.wallpapers = data;
      console.log(this.wallpapers)
    
    });
    
  };

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
