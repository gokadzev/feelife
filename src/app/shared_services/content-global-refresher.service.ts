import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from '../shared_models/playlist.model';
import { PLsinger } from '../shared_models/singer.model';
import { PLsong } from '../shared_models/song.model';
import { DataexchangerService } from './dataexchanger.service';
import { HttpserviceService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class ContentGlobalRefresherService {

  constructor(private webRequest:HttpserviceService, public router:Router, private dataexchanger:DataexchangerService) { }

  shuffledArray: any [] = [];
  songs: PLsong[] = [];
  singers: PLsinger[] = [];

  playlists:Playlist [] = [];

  favoriteSongs:any;
  
  

  randnum = Math.round(Math.random() * 900000)
  apiUrl = 'http://localhost/index.php?' + this.randnum;
  playlistsApiUrl = 'http://localhost/playlists.php?' + this.randnum;


  getAllSongs(){
    this.webRequest.getDataFromApi(this.apiUrl).subscribe((response:any) => {
    for(var i = 0; i < response.length; i++){
      var randnumber = Math.round(Math.random() * response.length);
      this.shuffledArray.push(response[randnumber])
    }

    this.songs = response;


    this.webRequest.getDataFromApi(this.playlistsApiUrl).subscribe((response:any) => {
      this.playlists = response;
    });


    var singer = 'something'

    for(var i = 0; i < response.length; i++){
      if(singer != response[i].coverphoto){
        this.singers.push(new PLsinger(i,response[i].singer,response[i].coverphoto))
        singer = response[i].coverphoto
      }

    }

     });
  }



  getSongs(){
    this.dataexchanger.songs.emit(this.songs);
  }

  getSingers(){
    this.dataexchanger.singers.emit(this.singers);
  }

  getShuffledArray(){
    this.dataexchanger.shuffledArray.emit(this.shuffledArray);
  }

  getPlaylists(){
    this.dataexchanger.playlists.emit(this.playlists)
  }


}
