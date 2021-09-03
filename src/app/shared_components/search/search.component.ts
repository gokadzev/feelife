import { Component, OnInit } from '@angular/core';
import { PLsinger } from 'src/app/shared_models/singer.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

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

  constructor(private dataexchanger:DataexchangerService,private manager:DataManagerService) { }

  ngOnInit(): void {
    
    this.dataexchanger.shuffledArray.subscribe((songs:any) => {
      this.songs = songs;
      this.arrayForDataSave = songs;
    })


    this.dataexchanger.singers.subscribe((singers:any) => {
      this.singers = singers;
      this.newArrayForDataSave = singers;
    })

    this.manager.getShuffledSongs(10);
    this.manager.getSingers();

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
