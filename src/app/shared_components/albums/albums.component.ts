import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/shared_models/album.model';
import { ContentGlobalRefresherService } from 'src/app/shared_services/content-global-refresher.service';
import { DataexchangerService } from 'src/app/shared_services/dataexchanger.service';

@Component({
  selector: 'app-albumbs',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums:Album [];

  constructor(private dataexchanger:DataexchangerService, private refresher:ContentGlobalRefresherService) { }

  ngOnInit(): void {

    this.dataexchanger.albums.subscribe((albums:any) => {
      this.albums = albums;
    })

    this.refresher.getData('albums');
  }

}
