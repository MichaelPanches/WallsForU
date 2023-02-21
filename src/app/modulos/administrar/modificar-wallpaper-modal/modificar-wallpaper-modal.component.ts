import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list, deleteObject, StorageReference } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';

@Component({
  selector: 'app-modificar-wallpaper-modal',
  templateUrl: './modificar-wallpaper-modal.component.html',
  styleUrls: ['./modificar-wallpaper-modal.component.css']
})
export class ModificarWallpaperModalComponent {
  @Input() imageSrc!: string | ArrayBuffer | null;
  @Input() wallpaperAnterior!: WallpaperInterfaz;
  wallpaperNuevo!: WallpaperInterfaz;
  file: any;
  ref!: StorageReference;
  Categorias!: CategoriaInterfaz[];


  constructor(private router: Router, public activeModal: NgbActiveModal, private storage: Storage, private _galeriaService: GaleriaService, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    const self = this;

    var categorias = this.wallpaperAnterior.categorias.split(",")

    this.obtenerCategorias();

    this.Categorias.forEach(function (value) {

      if (self.wallpaperAnterior.categorias.includes(value.titulo)) {
        value.check = true;
      } else {
        value.check = false;
      }
    });




  }

  obtenerCategorias() {
    this._galeriaService.getCategorias().subscribe(data => {
      this.Categorias = data;

    });

  };



  guardarEvento($event: any) {
    this.file = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.file);

  }

  editarImagen(titulo: string, descripcion: string, etiquetas: string) {
    var categorias = "";
    this.Categorias.forEach(function (value) {
      if (value.check == true) {
        categorias = categorias + value.titulo + ", "
      }
    });

    if (this.file == null) {
      const imgUrl = this.imageSrc;
      const imgName = this.wallpaperAnterior.ruta.substr(this.wallpaperAnterior.ruta.lastIndexOf('/') + 1);
      const nav = (window.navigator as any);
      this.httpClient.get(imgUrl!.toString(), { responseType: 'blob' as 'json' })
        .subscribe((res: any) => {
          const blob = new Blob([res], { type: res.type });
          this.file = this.convertirBlob(blob, imgName);
          var ext = this.file.type.split("/", 2);
          this.imageSrc = this.file.imagen;
          var ruta = 'wallpapers/' + JSON.parse(localStorage.getItem("Usuario")!).nombre + " - " + titulo + "." + ext[1];
          const imgRef = ref(this.storage, ruta);

          this.wallpaperNuevo = {
            titulo: titulo,
            descripcion: descripcion,
            autor: JSON.parse(localStorage.getItem("Usuario")!).nombre,
            categorias: categorias,
            tags: etiquetas,
            ruta: ruta,
          };

          this.borrarWallpaper(this.wallpaperAnterior);

          uploadBytes(imgRef, this.file)
            .then(() => {
              this._galeriaService.modWallpaper(this.wallpaperAnterior, this.wallpaperNuevo);
              this.activeModal.close();
            })
            .catch(error => console.log(error))
        });
    } else {
      var ext = this.file.type.split("/", 2);
      var ruta = 'wallpapers/' + JSON.parse(localStorage.getItem("Usuario")!).nombre + " - " + titulo + "." + ext[1];

      this.imageSrc = this.file.imagen;

      const imgRef = ref(this.storage, ruta);

      this.wallpaperNuevo = {
        titulo: titulo,
        descripcion: descripcion,
        autor: JSON.parse(localStorage.getItem("Usuario")!).nombre,
        categorias: categorias,
        tags: etiquetas,
        ruta: ruta,
      };

      this.borrarWallpaper(this.wallpaperAnterior);

      uploadBytes(imgRef, this.file)
        .then(() => {
          this._galeriaService.modWallpaper(this.wallpaperAnterior, this.wallpaperNuevo);
          this.activeModal.close();

        }

        )
        .catch(error => console.log(error))

      this.activeModal.close();

    }




  }

  borrarWallpaper(wallpaper: WallpaperInterfaz) {
    this.ref = ref(this.storage, wallpaper.ruta);
    this._galeriaService.sendUpdate(true);

    deleteObject(this.ref).then(() => {


    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
  }



  convertirBlob(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  refreshComponent() {
    this.router.navigate([this.router.url])
  }

}
