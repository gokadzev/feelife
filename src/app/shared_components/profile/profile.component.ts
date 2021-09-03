import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  songs:any;

  navStart:number = 0;
  navEnd:number = 10;

  constructor(private dataExchanger:DataexchangerService,private manager:DataManagerService) { }

  ngOnInit(): void {

    //test 

    
    this.dataExchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.manager.getSongs();
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
