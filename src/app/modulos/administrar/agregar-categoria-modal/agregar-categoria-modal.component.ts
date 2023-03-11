import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-categoria-modal',
  templateUrl: './agregar-categoria-modal.component.html',
  styleUrls: ['./agregar-categoria-modal.component.css']
})
export class AgregarCategoriaModalComponent {
  categoria!: CategoriaInterfaz;
  addCategoria!: FormGroup;
  submitted = false;


  constructor(private router: Router, public activeModal: NgbActiveModal,private _categoriasService: CategoriasService, private formBuilder: FormBuilder) {
    this.addCategoria = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    }
    );
  } 
  

  onSubmit() {
    this.submitted = true;
    if (this.addCategoria.invalid) {
      return;
    }

    this.categoria = {
      titulo: this.addCategoria.controls["titulo"].value,
      descripcion: this.addCategoria.controls["descripcion"].value,
    }

    this._categoriasService.addCategoria(this.categoria).subscribe( data => {
      this._categoriasService.sendUpdate(true);
    });
    this.activeModal.close();

  }

  get f() { return this.addCategoria.controls; }


}
