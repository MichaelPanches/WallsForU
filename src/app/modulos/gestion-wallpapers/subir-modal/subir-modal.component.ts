import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list } from '@angular/fire/storage';
import { WallpaperInterfaz } from 'src/app/interfaces/wallpaper.interface';
import { GaleriaService } from 'src/app/servicios/galeria.service';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { FormBuilder, FormArray, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormGroup, Validators, ValidatorFn } from '@angular/forms';



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
  checkedCat = "";
  addWall!: FormGroup;
  submitted = false;

  constructor(private router: Router, public activeModal: NgbActiveModal, private storage: Storage, private _galeriaService: GaleriaService, private formBuilder: FormBuilder) {
    this.imageSrc = "../assets/img/selecciona imagen.png";

    this.addWall = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: [''],
      categorias: new FormArray([], minSelectedCheckboxes()),
      tags: ['']
    }
    );
    this.obtenerCategorias();

    this.addCheckboxes();
  }

  ngOnInit(): void {
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    this.obtenerCategorias();

    this.Categorias.forEach(function (value) {
      value.check = false;
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

  get f() { return this.addWall.controls; }

  onSubmit() {
    this.submitted = true;
    const selectedCat = this.addWall.value.categorias
      .map((checked: any, i: number) => checked ? this.Categorias[i].titulo : null)
      .filter((v: any) => v !== null);

    if (this.addWall.invalid) {
      return;
    }

    var ext = this.file.type.split("/", 2);

    var ruta = 'wallpapers/' + JSON.parse(localStorage.getItem("Usuario")!).nombre + " - " + this.addWall.controls["titulo"].value + "." + ext[1];

    this.imageSrc = this.file.imagen;

    const imgRef = ref(this.storage, ruta);

    this.wallpaper = {
      titulo: this.addWall.controls["titulo"].value,
      descripcion: this.addWall.controls["descripcion"].value,
      autor: JSON.parse(localStorage.getItem("Usuario")!).nombre,
      categorias: selectedCat.join(","),
      tags: this.addWall.controls["tags"].value,
      ruta: ruta,
    };

    uploadBytes(imgRef, this.file)
      .then(() =>
        this._galeriaService.addWallpaper(this.wallpaper)
      )
      .catch(error => console.log(error))

    this.activeModal.close();
  }

  get categorias() {
    return this.addWall.get('categorias') as FormArray;
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


