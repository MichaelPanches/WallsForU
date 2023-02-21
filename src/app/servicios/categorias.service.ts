import { Injectable } from '@angular/core';
import { CategoriaInterfaz } from '../interfaces/categoria.interface';
import { Observable, of, Subject, BehaviorSubject  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  categorias!: CategoriaInterfaz[];
  private update: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public getUpdate(): Observable<boolean> {

    return this.update.asObservable();
  }

  public sendUpdate(value: boolean): void {

    this.update.next(value);
  }


  getCategoriasSearch(busqueda: string): Observable<any[]> {
    busqueda = busqueda.toLowerCase();
    this.categorias = JSON.parse(localStorage.getItem('Categorias')!).filter(((Usuarios: { titulo: string;}) => Usuarios.titulo.toLowerCase().includes(busqueda)));

    return of(this.categorias);
  }

  deleteCategoria(titulo: string) {
    this.categorias = JSON.parse(localStorage.getItem('Categorias')!);

    this.categorias.forEach((categoria, index) => {
      if (categoria.titulo == titulo) this.categorias.splice(index, 1);
    });

    localStorage.setItem('Categorias', JSON.stringify(this.categorias));
    this.sendUpdate(true);
  }

  addCategoria(categoria: CategoriaInterfaz) {
    this.categorias = JSON.parse(localStorage.getItem('Categorias')!);
    this.categorias.push(categoria);

    localStorage.setItem('Categorias', JSON.stringify(this.categorias));
    this.sendUpdate(true);
  }

  modCategoria(categoriaNueva: CategoriaInterfaz, categoriaVieja: CategoriaInterfaz) {
    this.categorias = JSON.parse(localStorage.getItem('Categorias')!);
    var index = this.categorias.findIndex(categoria => categoria.titulo === categoriaVieja.titulo)

    if (index !== -1) {
      this.categorias[index] = categoriaNueva;
    }
    localStorage.setItem('Categorias', JSON.stringify(this.categorias));
    this.sendUpdate(true);
  }

  getCategoria(titulo: string) {
    var categoria: CategoriaInterfaz;
    this.categorias = JSON.parse(localStorage.getItem('Categorias')!);
    categoria = this.categorias.find(x => x.titulo === titulo)!;
    
    return categoria;
  }




}
