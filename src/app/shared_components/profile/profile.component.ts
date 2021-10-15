import { Component, OnInit } from '@angular/core';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  songs:any;

  navStart:number = 0;
  navEnd:number = 10;

  constructor(private manager:DataManagerService) { }

  ngOnInit(): void {
    this.manager.getSongs((res) => {
      this.songs = res
    });
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
