import { Component, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DarkModeService } from 'src/app/shared_services/dark-mode.service';
import { StatusExchangerService } from 'src/app/shared_services/status-exchanger.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  animationStatus:boolean = JSON.parse(localStorage.getItem('animations'));
  darkModeStatus:boolean = JSON.parse(localStorage.getItem('dark-mode'));
  innerWidth:any;

  constructor(private darkModeService: DarkModeService, private statusExchanger:StatusExchangerService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    this.darkModeService.darkMode$.subscribe((status:boolean) => {
      this.darkModeStatus = status;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  changeNightMode(){
    this.darkModeService.changeDarkModeStatus();
  }

  changeAnimationStatus(){
    if(this.animationStatus == true){
      localStorage.setItem('animations','false')
    } else {
      localStorage.setItem('animations','true')
    }

    this.animationStatus = JSON.parse(localStorage.getItem('animations'))
    this.statusExchanger.animationsStatus.emit(this.animationStatus)
  }

}
