import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { WallpaperInterfaz } from '../interfaces/WallpaperInterfaz';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  Datos!: WallpaperInterfaz[];
  private terminoBusqueda$ = new Subject<string>();

  constructor() {
    if (localStorage.getItem('Wallpapers') === null || JSON.parse(localStorage.getItem('Wallpapers')!).length === 0) {
      this.Datos = [{
        nombre: 'Dark Future',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maximus32',
        categorias: 'horizontal, oscuro',
        tags: 'Futuro, Aliens, Cielo, Nubes, Montañas',
        ruta: 'wallpapers/carousel1.jpg',
      },
      {
        nombre: 'City of Ligths',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maria12',
        categorias: 'horizontal, Ciudad',
        tags: 'Ciudad, Lago, Cielo, Luces, Edificios',
        ruta: 'wallpapers/carousel3.jpg',
      },
      {
        nombre: 'Dark Future',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maximus32',
        categorias: 'horizontal, oscuro',
        tags: 'Futuro, Aliens, Cielo, Nubes, Montañas',
        ruta: 'wallpapers/carousel1.jpg',
      },
      {
        nombre: 'City of Ligths',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maria12',
        categorias: 'horizontal, Ciudad',
        tags: 'Ciudad, Lago, Cielo, Luces, Edificios',
        ruta: 'wallpapers/carousel3.jpg',
      },
      {
        nombre: 'Dark Future',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maximus32',
        categorias: 'horizontal, oscuro',
        tags: 'Futuro, Aliens, Cielo, Nubes, Montañas',
        ruta: 'wallpapers/carousel1.jpg',
      },
      {
        nombre: 'City of Ligths',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maria12',
        categorias: 'horizontal, Ciudad',
        tags: 'Ciudad, Lago, Cielo, Luces, Edificios',
        ruta: 'wallpapers/carousel3.jpg',
      },
      {
        nombre: 'City of Ligths',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maria12',
        categorias: 'horizontal, Ciudad',
        tags: 'Ciudad, Lago, Cielo, Luces, Edificios',
        ruta: 'wallpapers/carousel3.jpg',
      },
      {
        nombre: 'Dark Future',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maximus32',
        categorias: 'horizontal, oscuro',
        tags: 'Futuro, Aliens, Cielo, Nubes, Montañas',
        ruta: 'wallpapers/carousel1.jpg',
      },
      {
        nombre: 'City of Ligths',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maria12',
        categorias: 'horizontal, Ciudad',
        tags: 'Ciudad, Lago, Cielo, Luces, Edificios',
        ruta: 'wallpapers/carousel3.jpg',
      },
      {
        nombre: 'Dark Future',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maximus32',
        categorias: 'horizontal, oscuro',
        tags: 'Futuro, Aliens, Cielo, Nubes, Montañas',
        ruta: 'wallpapers/carousel1.jpg',
      },
      {
        nombre: 'City of Ligths',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maria12',
        categorias: 'horizontal, Ciudad',
        tags: 'Ciudad, Lago, Cielo, Luces, Edificios',
        ruta: 'wallpapers/carousel3.jpg',
      }
      ];
      localStorage.setItem('Wallpapers', JSON.stringify(this.Datos));
    }
  }

  addWallpaper(dato: WallpaperInterfaz) {
    this.Datos.push(dato);
    let Datos = [];
    if(localStorage.getItem('Wallpapers') === null) {
      Datos = [];
      Datos.push(dato);
      localStorage.setItem('Wallpapers', JSON.stringify(Datos));
    } else {
      Datos = JSON.parse(localStorage.getItem('Wallpapers')!);
      Datos.push(dato); 
      localStorage.setItem('Wallpapers', JSON.stringify(Datos));
    }
  }

  getWallpapers(busqueda: string) : Observable<any[]> {
    busqueda.toLowerCase();
    this.Datos  = JSON.parse(localStorage.getItem('Wallpapers')!).filter(((Wallpapers: { nombre: string; categorias: string; tags: string; }) => Wallpapers.nombre.toLowerCase().includes(busqueda) || Wallpapers.categorias.toLowerCase().includes(busqueda) || Wallpapers.tags.toLowerCase().includes(busqueda)));

    return of(this.Datos);
  }

  sendTermino(busqueda: string){
    this.terminoBusqueda$.next(busqueda);
  }

  getTermino(): Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }

}
