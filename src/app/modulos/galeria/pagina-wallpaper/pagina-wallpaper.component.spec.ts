import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaWallpaperComponent } from './pagina-wallpaper.component';

describe('PaginaWallpaperComponent', () => {
  let component: PaginaWallpaperComponent;
  let fixture: ComponentFixture<PaginaWallpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaWallpaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
