import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css']
})
export class RecentComponent implements OnInit {

  recentSongs!: PLsong[];
  GlobalStart:number = 0;
  GlobalEnd:number = 16;

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
    this.manager.getRecentSongs((res:any) => {
      this.recentSongs = res;
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
