import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DarkModeService {

  darkMode$ = new BehaviorSubject(JSON.parse(localStorage.getItem('dark-mode')!));

  constructor() { 
    if(localStorage.getItem("dark-mode") == "true") {
      document.body.classList.toggle('dark-mode');
    } else if (localStorage.getItem("dark-mode") == "false") {
      document.body.classList.toggle('light-mode');
    } else {
      localStorage.setItem("dark-mode","false");
      document.body.classList.toggle('light-mode');
    }
  }

  changeDarkModeStatus() {
    if(document.body.classList.contains('dark-mode')){
      document.body.classList.remove('dark-mode')
      document.body.classList.toggle('light-mode');
      localStorage.setItem("dark-mode","false")
      this.darkMode$.next(false);
    } else {
      document.body.classList.remove('light-mode')
      document.body.classList.toggle('dark-mode');
      localStorage.setItem("dark-mode","true")
      this.darkMode$.next(true);
    }
  }
}