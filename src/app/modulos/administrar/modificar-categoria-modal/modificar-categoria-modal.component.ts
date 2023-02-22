import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaInterfaz } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-categoria-modal',
  templateUrl: './modificar-categoria-modal.component.html',
  styleUrls: ['./modificar-categoria-modal.component.css']
})
export class ModificarCategoriaModalComponent {
  @Input() public titulo!: string;
  categoria!: CategoriaInterfaz;
  modCategoria!: FormGroup;
  submitted = false;


  constructor(private router: Router, public activeModal: NgbActiveModal,private _categoriasService: CategoriasService, private formBuilder: FormBuilder) {
  } 
  
  ngOnInit(): void {
    this.categoria = this._categoriasService.getCategoria(this.titulo);

    this.modCategoria = this.formBuilder.group({
      titulo: [this.categoria.titulo, [Validators.required]],
      descripcion: [this.categoria.descripcion, [Validators.required]]
    }
    );
  }
  

  onSubmit() {
    this.submitted = true;
    if (this.modCategoria.invalid) {
      return;
    }

    var categoria = {
      titulo: this.modCategoria.controls["titulo"].value,
      descripcion: this.modCategoria.controls["descripcion"].value,
    }

    this._categoriasService.modCategoria(categoria, this.categoria);
    this.activeModal.close();

    
  }

  get f() { return this.modCategoria.controls; }

}
