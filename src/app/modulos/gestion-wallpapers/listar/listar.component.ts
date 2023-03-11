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
  busqueda = "";
  messageReceived: any;

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

  obtenerWallpapers(){
    this._galeriaService.getWallpapersByUser(JSON.parse(localStorage.getItem("Usuario")!).id).subscribe(data => {
      console.log(data)
      this.wallpapers = data;
      console.log(this.wallpapers)
    
    });
    
  };

  
}
