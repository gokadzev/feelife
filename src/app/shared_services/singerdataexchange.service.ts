import { EventEmitter, Injectable } from '@angular/core';
import { PLsinger } from '../shared_models/singer.model';

@Injectable({
  providedIn: 'root'
})
export class SingerdataexchangeService {

  constructor() { }


  singerdataexchange:EventEmitter<PLsinger> = new EventEmitter();
}
