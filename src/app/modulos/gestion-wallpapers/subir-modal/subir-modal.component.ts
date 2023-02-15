import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list } from '@angular/fire/storage';
import { WallpaperInterfaz } from 'src/app/interfaces/WallpaperInterfaz';
import { GaleriaService } from 'src/app/servicios/galeria.service';

@Component({
  selector: 'app-subir-modal',
  templateUrl: './subir-modal.component.html',
  styleUrls: ['./subir-modal.component.css']
})
export class SubirModalComponent implements OnInit {
  wallpaper!: WallpaperInterfaz;
  imageSrc: string | ArrayBuffer | null;
  file: any;

  constructor(private router: Router, public activeModal: NgbActiveModal, private storage: Storage, private galeria: GaleriaService) {
    this.imageSrc = "../assets/img/selecciona imagen.png";
  }
  ngOnInit(): void {
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.file);
  }

  

  guardarEvento($event: any){
    this.file = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.file);

  }

  subirImagen(titulo: string, descripcion: string, categorias: string, etiquetas: string){
    
    var ext = this.file.type.split("/", 2);
    var ruta = 'wallpapers/' + localStorage.getItem("Usuario") + " - " + titulo + "." + ext[1];

    this.imageSrc = this.file.imagen;

    const imgRef = ref(this.storage, ruta);

    this.wallpaper = {
      nombre: titulo,
      descripcion: descripcion,
      autor: localStorage.getItem("Usuario")!,
      categorias: categorias,
      tags: etiquetas,
      ruta: ruta,
    };

    uploadBytes(imgRef, this.file)
    .then(() => 
      this.galeria.addWallpaper(this.wallpaper)
      )
    .catch(error => console.log(error))

    //this.activeModal.close();
  }






}
