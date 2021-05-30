import { EventEmitter, Injectable } from '@angular/core';
import { PLsong } from '../shared_models/song.model';

@Injectable({
  providedIn: 'root'
})
export class DataexchangerService {

  constructor() { }

  songs:EventEmitter<any> = new EventEmitter();
  singers:EventEmitter<any> = new EventEmitter();
  shuffledArray:EventEmitter<any> = new EventEmitter();
  playlists:EventEmitter<any> = new EventEmitter();
  singer:EventEmitter<any> = new EventEmitter();

}
