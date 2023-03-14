import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() mensaje!: string; 
  modalRef: any; 

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {

  }

}
