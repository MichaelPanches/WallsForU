import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list } from '@angular/fire/storage';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { FormBuilder, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { SpinnerComponent } from 'src/app/componentes/spinner/spinner.component';



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
  addWall!: FormGroup;
  submitted = false;
  isImageHovered = false;
  archivoSeleccionado = false;




  constructor(private modalService: NgbModal, private router: Router, public activeModal: NgbActiveModal, private storage: Storage, private _galeriaService: GaleriaService, private _categoriasService: CategoriasService, private formBuilder: FormBuilder) {
    this.imageSrc = "../assets/img/selecciona imagen.png";

    this.addWall = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: [''],
      categorias: new FormArray([], minSelectedCheckboxes()),
      tags: [''],
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



  ngOnInit(): void {
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    this._categoriasService.getCategorias().subscribe(data => {
      this.Categorias = data;
      this.addCheckboxes();
      this.Categorias.forEach(function (value) {
        value.check = false;
      });

    });

  }

  get checkFormArray() {

    return this.addWall.controls["categorias"] as FormArray;
  }

  private addCheckboxes() {
    this.Categorias.forEach(() => this.checkFormArray.push(new FormControl(false)));
  }


  refreshComponent() {
    this.router.navigate([this.router.url])
  }




  guardarEvento($event: any) {
    this.file = $event.target.files[0];
    this.archivoSeleccionado = true;

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(this.file);

  }

  get f() { return this.addWall.controls; }

  onSubmit() {
    this.submitted = true;
    const selectedCat = this.addWall.value.categorias
      .map((checked: any, i: number) => checked ? this.Categorias[i].titulo : null)
      .filter((v: any) => v !== null);

    if (this.addWall.invalid) {
      return;
    }

    const modalRef = this.modalService.open(SpinnerComponent, { centered: true, size: 'sm', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.mensaje = "Subiendo wallpaper...";
    
    var ruta = 'wallpapers/' + JSON.parse(localStorage.getItem("Usuario")!).nombre + " - " + this.addWall.controls["titulo"].value + "." + this.getFileExtension();
    console.log(this.getFileExtension())

    const imgRef = ref(this.storage, ruta);

    this.wallpaper = {
      titulo: this.addWall.controls["titulo"].value,
      descripcion: this.addWall.controls["descripcion"].value,
      usuario: JSON.parse(localStorage.getItem("Usuario")!).id,
      categorias: selectedCat.join(",") + ',',
      tags: this.addWall.controls["tags"].value,
      ruta: ruta,
    };

    uploadBytes(imgRef, this.file)
      .then(() =>
        this._galeriaService.addWallpaper(this.wallpaper).subscribe(data => {
          this._galeriaService.sendUpdate(true);
          this.activeModal.close();
          modalRef.close();
        })
      )
      .catch(error => console.log(error))
  }

  get categorias() {
    return this.addWall.get('categorias') as FormArray;
  }

  getFileExtension() {
    const filename = this.file.type;
    console.log(filename);
    const extension = filename.split('/').pop();
    return extension;
  }

  archivoSelected(controlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];

      if (control.errors && !control.errors['archivoSelected']) {
        return
      }

      if (this.file == undefined) {
        control.setErrors({ archivoSelected: true });

      } else if ((this.file != undefined) && (this.file.type.toString().indexOf("image") == -1)) {
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


