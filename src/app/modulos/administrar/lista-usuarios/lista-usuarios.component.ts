import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioInterfaz } from 'src/app/interfaces/usuario.interface';
import { CuentasService } from 'src/app/servicios/cuentas.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios!: UsuarioInterfaz[];

  constructor(private _cuentasService: CuentasService, private router: Router){
    this.usuarios = _cuentasService.getUsuarios();

  }
  ngOnInit(): void {
    this.usuarios = this._cuentasService.getUsuarios();
  }

  


  eliminarUsuario(id: number){
    this._cuentasService.deleteUsuario(id);
    this.ngOnInit();

  }

  editarUsuario(id: number){
    
  }

  refreshComponent() {
    this.router.navigate([this.router.url])
  }

}
