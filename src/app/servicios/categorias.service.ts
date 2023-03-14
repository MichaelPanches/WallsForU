import { Injectable } from '@angular/core';
import { CategoriaInterfaz } from '../interfaces/categoria.interface';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  categorias!: CategoriaInterfaz[];
  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public getUpdate(): Observable<boolean> {

    return this.update.asObservable();
  }

  public sendUpdate(value: boolean): void {

    this.update.next(value);
  }

  getCategorias(): Observable<any> {
    var url: any;
      url = `${environment.urlBAse}${environment.pathUrl.categorias.urlListarCategorias}`;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }

    return this.http.get(url, httpOptions);
  }

  getCategoria(titulo: string) {

    const url = `${environment.urlBAse}${environment.pathUrl.categorias.urlBuscarCategoria}` + titulo;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }

    return this.http.get(url, httpOptions);
  }



  modCategoria(dato: CategoriaInterfaz) {
    let auth_token = localStorage.getItem("Token");
    const post = {
      id: dato.id,
      titulo: dato.titulo,
      descripcion: dato.descripcion
    };
    const url = `${environment.urlBAse}${environment.pathUrl.categorias.urlModificarCategoria}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${auth_token}`
      })
    }
    console.log(post)
    console.log(url)
    return this.http.post(url, post, httpOptions);
  }


  deleteCategoria(id: number) {
    let auth_token = localStorage.getItem("Token");
    const url = `${environment.urlBAse}${environment.pathUrl.categorias.urlEliminarCategoria}` + id;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${auth_token}`
      })
    }

    return this.http.post(url, httpOptions);
  }

  addCategoria(dato: CategoriaInterfaz) {
    let auth_token = localStorage.getItem("Token");
    const post = {
      titulo: dato.titulo,
      descripcion: dato.descripcion,
    };
    const url = `${environment.urlBAse}${environment.pathUrl.categorias.urlAgregarCategoria}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `bearer ${auth_token}`
      })
    }
    return this.http.post(url, post, httpOptions);
  }


}
