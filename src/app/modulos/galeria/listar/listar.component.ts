import { Component } from '@angular/core';
import { WallpaperInterfaz } from 'src/app/interfaces/WallpaperInterfaz';

import { Router } from '@angular/router';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {
  wallpapers!: WallpaperInterfaz[];
  busqueda = "";
  suscription: Subscription;

  constructor(private router: Router, public _galeriaService: GaleriaService) {
    console.log("si");
    this.suscription = this._galeriaService.getTermino().subscribe(data => {
      this.busqueda = data;
      this.obtenerWallpapers();
    
    });


  };

  obtenerWallpapers(){
    this._galeriaService.getWallpapers(this.busqueda).subscribe(data => {
      this.wallpapers = data;
    
    });
    
  }

}
