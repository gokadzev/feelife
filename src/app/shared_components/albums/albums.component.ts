import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared_models/album.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

@Component({
  selector: 'app-albumbs',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums:Album [];

  constructor(private dataexchanger:DataexchangerService, private manager:DataManagerService) { }

  ngOnInit(): void {

    this.dataexchanger.albums.subscribe((albums:any) => {
      this.albums = albums;
    })

    this.manager.getAlbums();
  }

}
