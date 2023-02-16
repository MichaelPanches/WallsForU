import { Injectable } from '@angular/core';
import { UsuarioInterfaz } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  usuarios!: UsuarioInterfaz[];

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

  deleteUsuario(id: number) {
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);

    this.usuarios.forEach((usuario, index) => {
      if (usuario.id == id) this.usuarios.splice(index, 1);
    });

    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
  }

  modUsuario(usuarioNuevo: UsuarioInterfaz) {
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);
    var index = this.usuarios.findIndex(usuario => usuario.id === usuarioNuevo.id)

    if (index !== -1) {
      this.usuarios[index] = usuarioNuevo;
    }
    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
  }

  addUsuario(usuario: UsuarioInterfaz) {
    this.usuarios = JSON.parse(localStorage.getItem('Usuarios')!);
    usuario.id = this.usuarios.length + 1;
    this.usuarios.push(usuario);

    localStorage.setItem('Usuarios', JSON.stringify(this.usuarios));
  }


}
