import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from 'src/app/shared_models/language.model';
import { StatusExchangerService } from 'src/app/shared_services/status-exchanger.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {

  @Input()
  language!: Language;

  constructor(public router:Router, public statusExchanger:StatusExchangerService) { }

  changeLanguage(languageCode:string){
    localStorage.setItem("language", languageCode);
    this.router.navigate(["/"])
    this.statusExchanger.activeLanguageCode.emit(languageCode);
  }

}
