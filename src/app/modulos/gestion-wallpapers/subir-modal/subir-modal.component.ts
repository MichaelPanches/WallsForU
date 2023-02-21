import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list } from '@angular/fire/storage';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';

@Component({
  selector: 'app-subir-modal',
  templateUrl: './subir-modal.component.html',
  styleUrls: ['./subir-modal.component.css']
})
export class SubirModalComponent implements OnInit {
  wallpaper!: WallpaperInterfaz;
  imageSrc: string | ArrayBuffer | null;
  file: any;
  Categorias!: CategoriaInterfaz[];

  constructor(private router: Router, public activeModal: NgbActiveModal, private storage: Storage, private _galeriaService: GaleriaService) {
    this.imageSrc = "../assets/img/selecciona imagen.png";
  }

  ngOnInit(): void {
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    
    this.obtenerCategorias();

    this.Categorias.forEach(function (value) {
      value.check = false;
    }); 


  }

  refreshComponent(){
    this.router.navigate([this.router.url])
  }

  obtenerCategorias(){
    this._galeriaService.getCategorias().subscribe(data => {
      this.Categorias = data;
    
    });
    
  };

  

  guardarEvento($event: any){
    this.file = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.file);

  }

  subirImagen(titulo: string, descripcion: string, etiquetas: string){
    
    var ext = this.file.type.split("/", 2);

    var categorias = "";
    this.Categorias.forEach(function (value) {
      if (value.check == true){
        categorias = categorias + value.titulo + ", "
      }
    }); 



    var ruta = 'wallpapers/' + JSON.parse(localStorage.getItem("Usuario")!).nombre + " - " + titulo + "." + ext[1];

    this.imageSrc = this.file.imagen;

    const imgRef = ref(this.storage, ruta);

    this.wallpaper = {
      titulo: titulo,
      descripcion: descripcion,
      autor: JSON.parse(localStorage.getItem("Usuario")!).nombre,
      categorias: categorias,
      tags: etiquetas,
      ruta: ruta,
    };

    uploadBytes(imgRef, this.file)
    .then(() => 
      this._galeriaService.addWallpaper(this.wallpaper)
      )
    .catch(error => console.log(error))

    this.activeModal.close();
  }






}
