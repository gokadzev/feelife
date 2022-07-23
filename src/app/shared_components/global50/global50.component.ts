import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-global50',
  templateUrl: './global50.component.html',
  styleUrls: ['./global50.component.css']
})
export class Global50Component implements OnInit {

  songs!: PLsong[];
  GlobalStart:number = 0;
  GlobalEnd:number = 16;

  constructor( private manager:DataManagerService) { }

  ngOnInit(): void {
    this.manager.getShuffledSongs(50,(res:PLsong[]) => {
      this.songs = res;
    });

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
