import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from '../shared_models/album.model';
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
  songs:PLsong[];
  singers:PLsinger[];
  playlists:Playlist[];
  albums:Album[];
  
  

  randnum = Math.round(Math.random() * 900000)
  apiUrl = 'https://raw.githubusercontent.com/gokadzev/mobile-music-player-fake-api/main/mmpwa.json?' + this.randnum;
  playlistsApiUrl = 'https://raw.githubusercontent.com/gokadzev/mobile-music-player-fake-api/main/mmplaylists.json?' + this.randnum;

// because of we haven't real api, we using little bit stranger implementation for get data

  getData(type:string){

    if(type == 'songs'){
      if(this.songs == undefined){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        this.songs = convertedData;
        this.dataexchanger.songs.emit(convertedData);
      }); 
    } else {
      this.dataexchanger.songs.emit(this.songs);
    }

    } else if (type == 'singers'){
      if(this.songs == undefined && this.singers == undefined){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        this.songs = convertedData;
        var singers:PLsinger [] = [];
        var singer = 'something'

        for(var i = 0; i < convertedData.length; i++){
          if(singer != convertedData[i].coverphoto){
            singers.push(new PLsinger(i,convertedData[i].singer,convertedData[i].coverphoto))
            singer = convertedData[i].coverphoto
          }
        }
        this.singers = singers;
        this.dataexchanger.singers.emit(singers);
      })} else if(this.songs != undefined && this.singers == undefined){
        var singers:PLsinger [] = [];
        var singer = 'something'

        for(var i = 0; i < this.songs.length; i++){
          if(singer != this.songs[i].coverphoto){
            singers.push(new PLsinger(i,this.songs[i].singer,this.songs[i].coverphoto))
            singer = this.songs[i].coverphoto
          }
        }
        this.singers = singers;
        this.dataexchanger.singers.emit(singers);
      } else if(this.singers != undefined){
        this.dataexchanger.singers.emit(this.singers);
      }
    } else if (type == 'playlists'){
      if(this.playlists == undefined){
      this.httpserv.getSubscribableData(this.playlistsApiUrl).subscribe(playlists=>{
        var tempdata = JSON.stringify(playlists)
        var convertedData = JSON.parse(tempdata);
        this.playlists = convertedData;
        this.dataexchanger.playlists.emit(convertedData);
      });
    } else {
      this.dataexchanger.playlists.emit(this.playlists);
    } 
    } else if (type == "shuffledSongs"){
      if(this.songs == undefined){
      var shuffledArray:PLsong[] = [];
      var songsList:PLsong[];
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        songsList = JSON.parse(tempdata);
        for(var i = 0; i <15; i++){
          var randNum:number = Math.round(Math.random() * songsList.length)
          if(songsList[randNum] != undefined){
            var tempArray = shuffledArray.filter(s => s.id == songsList[randNum].id);
            if(tempArray.length == 0){
              shuffledArray.push(songsList[randNum])
              tempArray = null;
            }
          }
        }
      }); 
      this.dataexchanger.shuffledArray.emit(shuffledArray);
    } else if(this.songs != undefined){
      var shuffledArray:PLsong[] = [];

      for(var i = 0; i <15; i++){
        var randNum:number = Math.round(Math.random() * this.songs.length)
        if(this.songs[randNum] != undefined){
          var tempArray = shuffledArray.filter(s => s.id == this.songs[randNum].id);
          if(tempArray.length == 0){
            shuffledArray.push(this.songs[randNum])
            tempArray = null;
          }
        }
      }

      this.dataexchanger.shuffledArray.emit(shuffledArray);
    }
    } else if(type == "songs&singers"){
      if(this.songs == undefined && this.singers == undefined){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        this.songs = convertedData;
        this.dataexchanger.songs.emit(convertedData);

        var singers:PLsinger [] = [];

        var singer = 'something'

        for(var i = 0; i < convertedData.length; i++){
          if(singer != convertedData[i].coverphoto){
            singers.push(new PLsinger(i,convertedData[i].singer,convertedData[i].coverphoto))
            singer = convertedData[i].coverphoto
          }
        }
        this.singers = singers;
        this.dataexchanger.singers.emit(singers);
      }); 
    } else if (this.songs == undefined && this.singers != undefined){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        this.songs = convertedData;
        this.dataexchanger.songs.emit(convertedData);
      }); 
      this.dataexchanger.singers.emit(singers);
    } else if(this.songs != undefined && this.singers != undefined){
      this.dataexchanger.songs.emit(this.songs);
      this.dataexchanger.singers.emit(this.singers);
    }
    } else if(type="albums"){
      if(this.songs == undefined && this.albums == undefined){
      this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        var tempdata = JSON.stringify(songs)
        var convertedData = JSON.parse(tempdata);
        this.songs = convertedData;
        var convertedData1:Album [] = [];

        for(var i =0; i < convertedData.length; i++){
          let filteredArray = convertedData1.filter(value => value.album === convertedData[i].album)
          if(filteredArray.length == 0){
            convertedData1.push(new Album(convertedData[i].album,convertedData[i].albumCover))
          }
        }
        this.albums = convertedData1;
        this.dataexchanger.albums.emit(convertedData1);
      }); 
    } else if (this.songs != undefined && this.albums == undefined){
      var convertedData1:Album [] = [];

      for(var i =0; i < this.songs.length; i++){
        let filteredArray = convertedData1.filter(value => value.album === this.songs[i].album)
        if(filteredArray.length == 0){
          convertedData1.push(new Album(this.songs[i].album,this.songs[i].albumCover))
        }
      }
      this.albums = convertedData1;
      this.dataexchanger.albums.emit(convertedData1);
    } else if (this.songs != undefined && this.albums != undefined){
      this.dataexchanger.albums.emit(this.albums);
    }
    }

  }



}
