import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarWallpaperModalComponent } from './modificar-wallpaper-modal.component';

describe('ModificarWallpaperModalComponent', () => {
  let component: ModificarWallpaperModalComponent;
  let fixture: ComponentFixture<ModificarWallpaperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarWallpaperModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarWallpaperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
