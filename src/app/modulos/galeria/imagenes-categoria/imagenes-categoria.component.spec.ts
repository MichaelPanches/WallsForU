import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesCategoriaComponent } from './imagenes-categoria.component';

describe('ImagenesCategoriaComponent', () => {
  let component: ImagenesCategoriaComponent;
  let fixture: ComponentFixture<ImagenesCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagenesCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenesCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
