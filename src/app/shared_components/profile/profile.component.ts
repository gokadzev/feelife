import { Component, OnInit } from '@angular/core';
import { ContentGlobalRefresherService } from 'src/app/shared_services/content-global-refresher.service';
import { DataexchangerService } from 'src/app/shared_services/dataexchanger.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  songs:any;

  navStart:number = 0;
  navEnd:number = 10;

  constructor(private dataExchanger:DataexchangerService,private contentRefresher:ContentGlobalRefresherService) { }

  ngOnInit(): void {

    //test 

    
    this.dataExchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.contentRefresher.getData('songs');
  }


  goBack(){
    this.navStart= this.navStart - 10;
    this.navEnd= this.navEnd - 10;
  }

  goNext(){
    this.navStart= this.navStart + 10;
    this.navEnd= this.navEnd + 10;
  }


}
