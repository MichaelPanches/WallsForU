import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Observable, Observer } from "rxjs";

@Component({
  selector: 'app-pagina-wallpaper',
  templateUrl: './pagina-wallpaper.component.html',
  styleUrls: ['./pagina-wallpaper.component.css']
})
export class PaginaWallpaperComponent {
  wallpaper!: WallpaperInterfaz;
  wallpapers!: WallpaperInterfaz[];
  usuario!: any;
  imagen!: string;
  categorias!: CategoriaInterfaz[];
  base64Image: any;
  color = localStorage.getItem("siteColor");


  constructor(private route: ActivatedRoute, private _categoriasService: CategoriasService, private _galeriaService: GaleriaService, private _cuentasService: CuentasService) { }

  ngOnInit() {
    const state = window.history.state;
    this.wallpaper = state.wallpaper;
    this.imagen = state.imagen;

    this.obtenerCategorias();
    this.obtenerWallpapers();
    this.obtenerUsuario();
  }

  obtenerCategorias() {
    this._categoriasService.getCategorias().subscribe(data => {
      this.categorias = data.filter((categoria: { titulo: string; }) => this.wallpaper.categorias.includes(categoria.titulo));
    });
  };

  obtenerWallpapers() {
    this._galeriaService.getWallpapersByUser(this.wallpaper.usuario).subscribe(data => {
      console.log(data);
      this.wallpapers = data.slice(0, 4).filter((wallpaper: { titulo: string; }) => wallpaper.titulo != this.wallpaper.titulo);
      console.log(this.wallpapers);
    });
  };

  obtenerUsuario() {
    this._cuentasService.getUsuario(this.wallpaper.usuario).subscribe(data => {
      this.usuario = data;
      console.log(this.usuario)
    });
  };

  onImageClick() {
    const imageOverlay = document.querySelector('.image-overlay');
    const image = document.querySelector('.image-container img') as HTMLImageElement;

    if (!image.classList.contains('centered')) {
      image.classList.add('centered');

      const enlargedImageDiv = document.createElement('div');
      enlargedImageDiv.style.display = 'flex';
      enlargedImageDiv.style.justifyContent = 'center';
      enlargedImageDiv.style.alignItems = 'center';
      enlargedImageDiv.style.position = 'fixed';
      enlargedImageDiv.style.top = '0';
      enlargedImageDiv.style.left = '0';
      enlargedImageDiv.style.width = '100%';
      enlargedImageDiv.style.height = '100%';
      enlargedImageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      enlargedImageDiv.style.zIndex = '9999';
      enlargedImageDiv.classList.add('enlarged-image-overlay'); // Agrega una clase al elemento

      const enlargedImage = document.createElement('img');
      enlargedImage.src = image.src;
      enlargedImage.style.maxWidth = '80%';
      enlargedImage.style.maxHeight = '80%';

      enlargedImageDiv.appendChild(enlargedImage);
      document.body.appendChild(enlargedImageDiv);

      // Agrega un event listener al elemento que detecte un clic y elimine el elemento del DOM
      enlargedImageDiv.addEventListener('click', () => {
        image.classList.remove('centered');
        document.querySelector('.enlarged-image-overlay')?.remove();
      });

    } else {
      image.classList.remove('centered');
      document.querySelector('.enlarged-image-overlay')?.remove();
    }
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
      this.base64Image = "data:image/jpg;base64," + base64data;
      // save image to disk
      var link = document.createElement("a");

      document.body.appendChild(link); // for Firefox

      link.setAttribute("href", this.base64Image);
      link.setAttribute("download", this.wallpaper.usuario + " - " + this.wallpaper.titulo + ".jpg");
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
