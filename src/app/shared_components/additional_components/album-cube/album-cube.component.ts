import { Component, Input, OnInit } from '@angular/core';
import { Album } from 'src/app/shared_models/album.model';
import { StatusExchangerService } from 'src/app/shared_services/status-exchanger.service';

@Component({
  selector: 'app-album-cube',
  templateUrl: './album-cube.component.html',
  styleUrls: ['./album-cube.component.css']
})
export class AlbumCubeComponent implements OnInit {

  @Input()
  album!: Album;

  constructor(private statusExchanger:StatusExchangerService) { }

  ngOnInit(): void {
  }



}
