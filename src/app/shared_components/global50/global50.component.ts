import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { ContentGlobalRefresherService } from 'src/app/shared_services/content-global-refresher.service';
import { DataexchangerService } from 'src/app/shared_services/dataexchanger.service';

@Component({
  selector: 'app-global50',
  templateUrl: './global50.component.html',
  styleUrls: ['./global50.component.css']
})
export class Global50Component implements OnInit {

  songs:PLsong [];
  GlobalStart:number = 0;
  GlobalEnd:number = 16;

  constructor(private dataexchanger:DataexchangerService, private refresher:ContentGlobalRefresherService) { }

  ngOnInit(): void {

    this.dataexchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.refresher.getData('songs');

  }

  goTo(where:string){
      if(where == "Back"){
        this.GlobalStart = this.GlobalStart - 16
        this.GlobalEnd = this.GlobalEnd - 16
      } else {
        this.GlobalStart = this.GlobalStart + 16
        this.GlobalEnd = this.GlobalEnd + 16
      }
  }



}
