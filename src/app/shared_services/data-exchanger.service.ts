import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataexchangerService {

  constructor() { }

  singer:EventEmitter<any> = new EventEmitter();

}
