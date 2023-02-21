import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCategoriaModalComponent } from './agregar-categoria-modal.component';

describe('AgregarCategoriaModalComponent', () => {
  let component: AgregarCategoriaModalComponent;
  let fixture: ComponentFixture<AgregarCategoriaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarCategoriaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarCategoriaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
