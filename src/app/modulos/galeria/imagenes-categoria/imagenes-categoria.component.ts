import { Component } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-imagenes-categoria',
  templateUrl: './imagenes-categoria.component.html',
  styleUrls: ['./imagenes-categoria.component.css']
})
export class ImagenesCategoriaComponent {
  wallpapers!: WallpaperInterfaz[];
  categoria: any;
  suscription: Subscription;


  constructor(private router: Router, public _galeriaService: GaleriaService, private aRoute: ActivatedRoute) {
    this.categoria = this.aRoute.snapshot.paramMap.get('titulo');
    this.suscription = this._galeriaService.getTermino().subscribe(data => {
      this.obtenerWallpapers();

    });


  } ngOnInit(): void {
    this.obtenerWallpapers();
  }
  ;

  obtenerWallpapers() {
    this._galeriaService.getWallpapersByFilter("categorias" , this.categoria).subscribe(data => {
      this.wallpapers = data;

    });

  };

}
