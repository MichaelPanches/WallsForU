import { Injectable } from '@angular/core';
import { UsuarioInterfaz } from '../interfaces/usuario.interface';

import { Observable, of, Subject, BehaviorSubject  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  usuarios!: UsuarioInterfaz[];
  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  public getUpdate(): Observable<boolean> {

    return this.update.asObservable();
  }

  public sendUpdate(value: boolean): void {

    this.update.next(value);
  }

  getUsuarios(): Observable<UsuarioInterfaz[]> {
    var url = `${environment.urlBAse}${environment.pathUrl.usuarios.urlListarUsuarios}`;
 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }
    return this.http.get<UsuarioInterfaz[]>(url, httpOptions);
  }

  getUsuario(id: number) {
    const url = `${environment.urlBAse}${environment.pathUrl.usuarios.urlBuscarUsuario}` + id;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }

    return this.http.get(url, httpOptions);
  }

  getUsuariosByFilter(propiedad: string, termino: string): Observable<any[]> {
    const propiedadFiltro = propiedad;
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!).filter(((Usuarios : any) => Usuarios[propiedadFiltro].toString().toLowerCase().includes(termino)));

    return of(this.usuarios);
  }

  deleteUsuario(id: number) {
    const url = `${environment.urlBAse}${environment.pathUrl.usuarios.urlEliminarUsuario}` + id;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }

    return this.http.post(url, httpOptions);
  }

  modUsuario(dato: UsuarioInterfaz): Observable<any> {
    const post = {
      id: dato.id,
      nombre: dato.nombre,
      apellido: dato.apellido,
      email: dato.email,
      rol: dato.rol,
      password: dato.password,
    };
    const url = `${environment.urlBAse}${environment.pathUrl.usuarios.urlModificarUsuario}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    console.log(post)
    console.log(url)
    return this.http.post(url, post, httpOptions);
  }

  addUsuario(dato: UsuarioInterfaz): Observable<any> {
    const post = {
      nombre: dato.nombre,
      apellido: dato.apellido,
      email: dato.email,
      rol: dato.rol,
      password: dato.password,
    };
    const url = `${environment.urlBAse}${environment.pathUrl.usuarios.urlAgregarUsuario}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    return this.http.post(url, post, httpOptions);
  }

  getUsuarioEmail(email: string): Observable <any> {
    const url = `${environment.urlBAse}${environment.pathUrl.usuarios.urlBuscarUsuarioEmail}` + email;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        ,
      })
    }

    return this.http.get(url, httpOptions);
  }

  validateUsuario(email: string, password: string){

    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);

    if(this.usuarios.find(x => x.email === email)){
      var index = this.usuarios.findIndex(usuario => usuario.email === email)
      if(this.usuarios[index].password === password){
        localStorage.setItem("Usuario", JSON.stringify(this.usuarios[index]));
        return this.usuarios[index];
        
      } else {
        return false;
      }
        
    } else {
      return false;
    }
  }

  


}
