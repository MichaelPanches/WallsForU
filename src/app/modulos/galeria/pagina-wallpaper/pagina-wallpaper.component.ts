import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-pagina-wallpaper',
  templateUrl: './pagina-wallpaper.component.html',
  styleUrls: ['./pagina-wallpaper.component.css']
})
export class PaginaWallpaperComponent {
  wallpaper!: WallpaperInterfaz;
  wallpapers!: WallpaperInterfaz[];
  usuario!: any;
  imagen!: string;
  categorias!: CategoriaInterfaz[];

  constructor(private route: ActivatedRoute, private _categoriasService: CategoriasService, private _galeriaService: GaleriaService, private _cuentasService: CuentasService) { }

  ngOnInit() {
    const state = window.history.state;
    this.wallpaper = state.wallpaper;
    this.imagen = state.imagen;

    this.obtenerCategorias();
    this.obtenerWallpapers();
    this.obtenerUsuario();
  }

  obtenerCategorias() {
    this._categoriasService.getCategorias().subscribe(data => {
      this.categorias = data.filter((categoria: { titulo: string; }) => this.wallpaper.categorias.includes(categoria.titulo));
    });
  };

  obtenerWallpapers() {
    this._galeriaService.getWallpapersByUser(this.wallpaper.usuario).subscribe(data => {
      console.log(data);
      this.wallpapers = data.slice(0, 4); // Aquí se obtienen solo los primeros 4 elementos
      console.log(this.wallpapers);
    });
  };

  obtenerUsuario() {
    this._cuentasService.getUsuario(this.wallpaper.usuario).subscribe(data => {
      this.usuario = data;
      console.log(this.usuario)
    });
  };




}
