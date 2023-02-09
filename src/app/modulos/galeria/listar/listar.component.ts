import { Component } from '@angular/core';
import { WallpaperInterfaz } from 'src/app/interfaces/WallpaperInterfaz';

import { Router } from '@angular/router';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  wallpapers!: WallpaperInterfaz[];

  constructor(private router: Router, public galeriaService: GaleriaService) {
    this.wallpapers = this.galeriaService.getWallpaper();
    console.log(this.galeriaService.getWallpaper());


  };

}
