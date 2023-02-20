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
  filtro = "0";
  private subscriptionName: Subscription; //important to create a subscription
    


  constructor(private router: Router, public _galeriaService: GaleriaService) {
    this.subscriptionName= this._galeriaService.getUpdate().subscribe
             (message => { //message contains the data sent from service
              this.ngOnInit();
             });


  };

  ngOnInit(): void {
    this.obtenerWallpapers(this.filtro, this.busqueda);
    this._galeriaService.getUpdate().subscribe((value: boolean) => {
      if(value) {
  
        this.obtenerWallpapers(this.filtro, this.busqueda);
      }
    
  })
  }

  refreshComponent(){
    this.router.navigate([this.router.url])
  }

  obtenerWallpapers(filtro: string, termino: string){
    if(filtro == "0"){
      this._galeriaService.getWallpapers(termino).subscribe(data => {
        this.wallpapers = data;
      });

    }else{
      this._galeriaService.getWallpapersByFilter(filtro, termino).subscribe(data => {
        this.wallpapers = data;
      });

    }
    
    
  };

}
