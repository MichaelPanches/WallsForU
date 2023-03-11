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
  categoria!: any;
  modCategoria!: FormGroup;
  submitted = false;


  constructor(private router: Router, public activeModal: NgbActiveModal,private _categoriasService: CategoriasService, private formBuilder: FormBuilder) {
    
  } 
  
  ngOnInit(): void {
    this.modCategoria = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      descripcion: ["", [Validators.required]]
    }
    );
     
    this._categoriasService.getCategoria(this.titulo).subscribe(data => {
      this.categoria = data;

      this.modCategoria = this.formBuilder.group({
        titulo: [this.categoria.titulo, [Validators.required]],
        descripcion: [this.categoria.descripcion, [Validators.required]]
      }
      );
    
    });

  }
  

  onSubmit() {
    this.submitted = true;
    if (this.modCategoria.invalid) {
      return;
    }

    var categoria = {
      id: this.categoria.id,
      titulo: this.modCategoria.controls["titulo"].value,
      descripcion: this.modCategoria.controls["descripcion"].value,
    }

    this._categoriasService.modCategoria(categoria).subscribe( data => {
      this._categoriasService.sendUpdate(true);
    });
    this.activeModal.close();

    
  }

  get f() { return this.modCategoria.controls; }

}
