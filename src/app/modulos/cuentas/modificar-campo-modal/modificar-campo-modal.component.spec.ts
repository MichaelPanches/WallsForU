import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCampoModalComponent } from './modificar-campo-modal.component';

describe('ModificarCampoModalComponent', () => {
  let component: ModificarCampoModalComponent;
  let fixture: ComponentFixture<ModificarCampoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarCampoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarCampoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
