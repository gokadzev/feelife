import { Component, Input, OnInit } from '@angular/core';
import { PLsinger } from 'src/app/shared_models/singer.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  @Input()
  singer!: PLsinger;

  constructor() { }

  ngOnInit(): void {
  }

}
