import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { WallpaperInterfaz } from '../interfaces/wallpaper.interface';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  Datos!: WallpaperInterfaz[];
  private terminoBusqueda$ = new Subject<string>();
  private subjectName = new Subject<any>(); 
  

  constructor() {
    if (localStorage.getItem('Wallpapers') === null || JSON.parse(localStorage.getItem('Wallpapers')!).length === 0) {
      this.Datos = [{
        titulo: 'Dark Future',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maximus32',
        categorias: 'horizontal, oscuro',
        tags: 'Futuro, Aliens, Cielo, Nubes, Montañas',
        ruta: 'wallpapers/Admin - Dark Future.jpg',
      },
      {
        titulo: 'City of Ligths',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maria12',
        categorias: 'horizontal, Ciudad',
        tags: 'Ciudad, Lago, Cielo, Luces, Edificios',
        ruta: 'wallpapers/Admin - City of Ligths.jpg',
      }
      ];
      localStorage.setItem('Wallpapers', JSON.stringify(this.Datos));
    }
  }

  addWallpaper(dato: WallpaperInterfaz) {
    this.Datos.push(dato);
    let Datos = [];
    if (localStorage.getItem('Wallpapers') === null) {
      Datos = [];
      Datos.push(dato);
      localStorage.setItem('Wallpapers', JSON.stringify(Datos));
    } else {
      Datos = JSON.parse(localStorage.getItem('Wallpapers')!);
      Datos.push(dato);
      localStorage.setItem('Wallpapers', JSON.stringify(Datos));
    }
  }

  sendUpdate(message: string) { //the component that wants to update something, calls this fn
    this.subjectName.next({ text: message }); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function 
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  deleteWallpaper(dato: WallpaperInterfaz) {
    let Datos: WallpaperInterfaz[] = [];
    Datos = JSON.parse(localStorage.getItem('Wallpapers')!);
    Datos.forEach((element: WallpaperInterfaz, index: any) => {
      if (element.autor == dato.autor && element.titulo == dato.titulo) Datos.splice(index, 1);
    });
    localStorage.setItem('Wallpapers', JSON.stringify(Datos));
  }

  modWallpaper(wallpaperAnterior: WallpaperInterfaz, wallpaperNuevo: WallpaperInterfaz) {
    let Datos: WallpaperInterfaz[] = [];
    Datos = JSON.parse(localStorage.getItem('Wallpapers')!);
    Datos.forEach((element: WallpaperInterfaz, index: any) => {
      if (element.autor == wallpaperAnterior.autor && element.titulo == wallpaperAnterior.titulo) Datos[index] = wallpaperNuevo;
    });
    localStorage.setItem('Wallpapers', JSON.stringify(Datos));
  }

  getWallpapers(busqueda: string): Observable<any[]> {
    busqueda = busqueda.toLowerCase();
    this.Datos = JSON.parse(localStorage.getItem('Wallpapers')!).filter(((Wallpapers: { titulo: string; categorias: string; tags: string; }) => Wallpapers.titulo.toLowerCase().includes(busqueda) || Wallpapers.categorias.toLowerCase().includes(busqueda) || Wallpapers.tags.toLowerCase().includes(busqueda)));

    return of(this.Datos);
  }

  getWallpapersByUser(user: string): Observable<any[]> {
    user = user.toLowerCase();
    this.Datos = JSON.parse(localStorage.getItem('Wallpapers')!).filter(((Wallpapers: { autor: string;}) => Wallpapers.autor.toLowerCase().includes(user)));

    return of(this.Datos);
  }

  getWallpapersAll(): Observable<any[]> {
    this.Datos = JSON.parse(localStorage.getItem('Wallpapers')!);

    return of(this.Datos);
  }

  sendTermino(busqueda: string) {
    this.terminoBusqueda$.next(busqueda);
  }

  getTermino(): Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }

}
