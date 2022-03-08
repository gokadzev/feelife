import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  top50songs:PLsong [] = [];
  recentSongs:PLsong[] = [];
  recommendedSongs:PLsong[] = [];

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
    this.manager.getRecentSongs((res:any) => {
      this.recentSongs = res;
    });

    this.manager.getShuffledSongs(50,(res:any) => {
      this.top50songs = res;
    });

    this.manager.getShuffledSongs(50,(res:any) => {
      this.recommendedSongs = res;
    });
  }

}
