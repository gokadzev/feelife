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

  apiUrl = 'https://raw.githubusercontent.com/gokadzev/mobile-music-player-fake-api/main/mmpwa.json';
  playlistsApiUrl = 'https://raw.githubusercontent.com/gokadzev/mobile-music-player-fake-api/main/mmplaylists.json';


  getSongs(callback:any){
      return this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        let tempdata = JSON.stringify(songs)
        let convertedData = JSON.parse(tempdata);
        return callback(convertedData);
      }); 
  }

  getSingers(callback:any){
      return this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
        let tempdata = JSON.stringify(songs)
        let convertedData = JSON.parse(tempdata);
        let singers:PLsinger[] = [];
        let singer = 'something'

        for(var i = 0; i < convertedData.length; i++){
          if(singer != convertedData[i].coverphoto){
            singers.push(new PLsinger(i,convertedData[i].singer,convertedData[i].coverphoto))
            singer = convertedData[i].coverphoto
          }
        }
        return callback(singers);
      })
  }

  getAlbums(callback:any){
    return this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
      let tempdata = JSON.stringify(songs)
      let convertedData = JSON.parse(tempdata);
      let convertedData1:Album [] = [];

      for(var i =0; i < convertedData.length; i++){
        let filteredArray = convertedData1.filter(value => value.album === convertedData[i].album)
        if(filteredArray.length == 0){
          convertedData1.push(new Album(convertedData[i].album,convertedData[i].albumCover))
        }
      }
      return callback(convertedData1);
    }); 
  }

  getPlaylists(callback:any){
      return this.httpserv.getSubscribableData(this.playlistsApiUrl).subscribe(playlists=>{
        let tempdata = JSON.stringify(playlists)
        let convertedData = JSON.parse(tempdata);
        return callback(convertedData);
      });
  }

  getShuffledSongs(number:any, callback:any){
    let shuffledArray = [];
    let songsList = [];
    this.httpserv.getSubscribableData(this.apiUrl).subscribe(songs=>{
      let tempdata = JSON.stringify(songs)
      songsList = JSON.parse(tempdata);
      if(number == 'all'){
        for(var i = 0; i < songsList.length; i++){
          let randNum:number = Math.round(Math.random() * songsList.length)
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
          let randNum:number = Math.round(Math.random() * songsList.length)
          if(songsList[randNum] != undefined){
            let tempArray = shuffledArray.filter(s => s.id == songsList[randNum].id);
            if(tempArray.length == 0){
              shuffledArray.push(songsList[randNum])
              tempArray = null;
            }
          }
        }
      }
    }); 
    return callback(shuffledArray);
  }


}
