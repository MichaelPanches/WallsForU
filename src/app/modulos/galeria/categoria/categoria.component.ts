import { Component, Input } from '@angular/core';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';

import { Storage, ref, uploadBytes, listAll, getDownloadURL, list, deleteObject, StorageReference } from '@angular/fire/storage';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Router } from '@angular/router';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  @Input() Categoria!: CategoriaInterfaz;
  wallpaper!: WallpaperInterfaz;
  imagen = "";
  ruta  = "";
  ref! : StorageReference;


  constructor(private storage: Storage, private _galeriaService: GaleriaService, private router: Router) { 

  }

  ngOnInit(): void {
    this._galeriaService.oneByCategoria(this.Categoria.titulo).subscribe(data => {
      this.wallpaper = data[0];
      if (this.wallpaper != undefined) {
        this.cargarWallpaper(this.wallpaper.ruta);
      }
      
    })


  }

  async cargarWallpaper(ruta: string) {
    console.log(ruta)

      const referencia = ref(this.storage, ruta);
      const url = await getDownloadURL(referencia);
      this.ref = referencia;
      this.imagen = url;
    
  }
}
