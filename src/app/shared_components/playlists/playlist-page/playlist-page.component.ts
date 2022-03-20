import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/shared_models/playlist.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {

  playlists:Playlist[];
  activePlaylist:Playlist;
  playlistId:any;
  playlistSongs:PLsong[];
  songs:PLsong[];

  constructor(private router:ActivatedRoute,private manager:DataManagerService,) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.playlistId = params.get('id');
      this.manager.getSongs((res:PLsong[]) => {
        this.songs = res;
      });
      this.manager.getPlaylists((res:Playlist[]) => {
        this.playlists = res;
        this.activePlaylist = this.playlists.filter(p => p.id == this.playlistId)[0]
        if(this.activePlaylist != undefined){
          var temporaryPlaylist=[]
          var playlistSongs=[]
          for(var i = 0; i < this.activePlaylist.songs.length; i++){
            temporaryPlaylist = this.songs.filter(s => s.id == this.activePlaylist.songs[i])
            playlistSongs.push(temporaryPlaylist[0])
          }}
          this.playlistSongs = playlistSongs
      });
    })
  }


}
