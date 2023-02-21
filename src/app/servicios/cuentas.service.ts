import { Injectable } from '@angular/core';
import { UsuarioInterfaz } from '../interfaces/usuario.interface';

import { Observable, of, Subject, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  usuarios!: UsuarioInterfaz[];
  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    if (localStorage.getItem('Usuarios') === null || JSON.parse(localStorage.getItem('Usuarios')!).length === 0) {
      this.usuarios = [
        {
          id: 1,
          nombre: "string",
          apellido: "string",
          email: "string",
          rol: 0,
          password: "string",
        },
        {
          id: 2,
          nombre: "string",
          apellido: "aa",
          email: "string",
          rol: 0,
          password: "string",
        },
        {
          id: 3,
          nombre: "Admin",
          apellido: "A",
          email: "Admin",
          rol: 1,
          password: "123",
        }
      ]

      localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
    }

  }

  public getUpdate(): Observable<boolean> {

    return this.update.asObservable();
  }

  public sendUpdate(value: boolean): void {

    this.update.next(value);
  }

  getUsuarios() {
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);
    return this.usuarios;
  }

  getUsuario(id: number) {
    var usuario: UsuarioInterfaz;
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);
    usuario = this.usuarios.find(x => x.id === id)!;
    
    return usuario;
  }

  getUsuariosByFilter(propiedad: string, termino: string): Observable<any[]> {
    const propiedadFiltro = propiedad;
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!).filter(((Usuarios : any) => Usuarios[propiedadFiltro].toString().toLowerCase().includes(termino)));

    return of(this.usuarios);
  }

  getUsuariosSearch(busqueda: string): Observable<any[]> {
    busqueda = busqueda.toLowerCase();
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!).filter(((Usuarios: { nombre: string; apellido: string; email: string; }) => Usuarios.nombre.toLowerCase().includes(busqueda) || Usuarios.apellido.toLowerCase().includes(busqueda) || Usuarios.email.toLowerCase().includes(busqueda)));

    return of(this.usuarios);
  }

  deleteUsuario(id: number) {
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);

    this.usuarios.forEach((usuario, index) => {
      if (usuario.id == id) this.usuarios.splice(index, 1);
    });

    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
    this.sendUpdate(true);
  }

  modUsuario(usuarioNuevo: UsuarioInterfaz) {
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);
    var index = this.usuarios.findIndex(usuario => usuario.id === usuarioNuevo.id)

    if (index !== -1) {
      this.usuarios[index] = usuarioNuevo;
    }
    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
    this.sendUpdate(true);
  }

  addUsuario(usuario: UsuarioInterfaz) {
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);
    usuario.id = this.usuarios.length + 1;
    this.usuarios.push(usuario);

    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
    this.sendUpdate(true);
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

  validateEmail(email: string){
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);

    if(this.usuarios.find(x => x.email === email)){
      var index = this.usuarios.findIndex(usuario => usuario.email === email)

        return this.usuarios[index];

        
    } else {
      return false;
    }
  }


}
