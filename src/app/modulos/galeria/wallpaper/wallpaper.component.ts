import { Component, Input } from '@angular/core';
import { WallpaperInterfaz } from 'src/app/interfaces/WallpaperInterfaz';

@Component({
  selector: 'app-wallpaper',
  templateUrl: './wallpaper.component.html',
  styleUrls: ['./wallpaper.component.css']
})
export class WallpaperComponent {
  @Input() wallpaper!: WallpaperInterfaz;

}
