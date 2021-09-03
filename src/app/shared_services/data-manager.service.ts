import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../shared_models/album.model';
import { Playlist } from '../shared_models/playlist.model';
import { PLsinger } from '../shared_models/singer.model';
import { PLsong } from '../shared_models/song.model';
import { DataexchangerService } from './data-exchanger.service';
import { HttpserviceService } from './httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor(private httpserv:HttpserviceService, public router:Router, private dataexchanger:DataexchangerService) { }

  favoriteSongs:any [] = [];

  
  

  randnum = Math.round(Math.random() * 900000)
  apiUrl = 'https://raw.githubusercontent.com/gokadzev/mobile-music-player-fake-api/main/mmpwa.json?' + this.randnum;
  playlistsApiUrl = 'https://raw.githubusercontent.com/gokadzev/mobile-music-player-fake-api/main/mmplaylists.json?' + this.randnum;


  getSongs(){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        this.dataexchanger.songs.emit(convertedData);
      }); 
  }

  getSingers(){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        var singers:PLsinger[] = [];
        var singer = 'something'

        for(var i = 0; i < convertedData.length; i++){
          if(singer != convertedData[i].coverphoto){
            singers.push(new PLsinger(i,convertedData[i].singer,convertedData[i].coverphoto))
            singer = convertedData[i].coverphoto
          }
        }
        this.dataexchanger.singers.emit(singers);
      })
  }

  getAlbums(){
    this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
      var tempdata = JSON.stringify(songs)
      var convertedData = JSON.parse(tempdata);
      var convertedData1:Album [] = [];

      for(var i =0; i < convertedData.length; i++){
        let filteredArray = convertedData1.filter(value => value.album === convertedData[i].album)
        if(filteredArray.length == 0){
          convertedData1.push(new Album(convertedData[i].album,convertedData[i].albumCover))
        }
      }
      this.dataexchanger.albums.emit(convertedData1);
    }); 
  }

  getPlaylists(){
      this.httpserv.getSubscribableData(this.playlistsApiUrl).subscribe(playlists=>{
        var tempdata = JSON.stringify(playlists)
        var convertedData = JSON.parse(tempdata);
        this.dataexchanger.playlists.emit(convertedData);
      });
  }

  getShuffledSongs(number:any){
    var shuffledArray:PLsong[] = [];
    var songsList:PLsong[];
    this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
      var tempdata = JSON.stringify(songs)
      songsList = JSON.parse(tempdata);
      if(number == 'all'){
        for(var i = 0; i < songsList.length; i++){
          var randNum:number = Math.round(Math.random() * songsList.length)
          if(songsList[randNum] != undefined){
            var tempArray = shuffledArray.filter(s => s.id == songsList[randNum].id);
            if(tempArray.length == 0){
              shuffledArray.push(songsList[randNum])
              tempArray = null;
            }
          }
        }
      } else {
        for(var i = 0; i < number; i++){
          var randNum:number = Math.round(Math.random() * songsList.length)
          if(songsList[randNum] != undefined){
            var tempArray = shuffledArray.filter(s => s.id == songsList[randNum].id);
            if(tempArray.length == 0){
              shuffledArray.push(songsList[randNum])
              tempArray = null;
            }
          }
        }
      }
    }); 
    this.dataexchanger.shuffledArray.emit(shuffledArray);
  }


}
