import { Component, OnInit } from '@angular/core';
import { PLsinger } from 'src/app/shared_models/singer.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  songResults:PLsong [] = undefined;
  singerResults:PLsinger[] = undefined;
  songs:PLsong [];
  singers:PLsinger [];

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
  
    this.manager.getSongs((res:PLsong[]) => {
      this.songs = res;
    });
    this.manager.getSingers((res:PLsinger[]) => {
      this.singers = res;
    });

  }


  Search(newSong:string){
    let SingersFilter = this.singers.filter(value => value.singer.toLowerCase().slice(0,newSong.length) === newSong.toLowerCase())
    let SongsFilter = this.songs.filter(value => value.songtitle.toLowerCase().slice(0,newSong.length) === newSong.toLowerCase())
    if(newSong == ''){
      this.singerResults = undefined;
      this.songResults = undefined;
      SingersFilter = [];
      SongsFilter = []
    } else {
      this.singerResults = SingersFilter;
      this.songResults = SongsFilter;
    }
  }

}
