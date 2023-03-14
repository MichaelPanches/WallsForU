import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from 'src/app/modulos/cuentas/login-modal/login-modal.component';
import { RegisterModalComponent } from 'src/app/modulos/cuentas/register-modal/register-modal.component';
import { SubirModalComponent } from 'src/app/modulos/gestion-wallpapers/subir-modal/subir-modal.component';
import { RouterModule } from '@angular/router';
import { CuentasService } from 'src/app/servicios/cuentas.service';
import { ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  menuType: String = "default";
  adminMode: boolean = true;
  usuario: String | null | undefined;
  color = localStorage.getItem("siteColor");

  colorPickerVisible = false;



  constructor(private route: Router, private modalService: NgbModal, _cuentasService: CuentasService) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    if (localStorage.getItem("siteColor") == null) {
      localStorage.setItem("siteColor", "blue");
    }

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("Usuario") != null && JSON.parse(localStorage.getItem("Usuario")!).rol == 1) {
          this.usuario = JSON.parse(localStorage.getItem("Usuario")!).nombre + " " + JSON.parse(localStorage.getItem("Usuario")!).apellido ;
          this.adminMode = true;
        } else if (localStorage.getItem("Usuario") != null && JSON.parse(localStorage.getItem("Usuario")!).rol == 0) {
          this.adminMode = false;
          this.usuario = JSON.parse(localStorage.getItem("Usuario")!).nombre + " " + JSON.parse(localStorage.getItem("Usuario")!).apellido ;
          this.menuType = "logeado";
        } else {
          this.menuType = "default";
          this.adminMode = false;
        }
      }
    })
  }

  showColorPicker() {
    this.colorPickerVisible = true;
  }

  hideColorPicker() {
    this.colorPickerVisible = false;
  }

  changeColor(color: string) {
    this.colorPickerVisible = false;
    localStorage.setItem("siteColor", color);
    location.reload();
  }

  openLogin(): void {
    const modalRef = this.modalService.open(LoginModalComponent, { centered: true, size: 'md' });
  }

  openRegister(): void {
    const modalRef = this.modalService.open(RegisterModalComponent, { centered: true, size: 'md' });
  }

  subirWallpaper(){
    const modalRef = this.modalService.open(SubirModalComponent, { centered: true, size: 'xl' });
  }

  cerrarSesion(){
    localStorage.removeItem('Usuario');
    this.refreshComponent();
    this.route.navigate([""]);

  }

  refreshComponent(){
    this.route.navigate([this.route.url])
 }

 


}
