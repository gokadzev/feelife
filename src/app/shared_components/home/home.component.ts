import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { ContentGlobalRefresherService } from 'src/app/shared_services/content-global-refresher.service';
import { DataexchangerService } from 'src/app/shared_services/dataexchanger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  songs:PLsong [];
  GlobalEnd:number = 4;
  GlobalEndExpanded = false;
  SuggestionsEnd:number = 4;
  SuggestionsEndExpanded = false;

  constructor(private dataexchanger:DataexchangerService, private refresher:ContentGlobalRefresherService) { }

  ngOnInit(): void {

    this.dataexchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.refresher.getData('songs');
  }

  showTopGlobalMore(){
    if(this.GlobalEndExpanded == false){
    this.GlobalEnd = this.songs.length;
    this.GlobalEndExpanded = true
    } else {
      this.GlobalEndExpanded = false
      this.GlobalEnd = 4
    }
  }

  showSuggestionsMore(){
    if(this.SuggestionsEndExpanded == false){
      this.SuggestionsEnd = this.songs.length;
      this.SuggestionsEndExpanded = true;
    } else {
      this.SuggestionsEndExpanded = false
      this.SuggestionsEnd = 4
    }
  }

}
