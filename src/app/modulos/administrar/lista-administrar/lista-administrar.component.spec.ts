import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdministrarComponent } from './lista-administrar.component';

describe('ListaAdministrarComponent', () => {
  let component: ListaAdministrarComponent;
  let fixture: ComponentFixture<ListaAdministrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAdministrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAdministrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
