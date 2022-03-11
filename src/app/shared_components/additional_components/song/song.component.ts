import { Component, Input, OnInit } from '@angular/core';
import { PLsong } from 'src/app/shared_models/song.model';
import { StatusExchangerService } from 'src/app/shared_services/status-exchanger.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {


  @Input()
  song!: PLsong;

  constructor(private statusExchanger:StatusExchangerService) { }

  ngOnInit(): void {
  }

  playSong(songID:number){
    this.statusExchanger.activeSongId.emit(songID)
  }
}
