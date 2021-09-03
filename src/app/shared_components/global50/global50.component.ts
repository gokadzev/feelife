import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

@Component({
  selector: 'app-global50',
  templateUrl: './global50.component.html',
  styleUrls: ['./global50.component.css']
})
export class Global50Component implements OnInit {

  songs:PLsong [];
  GlobalStart:number = 0;
  GlobalEnd:number = 16;

  constructor(private dataexchanger:DataexchangerService, private manager:DataManagerService) { }

  ngOnInit(): void {

    this.dataexchanger.shuffledArray.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.manager.getShuffledSongs(50);

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
