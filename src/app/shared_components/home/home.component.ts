import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs:PLsong [];

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {

    this.manager.getShuffledSongs('all',(res:any) => {
      this.songs = res;
    });
  }


}
