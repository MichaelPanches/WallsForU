import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {
  busqueda: string;

  images = [
    { title: 'First Slide', short: 'First Slide Short', src: "../assets/img/carousel1.jpg" },
    { title: 'Second Slide', short: 'Second Slide Short', src: "../assets/img/carousel2.jpg" },
    { title: 'Third Slide', short: 'Third Slide Short', src: "../assets/img/carousel3.jpg" }
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;
    config.keyboard = true;
    config.showNavigationArrows = true;
    config.pauseOnHover = false;
    config.pauseOnFocus = false;
    config.showNavigationIndicators = false;
    
    this.busqueda = "";
  }

  buscarImg(){
    console.log(this.busqueda)

  }

}
