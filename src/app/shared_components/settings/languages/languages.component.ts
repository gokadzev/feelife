import { Component } from '@angular/core';
import { Language } from 'src/app/shared_models/language.model';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent{

  constructor() { }


  languages:Language [] = [
    new Language('English','en'),
    new Language('Georgian','ka'),
    new Language('Russian','ru'),
    new Language('Turkey','tr'),
    new Language('Spanish','sp'),
  ]

}
