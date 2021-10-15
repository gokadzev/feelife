import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  shuffledArray:PLsong[];

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
    this.manager.getShuffledSongs(25,(res) => {
      this.shuffledArray = res;
    });
  }

}
