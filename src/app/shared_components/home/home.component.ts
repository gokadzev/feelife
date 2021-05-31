import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataexchangerService } from 'src/app/shared_services/dataexchanger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs:PLsong [];

  constructor(private dataexchanger:DataexchangerService) { }

  ngOnInit(): void {

    this.dataexchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

  }

}
