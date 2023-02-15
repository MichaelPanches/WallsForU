import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: String = "default";
  usuario: String | null | undefined;

  constructor(private route: Router, private modalService: NgbModal) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem("Usuario") == "Admin") {
          this.usuario = localStorage.getItem("Usuario");
          this.menuType = "logeado";
        } else {
          this.menuType = "default";
        }
      }
    })
  }

  openLogin(): void {
    const modalRef = this.modalService.open(LoginModalComponent, { centered: true, size: 'md' });
  }

  openRegister(): void {
    const modalRef = this.modalService.open(RegisterModalComponent, { centered: true, size: 'md' });
  }

  cerrarSesion(){
    localStorage.removeItem('Usuario');
    this.refreshComponent();

  }

  refreshComponent(){
    this.route.navigate([this.route.url])
 }


}
