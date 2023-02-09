import { Injectable } from '@angular/core';
import { WallpaperInterfaz } from '../interfaces/WallpaperInterfaz';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  Datos!: WallpaperInterfaz[];

  constructor() {
    if (localStorage.getItem('Catalogo') === null || JSON.parse(localStorage.getItem('Catalogo')!).length === 0) {
      this.Datos = [{
        nombre: 'Mario Kart',
        descripcion: 'Juego de carreras',
        categoria: 'Juego',
        precio: 22
      },
      {
        nombre: 'God Of War',
        descripcion: 'Juego de fantasia',
        categoria: 'Juego',
        precio: 24
      },
      {
        nombre: 'Mario Party',
        descripcion: 'Juego de familia',
        categoria: 'Juego',
        precio: 15
      },
      {
        nombre: 'Sonic Colors',
        descripcion: 'Juego de carreras',
        categoria: 'Juego',
        precio: 8
      },
      {
        nombre: 'God Of War',
        descripcion: 'Juego de fantasia',
        categoria: 'Juego',
        precio: 24
      },
      {
        nombre: 'Mario Party',
        descripcion: 'Juego de familia',
        categoria: 'Juego',
        precio: 15
      },
      {
        nombre: 'Sonic Colors',
        descripcion: 'Juego de carreras',
        categoria: 'Juego',
        precio: 8
      },
      {
        nombre: 'Sonic Colors',
        descripcion: 'Juego de carreras',
        categoria: 'Juego',
        precio: 8
      },
      {
        nombre: 'God Of War',
        descripcion: 'Juego de fantasia',
        categoria: 'Juego',
        precio: 24
      },
      {
        nombre: 'Mario Party',
        descripcion: 'Juego de familia',
        categoria: 'Juego',
        precio: 15
      },
      {
        nombre: 'Sonic Colors',
        descripcion: 'Juego de carreras',
        categoria: 'Juego',
        precio: 8
      },
      ];
      localStorage.setItem('Catalogo', JSON.stringify(this.Datos));
    }
  }

  getWallpaper() {
    if(localStorage.getItem('Catalogo') === null) {
      this.Datos = [];
    } else {
      this.Datos = JSON.parse(localStorage.getItem('Catalogo')!);
    }
    return this.Datos;
  }

  addWallpaper(dato: WallpaperInterfaz) {
    this.Datos.push(dato);
    let Datos = [];
    if(localStorage.getItem('Catalogo') === null) {
      Datos = [];
      Datos.push(dato);
      localStorage.setItem('Catalogo', JSON.stringify(Datos));
    } else {
      Datos = JSON.parse(localStorage.getItem('Catalogo')!);
      Datos.push(dato); 
      localStorage.setItem('Catalogo', JSON.stringify(Datos));
    }
  }
}
