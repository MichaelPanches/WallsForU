import { Component, Input, OnInit } from '@angular/core';
import { WallpaperInterfaz } from 'src/app/interfaces/WallpaperInterfaz';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list } from '@angular/fire/storage';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.css']
})
export class WallpaperComponent implements OnInit {
  @Input() wallpaper!: WallpaperInterfaz;
  imagen = "";

  constructor(private storage: Storage) {}

  ngOnInit(): void {
    this.cargarWallpaper(this.wallpaper.ruta);
  }

  async cargarWallpaper(ruta: string){
    const referencia = ref(this.storage, ruta);
    const url = await getDownloadURL(referencia);

    this.imagen = url;
    console.log(url)
  }



}
