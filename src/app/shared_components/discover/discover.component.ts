import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  shuffledArray:PLsong[];

  constructor(private dataexchanger:DataexchangerService, private manager:DataManagerService) { }

  ngOnInit(): void {

    this.dataexchanger.shuffledArray.subscribe((shuffledArray:any) => {
      this.shuffledArray = shuffledArray;
    })

    this.manager.getShuffledSongs(25);
  }

}
