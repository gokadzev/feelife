import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared_models/album.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-albumbs',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums!: Album[];

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
    this.manager.getAlbums((res:Album[]) => {
      this.albums = res;
    });
  }

}
