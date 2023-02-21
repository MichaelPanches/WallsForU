import { Component, Input } from '@angular/core';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';

import { Storage, ref, uploadBytes, listAll, getDownloadURL, list, deleteObject, StorageReference } from '@angular/fire/storage';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Router } from '@angular/router';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  @Input() Categoria!: CategoriaInterfaz;
  imagen = "";
  ruta  = "";

  constructor(private storage: Storage, private galeria: GaleriaService, private router: Router) { 

  }

  ngOnInit(): void {
    this.cargarWallpaper();
  }

  async cargarWallpaper() {
    this.ruta = this.galeria.getOneForTag(this.Categoria.titulo);
    console.log(this.ruta)
    const referencia = ref(this.storage, this.ruta);
    const url = await getDownloadURL(referencia);
    this.imagen = url;


  }

}
