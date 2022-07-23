import { Component, Input } from '@angular/core';
import { Album } from 'src/app/shared_models/album.model';

@Component({
  selector: 'app-album-cube',
  templateUrl: './album-cube.component.html',
  styleUrls: ['./album-cube.component.css']
})
export class AlbumCubeComponent {

  @Input()
  album!: Album;

  constructor() { }

}
