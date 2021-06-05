import { Component, OnInit } from '@angular/core';
import { PLsinger } from 'src/app/shared_models/singer.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { ContentGlobalRefresherService } from 'src/app/shared_services/content-global-refresher.service';
import { DataexchangerService } from 'src/app/shared_services/dataexchanger.service';
import { SingerdataexchangeService } from 'src/app/shared_services/singerdataexchange.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {

  singerId:number;
  singerSongs:PLsong [] = [];
  singers:PLsinger[] = [];
  songs:PLsong[] = [];

  constructor(private singdex:SingerdataexchangeService,private dataexchanger:DataexchangerService, private refresher:ContentGlobalRefresherService) { }

  ngOnInit(): void {

    this.dataexchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.dataexchanger.singers.subscribe((singers:any) => {
      this.singers = singers;
    })



    this.refresher.getSongs();
    this.refresher.getSingers();

    this.singdex.singerdataexchange.subscribe((singerID:any) => {
      this.getSingerInfo(singerID);
    })
  }


  getSingerInfo(singerID:any){
    this.singerId = singerID;
    this.singerSongs = this.songs.filter(s => s.singer == this.singers[this.singerId].singer);
  }
}
