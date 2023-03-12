import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list, deleteObject, StorageReference } from '@angular/fire/storage';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { GaleriaService } from 'src/app/servicios/galeria.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  busqueda: string;
  banners!: WallpaperInterfaz[];
  ref! : StorageReference;
  images: string[] = this.shuffleArray(['../assets/img/carousel1.jpg', '../assets/img/carousel2.jpg', '../assets/img/carousel3.jpg', '../assets/img/carousel4.jpg']);


  constructor(private storage: Storage, config: NgbCarouselConfig, private _galeriaService: GaleriaService) {
    config.interval = 5000;
    config.keyboard = true;
    config.showNavigationArrows = true;
    config.pauseOnHover = false;
    config.pauseOnFocus = false;
    config.showNavigationIndicators = false;
    
    this.busqueda = "";
  }

  ngOnInit(): void {
    this._galeriaService.randomBanners().subscribe(data => {
      this.banners = data;
      this.banners.forEach(banner => {
        this.cargarWallpaper(banner.ruta);
      });
    })
  }

  async cargarWallpaper(ruta: string) {
    console.log(ruta)

      const referencia = ref(this.storage, ruta);
      const url = await getDownloadURL(referencia);
      this.ref = referencia;
      this.images.push(url);

      if (this.images.length >= 7){
        this.images.splice(1, 3);
      }

  }

  shuffleArray(array: any[]): any[] {
    let currentIndex: number = array.length;
    let temporaryValue: any;
    let randomIndex: number;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  

  buscarImg(){
    this._galeriaService.sendTermino(this.busqueda);

  }

  

}
