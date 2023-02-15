import { Component, OnInit } from '@angular/core';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';

import { Router } from '@angular/router';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  wallpapers!: WallpaperInterfaz[];
  busqueda = "";
  suscription: Subscription;


  constructor(private router: Router, public _galeriaService: GaleriaService) {
    this.suscription = this._galeriaService.getTermino().subscribe(data => {
      this.busqueda = data;
      this.obtenerWallpapers();
    
    });


  }ngOnInit(): void {
    this._galeriaService.getWallpapers("a").subscribe(data => {
      this.wallpapers = data;
    
    });
  }
;

  obtenerWallpapers(){
    this._galeriaService.getWallpapers(this.busqueda).subscribe(data => {
      this.wallpapers = data;
    
    });
    
  };
  

}
