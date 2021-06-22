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

  constructor(private httpserv:HttpserviceService, public router:Router, private dataexchanger:DataexchangerService) { }

  favoriteSongs:any [] = [];
  
  

  randnum = Math.round(Math.random() * 900000)
  apiUrl = 'https://raw.githubusercontent.com/gokadzev/mobile-music-player-fake-api/main/mmp.json?' + this.randnum;
  playlistsApiUrl = 'https://raw.githubusercontent.com/gokadzev/mobile-music-player-fake-api/main/mmplaylists.json?' + this.randnum;



  getData(type:string){

    if(type == 'songs'){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        this.dataexchanger.songs.emit(convertedData);
      }); 
  
    } else if (type == 'singers'){

      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        var singers:PLsinger [] = [];
        var singer = 'something'

        for(var i = 0; i < convertedData.length; i++){
          if(singer != convertedData[i].coverphoto){
            singers.push(new PLsinger(i,convertedData[i].singer,convertedData[i].coverphoto))
            singer = convertedData[i].coverphoto
          }
        }

        this.dataexchanger.singers.emit(singers);
      }); 
    } else if (type == 'playlists'){
      this.httpserv.getSubscribableData(this.playlistsApiUrl).subscribe(playlists=>{
        var tempdata = JSON.stringify(playlists)
        var convertedData = JSON.parse(tempdata);
        this.dataexchanger.playlists.emit(convertedData);
      }); 
    } else if (type == "shuffledSongs"){
      // this.dataexchanger.shuffledArray.emit(this.shuffledArray);
    } else if(type == "songs&singers"){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        this.dataexchanger.songs.emit(convertedData);

        var singers:PLsinger [] = [];

        var singer = 'something'

        for(var i = 0; i < convertedData.length; i++){
          if(singer != convertedData[i].coverphoto){
            singers.push(new PLsinger(i,convertedData[i].singer,convertedData[i].coverphoto))
            singer = convertedData[i].coverphoto
          }
        }
        this.dataexchanger.singers.emit(singers);
      }); 

    }

  }



}
