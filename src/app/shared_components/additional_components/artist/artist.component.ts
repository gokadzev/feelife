import { Component, Input, OnInit } from '@angular/core';
import { PLsinger } from 'src/app/shared_models/singer.model';
import { SingerdataexchangeService } from 'src/app/shared_services/singerdataexchange.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  @Input()
  singer!: PLsinger;

  constructor(private singerdex:SingerdataexchangeService) { }

  ngOnInit(): void {
  }


}
