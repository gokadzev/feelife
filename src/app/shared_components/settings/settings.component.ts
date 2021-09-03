import { Component, HostListener, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';
import { StatusExchangerService } from 'src/app/shared_services/status-exchanger.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  animationStatus:boolean = JSON.parse(localStorage.getItem('animations'))
  darkModeStorage:any = localStorage.getItem('dark-mode')
  darkModeStatus:boolean;
  innerWidth:any;

  constructor(private darkModeService: DarkModeService, private statusExchanger:StatusExchangerService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    
    this.darkModeService.darkMode$.subscribe((status:any) => {
      this.darkModeStatus = status
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  changeNightMode(){
    this.darkModeService.toggle();
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
