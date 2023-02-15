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
    this._galeriaService.getWallpapersAll().subscribe(data => {
      this.wallpapers = data;
    
    });
    
  };

}
