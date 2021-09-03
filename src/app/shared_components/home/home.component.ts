import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs:PLsong [];

  constructor(private dataexchanger:DataexchangerService, private manager:DataManagerService) { }

  ngOnInit(): void {

    this.dataexchanger.shuffledArray.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.manager.getShuffledSongs('all');
  }


}
