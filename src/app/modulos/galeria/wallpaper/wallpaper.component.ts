import { Component, Input, OnInit } from '@angular/core';
import { WallpaperInterfaz } from 'src/app/interfaces/WallpaperInterfaz';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list } from '@angular/fire/storage';
import { saveAs } from 'file-saver';


import { Observable, Observer } from "rxjs";


@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.css']
})
export class WallpaperComponent implements OnInit {
  @Input() wallpaper!: WallpaperInterfaz;
  imagen = "";
  base64Image: any;
  name = "Mr";

  constructor(private storage: Storage) { }

  ngOnInit(): void {
    this.cargarWallpaper(this.wallpaper.ruta);
  }

  async cargarWallpaper(ruta: string) {
    const referencia = ref(this.storage, ruta);
    const url = await getDownloadURL(referencia);

    this.imagen = url;
    console.log(url)
  }

  descargarWallpaper() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', this.imagen);
    xhr.send();
  }

  downloadImage() {
    this.getBase64ImageFromURL(this.imagen).subscribe((base64data: string) => {
      console.log(base64data);
      this.base64Image = "data:image/jpg;base64," + base64data;
      // save image to disk
      var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", this.wallpaper.autor + " - " + this.wallpaper.nombre + ".jpg");
      link.click();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img: HTMLImageElement = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    ctx!.drawImage(img, 0, 0);
    const dataURL: string = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }




}
