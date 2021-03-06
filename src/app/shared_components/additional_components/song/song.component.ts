import { Component, Input } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { StatusExchangerService } from 'src/app/shared_services/status-exchanger.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent {


  @Input()
  song!: PLsong;

  constructor(private statusExchanger:StatusExchangerService) { }

  playSong(songID:number){
    this.statusExchanger.activeSongId.emit(songID)
  }
}
