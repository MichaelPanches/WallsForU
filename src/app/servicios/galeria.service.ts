import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject  } from 'rxjs';
import { CategoriaInterfaz } from '../interfaces/categoria.interface';
import { WallpaperInterfaz } from '../interfaces/wallpaper.interface';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  Datos!: WallpaperInterfaz[];
  Categorias!: CategoriaInterfaz[];
  private terminoBusqueda$ = new Subject<string>();
  private subjectName = new Subject<any>();
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);



  constructor() {
    if (localStorage.getItem('Wallpapers') === null || JSON.parse(localStorage.getItem('Wallpapers')!).length === 0) {
      this.Datos = [{
        titulo: 'Dark Future',
        descripcion: 'Un paisaje desolador, oscuro... En el cual se puede ver el avance tecnologico.',
        autor: 'Maximus32',
        categorias: 'horizontal, oscuro, futurista',
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

    if (localStorage.getItem('Categorias') === null || JSON.parse(localStorage.getItem('Categorias')!).length === 0) {
      this.Categorias = [{
        titulo: 'Animales',
        descripcion: 'Texto generico de categoria No 1.',
      },
      {
        titulo: 'Paisajes',
        descripcion: 'Texto generico de categoria No 2.',
      },
      {
        titulo: 'Anime',
        descripcion: 'Texto generico de categoria No 3.',
      },
      {
        titulo: 'Futurista',
        descripcion: 'Texto generico de categoria No 4.',
      },
      {
        titulo: 'Horizontal',
        descripcion: 'Texto generico de categoria No 3.',
      }
      ];
      localStorage.setItem('Categorias', JSON.stringify(this.Categorias));
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
    this.sendUpdate(true);
  }

  public getUpdate(): Observable<boolean> {

    return this.refresh.asObservable();
  }

  public sendUpdate(value: boolean): void {

    this.refresh.next(value);
  }



  deleteWallpaper(dato: WallpaperInterfaz) {
    let Datos: WallpaperInterfaz[] = [];
    Datos = JSON.parse(localStorage.getItem('Wallpapers')!);
    Datos.forEach((element: WallpaperInterfaz, index: any) => {
      if (element.autor == dato.autor && element.titulo == dato.titulo) Datos.splice(index, 1);
    });
    localStorage.setItem('Wallpapers', JSON.stringify(Datos));
    this.sendUpdate(true);
  }

  modWallpaper(wallpaperAnterior: WallpaperInterfaz, wallpaperNuevo: WallpaperInterfaz) {
    let Datos: WallpaperInterfaz[] = [];
    Datos = JSON.parse(localStorage.getItem('Wallpapers')!);
    Datos.forEach((element: WallpaperInterfaz, index: any) => {
      if (element.autor == wallpaperAnterior.autor && element.titulo == wallpaperAnterior.titulo) Datos[index] = wallpaperNuevo;
    });
    localStorage.setItem('Wallpapers', JSON.stringify(Datos));
    this.sendUpdate(true);
  }

  getWallpapers(busqueda: string): Observable<any[]> {
    busqueda = busqueda.toLowerCase();
    this.Datos = JSON.parse(localStorage.getItem('Wallpapers')!).filter(((Wallpapers: { titulo: string; categorias: string; tags: string; }) => Wallpapers.titulo.toLowerCase().includes(busqueda) || Wallpapers.categorias.toLowerCase().includes(busqueda) || Wallpapers.tags.toLowerCase().includes(busqueda)));

    return of(this.Datos);
  }

  getWallpapersByUser(user: string): Observable<any[]> {
    user = user.toLowerCase();
    this.Datos = JSON.parse(localStorage.getItem('Wallpapers')!).filter(((Wallpapers: { autor: string; }) => Wallpapers.autor.toLowerCase().includes(user)));

    return of(this.Datos);
  }

  getWallpapersByFilter(propiedad: string, termino: string): Observable<any[]> {
    termino = termino.toLowerCase();
    const propiedadFiltro = propiedad;
    this.Datos = JSON.parse(localStorage.getItem('Wallpapers')!).filter(((Wallpapers : any) => Wallpapers[propiedadFiltro].toLowerCase().includes(termino)));

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

  getCategorias(){
    this.Categorias = JSON.parse(localStorage.getItem('Categorias')!);

    return of(this.Categorias);
  }

  getOneForTag(categoria: string) {
    categoria = categoria.toLowerCase();
    this.Datos = JSON.parse(localStorage.getItem('Wallpapers')!).filter(((Wallpapers: { categorias: string; }) => Wallpapers.categorias.toLowerCase().includes(categoria)));
    const random = Math.floor(Math.random() * this.Datos.length);

    
    return (this.Datos[random].ruta);
  }

}
