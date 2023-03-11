import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-imagenes-categoria',
  templateUrl: './imagenes-categoria.component.html',
  styleUrls: ['./imagenes-categoria.component.css']
})
export class ImagenesCategoriaComponent {
  wallpapers!: WallpaperInterfaz[];
  categoria: any;
  categoriaData!: any;
  suscription: Subscription;


  constructor(private router: Router, public _galeriaService: GaleriaService, private aRoute: ActivatedRoute, public _categoriasService: CategoriasService) {
    this.categoria = this.aRoute.snapshot.paramMap.get('titulo');
    
    this.suscription = this._galeriaService.getTermino().subscribe(data => {
      this.obtenerWallpapers();

    });


  } ngOnInit(): void {
    this._categoriasService.getCategoria(this.categoria).subscribe(data => {
      this.categoriaData = data;
    });

    this.obtenerWallpapers();
  }
  ;

  obtenerWallpapers() {
    this._galeriaService.getWallpapersByCategoria(this.categoria).subscribe(data => {
      this.wallpapers = data;

    });

  };

}
