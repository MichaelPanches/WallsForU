import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {


  constructor(private router: Router, public activeModal: NgbActiveModal) {
  }

  onSubmit(usuario: String, password: String) {
    if (usuario == '123' && password == '123') {
      alert('Inicio Correcto');
      this.activeModal.close();
      

    }
  }
  

}
