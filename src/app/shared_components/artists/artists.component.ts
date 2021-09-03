import { Component, OnInit } from '@angular/core';
import { PLsinger } from 'src/app/shared_models/singer.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  singers:PLsinger [] = [];

  constructor(private dataexchanger:DataexchangerService, private manager:DataManagerService) { }

  ngOnInit(): void {

    this.dataexchanger.singers.subscribe((singers:any) => {
      this.singers = singers;
    })

    this.manager.getSingers();


  }

}
