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
  private subscriptionName: Subscription; //important to create a subscription
    


  constructor(private router: Router, public _galeriaService: GaleriaService) {
    this.subscriptionName= this._galeriaService.getUpdate().subscribe
             (message => { //message contains the data sent from service
              this.ngOnInit();
             });


  };

  ngOnInit(): void {
    this.obtenerWallpapers();
  }

  refreshComponent(){
    this.router.navigate([this.router.url])
  }

  obtenerWallpapers(){
    this._galeriaService.getWallpapersByUser(JSON.parse(localStorage.getItem("Usuario")!).nombre).subscribe(data => {
      this.wallpapers = data;
    
    });
    
  };
}
