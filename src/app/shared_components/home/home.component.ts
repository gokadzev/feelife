import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { StatusExchangerService } from 'src/app/shared_services/status-exchanger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs:PLsong [];
  recentSongs:PLsong[] = [];

  constructor(private manager:DataManagerService,private statusExchanger:StatusExchangerService) { }

  ngOnInit(): void {
    this.manager.getShuffledSongs('all',(res:any) => {
      this.songs = res;
    });
    
    this.manager.getRecentSongs((res:any) => {
      this.recentSongs = res;
    });

    this.statusExchanger.activeSongId.subscribe((songId:number) => {
      let song = this.songs.filter(s => s.id == songId + 1);
      let isAlreadyAdded = this.recentSongs.filter(s => s.id == songId + 1);
      if(song.length != 0 && isAlreadyAdded.length == 0){
        this.manager.addRecentSong(song[0]);
      }
    })
  }


}
