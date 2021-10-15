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

  songs:PLsong [];
  singers:PLsinger [];
  arrayForDataSave:PLsong[];
  newArrayForDataSave:PLsinger[];

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
  
    this.manager.getShuffledSongs(10,(res) => {
      this.songs = res;
      this.arrayForDataSave = this.songs;
      this.newArrayForDataSave = this.singers;
    });
    this.manager.getSingers((res) => {
      this.singers = res;
    });

  }


  Search(newSong:any){
    this.songs = this.arrayForDataSave;

    let SingersFilter = this.arrayForDataSave.filter(value => value.singer.toLowerCase().slice(0,newSong.length) === newSong.toLowerCase())
    let SongsFilter = this.arrayForDataSave.filter(value => value.songtitle.toLowerCase().slice(0,newSong.length) === newSong.toLowerCase())
    SingersFilter = SingersFilter.concat(SongsFilter)
    if(newSong == ''){
      this.songs = this.arrayForDataSave;
      SingersFilter = [];
    } else {
      this.songs = [];
      this.songs = SingersFilter;
    }
  }

}
