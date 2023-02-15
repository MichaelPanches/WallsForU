import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  advertencia: string;

  constructor(private router: Router, public activeModal: NgbActiveModal) {
    this.advertencia = "Incorrecto";
  }

  onSubmit(usuario: String, password: String) {
    if (usuario == 'Admin' && password == '123') {
      alert('Inicio Correcto');
      localStorage.setItem("Usuario", "Admin");
      this.activeModal.close();
      this.refreshComponent();
      

    } else if (usuario == 'Usuario' && password == '123') {
      alert('Inicio Correcto');
      localStorage.setItem("Usuario", "Usuario");
      this.activeModal.close();
      this.refreshComponent();
      

    }
  }

  
  refreshComponent(){
    this.router.navigate([this.router.url])
 }


}
