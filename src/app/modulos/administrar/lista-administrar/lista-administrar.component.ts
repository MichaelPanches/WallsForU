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
    if (this.filtro == "titulo") {
      return this.wallpapers.filter(wallpaper => wallpaper.titulo.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } else if (this.filtro == "categorias") {
      return this.wallpapers.filter(wallpaper => wallpaper.categorias.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } else if (this.filtro == "tags") {
      return this.wallpapers.filter(wallpaper => wallpaper.tags.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
    } 

    return this.wallpapers.filter(wallpaper => wallpaper.titulo.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()) || wallpaper.categorias.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()) || wallpaper.tags.toLocaleLowerCase().includes(this.busqueda.toLocaleLowerCase()));
  }

}
