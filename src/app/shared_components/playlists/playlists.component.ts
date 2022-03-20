import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/shared_models/playlist.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlists:Playlist[] = [];

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
    this.manager.getPlaylists((res:Playlist[]) => {
      this.playlists = res;
    });
  }

}
