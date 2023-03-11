import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list, deleteObject, StorageReference } from '@angular/fire/storage';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, from, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { FormBuilder, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { CategoriasService } from 'src/app/servicios/categorias.service';

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
  modWall!: FormGroup;
  submitted = false;

  isImageHovered = false;
  archivoSeleccionado = false;


  constructor(private router: Router, public activeModal: NgbActiveModal, private storage: Storage, private _galeriaService: GaleriaService, private _categoriasService: CategoriasService, private httpClient: HttpClient, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.ref = ref(this.storage, this.wallpaperAnterior.ruta);
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    const self = this;

    var categorias = this.wallpaperAnterior.categorias.split(",")

    this.obtenerCategorias();

    this.modWall = this.formBuilder.group({
      titulo: [this.wallpaperAnterior.titulo, [Validators.required]],
      descripcion: [this.wallpaperAnterior.descripcion],
      categorias: new FormArray([], minSelectedCheckboxes()),
      tags: [this.wallpaperAnterior.tags],
      archivo: ['']
    },
      {
        validators: [this.archivoSelected('archivo'),],
        updateOn: 'submit'
      }
    );


  }

  onImageMouseOver() {
    this.isImageHovered = true;
  }

  onImageMouseLeave() {
    this.isImageHovered = false;
  }

  onImageClick() {
    const imageOverlay = document.querySelector('.image-overlay');
    const image = document.querySelector('.image-container img') as HTMLImageElement;

    if (!image.classList.contains('centered')) {
      image.classList.add('centered');

      const enlargedImageDiv = document.createElement('div');
      enlargedImageDiv.style.display = 'flex';
      enlargedImageDiv.style.justifyContent = 'center';
      enlargedImageDiv.style.alignItems = 'center';
      enlargedImageDiv.style.position = 'fixed';
      enlargedImageDiv.style.top = '0';
      enlargedImageDiv.style.left = '0';
      enlargedImageDiv.style.width = '100%';
      enlargedImageDiv.style.height = '100%';
      enlargedImageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      enlargedImageDiv.style.zIndex = '9999';
      enlargedImageDiv.classList.add('enlarged-image-overlay'); // Agrega una clase al elemento

      const enlargedImage = document.createElement('img');
      enlargedImage.src = image.src;
      enlargedImage.style.maxWidth = '80%';
      enlargedImage.style.maxHeight = '80%';

      enlargedImageDiv.appendChild(enlargedImage);
      document.body.appendChild(enlargedImageDiv);

      // Agrega un event listener al elemento que detecte un clic y elimine el elemento del DOM
      enlargedImageDiv.addEventListener('click', () => {
        image.classList.remove('centered');
        document.querySelector('.enlarged-image-overlay')?.remove();
      });

    } else {
      image.classList.remove('centered');
      document.querySelector('.enlarged-image-overlay')?.remove();
    }
  }


  obtenerCategorias() {
    this._categoriasService.getCategorias().subscribe(data => {
      this.Categorias = data;
      this.addCheckboxes();


    });

  };

  get checkFormArray() {

    return this.modWall.controls["categorias"] as FormArray;
  }

  private addCheckboxes() {
    this.Categorias.forEach((categoria) => {
      if (this.wallpaperAnterior.categorias.includes(categoria.titulo)) {
        categoria.check = true;
      } else {
        categoria.check = false;
      }
      this.checkFormArray.push(new FormControl(categoria.check))

    });
  }



  guardarEvento($event: any) {
    this.file = $event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.file);

  }

  onSubmit() {
    this.submitted = true;

    if (this.modWall.invalid) {
      return;
    }

    const selectedCat = this.modWall.value.categorias
      .map((checked: any, i: number) => checked ? this.Categorias[i].titulo : null)
      .filter((v: any) => v !== null);

    this.wallpaperNuevo = {
      id: this.wallpaperAnterior.id,
      titulo: this.modWall.controls["titulo"].value,
      descripcion: this.modWall.controls["descripcion"].value,
      usuario: this.wallpaperAnterior.usuario,
      categorias: selectedCat.join(',') + ',',
      tags: this.modWall.controls["tags"].value,
      ruta: 'wallpapers/' + JSON.parse(localStorage.getItem("Usuario")!).nombre + " - " + this.modWall.controls["titulo"].value + ".",
    };

    let imgObservable$: Observable<Blob>;

    if (this.file == null) {
      imgObservable$ = this.httpClient.get(this.imageSrc!.toString(), { responseType: 'blob' });
    } else {
      imgObservable$ = of(this.file);
    }

    imgObservable$.pipe(
      switchMap((res: Blob) => {
        const blob = new Blob([res], { type: res.type });
        this.file = this.convertirBlob(blob, this.wallpaperNuevo.titulo);
        console.log(res.type)
        console.log(this.file)
        console.log(this.wallpaperNuevo.ruta)
        this.wallpaperNuevo.ruta = this.wallpaperNuevo.ruta + this.getFileExtension();
        const imgRef = ref(this.storage, this.wallpaperNuevo.ruta);

        return from(deleteObject(this.ref)).pipe(
          catchError(() => of(null)),
          switchMap(() => uploadBytes(imgRef, this.file))
        ).toPromise();
      }),
      switchMap(() => this._galeriaService.modWallpaper(this.wallpaperNuevo)),
      tap(() => {
        this._galeriaService.sendUpdate(true);
        this.activeModal.close();
      }),
      catchError((error: any) => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe();
  }

  getFileExtension() {
    const filename = this.file.type;
    console.log(filename);
    const extension = filename.split('/').pop();
    return extension;
  }

  get f() { return this.modWall.controls; }



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

  archivoSelected(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors['archivoSelected']) {
        return
      }

      if ((this.file != undefined) && (this.file.type.toString().indexOf("image") == -1)) {
        control.setErrors({ badFile: true });
      } else {
        control.setErrors(null);
      }

    }
  }

}


function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: AbstractControl) => {
    if (formArray instanceof FormArray) {
      const totalSelected = formArray.controls
        .map((control) => control.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);
      return totalSelected >= min ? null : { required: true };
    }

    throw new Error('array');
  };

  return validator;
}


