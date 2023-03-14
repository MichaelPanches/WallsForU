import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { CategoriaInterfaz } from '../interfaces/categoria.interface';
import { WallpaperInterfaz } from '../interfaces/wallpaper.interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  Datos!: WallpaperInterfaz[];
  Categorias!: CategoriaInterfaz[];
  private terminoBusqueda$ = new Subject<string>();
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public getUpdate(): Observable<boolean> {
    return this.refresh.asObservable();
  }

  public sendUpdate(value: boolean): void {
    this.refresh.next(value);
  }

  getWallpapers(busqueda?: string): Observable<any> {
    var url: any;

    if (!busqueda) {
      url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlListarWallpapers}`;
    } else {
      url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlBuscarWallpapers}` + busqueda;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }

    return this.http.get(url, httpOptions);
  }

  addWallpaper(dato: WallpaperInterfaz): Observable<any> {
    let auth_token = localStorage.getItem("Token");
    const post = {
      titulo: dato.titulo,
      descripcion: dato.descripcion,
      usuario: dato.usuario,
      categorias: dato.categorias,
      tags: dato.tags,
      ruta: dato.ruta,
    };
    const url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlAgregarWallpapers}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${auth_token}`
      })
    }
    return this.http.post(url, post, httpOptions);
  }

  deleteWallpaper(id: number) {
    let auth_token = localStorage.getItem("Token");
    const url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlBorrarWallpapers}` + id;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${auth_token}`
        ,
      })
    }

    return this.http.post(url, httpOptions);
  }

  modWallpaper(dato: WallpaperInterfaz) {
    let auth_token = localStorage.getItem("Token");
    const post = {
      id: dato.id,
      titulo: dato.titulo,
      descripcion: dato.descripcion,
      usuario: dato.usuario,
      categorias: dato.categorias,
      tags: dato.tags,
      ruta: dato.ruta,
    };
    const url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlModificarWallpapers}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${auth_token}`
      })
    }
    console.log(post)
    console.log(httpOptions)
    return this.http.post(url, post, httpOptions);
  }


  getWallpapersByUser(user: number): Observable<any> {
    var url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlWallpaperUsuario}` + user;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }

    return this.http.get(url, httpOptions);
  }

  getWallpapersByCategoria(titulo: string): Observable<WallpaperInterfaz[]> {
    const url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlBuscarCategorias}` + titulo;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }

    return this.http.get<WallpaperInterfaz[]>(url, httpOptions);
  }

  oneByCategoria(titulo: string): Observable<WallpaperInterfaz[]> {
    const url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlUnoPorCategoria}` + titulo;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }
    console.log(url)
    return this.http.get<WallpaperInterfaz[]>(url, httpOptions);
  }

  randomBanners(): Observable<WallpaperInterfaz[]> {
    const url = `${environment.urlBAse}${environment.pathUrl.wallpapers.urlRandomBanners}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }
    console.log(url)
    return this.http.get<WallpaperInterfaz[]>(url, httpOptions);
  }

  sendTermino(busqueda: string) {
    this.terminoBusqueda$.next(busqueda);
  }

  getTermino(): Observable<string> {
    return this.terminoBusqueda$.asObservable();
  }



}
