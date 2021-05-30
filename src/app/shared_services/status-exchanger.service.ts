import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusExchangerService {

  constructor() { }


  shuffleStatus:EventEmitter<boolean> = new EventEmitter();
  activeSongId:EventEmitter<number> = new EventEmitter();
  activeLanguageCode:EventEmitter<string> = new EventEmitter();

  actionTabChange:EventEmitter<string> = new EventEmitter();
  playerModechange:EventEmitter<string> = new EventEmitter();
}
