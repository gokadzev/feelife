import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  songs:PLsong [];

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
    this.manager.getShuffledSongs(16,(res) => {
      this.songs = res;
    });
  }


}
