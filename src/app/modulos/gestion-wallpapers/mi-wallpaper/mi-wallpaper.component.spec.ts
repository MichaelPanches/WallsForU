import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiWallpaperComponent } from './mi-wallpaper.component';

describe('MiWallpaperComponent', () => {
  let component: MiWallpaperComponent;
  let fixture: ComponentFixture<MiWallpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiWallpaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
