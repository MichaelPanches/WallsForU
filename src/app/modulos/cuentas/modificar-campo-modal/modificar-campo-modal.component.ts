import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-modificar-campo-modal',
  templateUrl: './modificar-campo-modal.component.html',
  styleUrls: ['./modificar-campo-modal.component.css']
})
export class ModificarCampoModalComponent implements OnInit {
  @Input() usuario!: any;
  @Input() campo!: string;
  @Input() propiedad!: string;
  valor!: string;

  constructor(private router: Router, public activeModal: NgbActiveModal, private _cuentasService: CuentasService) {
  }

  ngOnInit(): void {
    const myproperty = this.propiedad;
    this.valor = this.usuario[myproperty];
  }

  modificar(nuevoValor: string){
    const myproperty = this.propiedad;
    this.usuario[myproperty] = nuevoValor;
    this.activeModal.close();


  }

  



  refreshComponent() {
    this.router.navigate([this.router.url])
  }


}
