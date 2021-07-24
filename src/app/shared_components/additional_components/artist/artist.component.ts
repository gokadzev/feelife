import { Component, Input, OnInit } from '@angular/core';
import { PLsinger } from 'src/app/shared_models/singer.model';
import { StatusExchangerService } from 'src/app/shared_services/status-exchanger.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  @Input()
  singer!: PLsinger;

  animationStatus:boolean = JSON.parse(localStorage.getItem('animations'))

  constructor(private statusExchanger:StatusExchangerService) { }

  ngOnInit(): void {
    this.statusExchanger.animationsStatus.subscribe((status:boolean) => {
      this.animationStatus = status
    })
  }


}
