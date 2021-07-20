import { Component, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  animationStatus:any = localStorage.getItem('animations')
  darkModeStorage:any = localStorage.getItem('dark-mode')
  darkModeStatus:string;

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe((status:any) => {
      this.darkModeStatus = status
      if(this.darkModeStorage == '{"darkMode":true}'){
        this.darkModeStatus = 'true'
      } else {
        this.darkModeStatus = 'false'
      }
    })
  }


  changeNightMode(){
    this.darkModeService.toggle();
  }

  changeAnimationStatus(){
    if(this.animationStatus == 'true'){
      this.animationStatus == 'false'
      localStorage.setItem('animations','false')
    } else {
      this.animationStatus == 'true'
      localStorage.setItem('animations','true')
    }
  }

}
