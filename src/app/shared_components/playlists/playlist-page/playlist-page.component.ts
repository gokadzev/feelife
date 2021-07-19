import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/shared_models/playlist.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { ContentGlobalRefresherService } from 'src/app/shared_services/content-global-refresher.service';
import { DataexchangerService } from 'src/app/shared_services/dataexchanger.service';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {

  playlists:Playlist[];
  activePlaylist:Playlist[];
  playlistName:string;
  playlistCover:string;
  playlistSongs:PLsong[];
  songs:PLsong[];

  constructor(private router:ActivatedRoute,private dataExchanger:DataexchangerService,private contentRefresher:ContentGlobalRefresherService,) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.playlistName = params.get('playlist')
    })

    this.dataExchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.dataExchanger.playlists.subscribe((playlists:any) => {
      this.playlists = playlists;
      this.activePlaylist = this.playlists.filter(p => p.name == this.playlistName)
      this.playlistCover = this.activePlaylist[0].cover

      if(this.activePlaylist != undefined){
        var temporaryPlaylist=[]
        var playlistSongs=[]
        for(var i = 0; i < this.activePlaylist[0].songs.length; i++){
          temporaryPlaylist = this.songs.filter(s => s.id == this.activePlaylist[0].songs[i])
          playlistSongs.push(temporaryPlaylist[0])
        }}
        this.playlistSongs = playlistSongs
    })

    this.contentRefresher.getData('songs');
    this.contentRefresher.getData('playlists');
  }


}
