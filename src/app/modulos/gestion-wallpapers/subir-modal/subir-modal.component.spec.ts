import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirModalComponent } from './subir-modal.component';

describe('SubirModalComponent', () => {
  let component: SubirModalComponent;
  let fixture: ComponentFixture<SubirModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
