import { Component, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { ContentGlobalRefresherService } from 'src/app/shared_services/content-global-refresher.service';
import { DataexchangerService } from 'src/app/shared_services/dataexchanger.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  songs:PLsong [];
  SuggestionsStart:number = 0;
  SuggestionsEnd:number = 16;

  constructor(private dataexchanger:DataexchangerService, private refresher:ContentGlobalRefresherService) { }

  ngOnInit(): void {
    this.dataexchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.refresher.getData('songs');
  }
  
  goTo(where:string){
    if(where == "Back"){
      this.SuggestionsStart = this.SuggestionsStart - 16
      this.SuggestionsEnd = this.SuggestionsEnd - 16
    } else {
      this.SuggestionsStart = this.SuggestionsStart + 16
      this.SuggestionsEnd = this.SuggestionsEnd + 16
    }
}

}
