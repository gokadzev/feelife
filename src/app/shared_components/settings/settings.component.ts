import { Component, HostListener, OnInit } from '@angular/core';
import { DarkModeService } from 'src/app/shared_services/dark-mode.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  darkModeStatus:boolean = JSON.parse(localStorage.getItem('dark-mode')!);
  innerWidth:any;

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    this.darkModeService.darkMode$.subscribe((status:boolean) => {
      this.darkModeStatus = status;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  changeNightMode(){
    this.darkModeService.changeDarkModeStatus();
  }

}
