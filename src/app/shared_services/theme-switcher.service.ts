import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';

interface Theme {
  name: string;
  styles: ThemeStyle[];
}

interface ThemeStyle {
  themeVariable: string;
  value: string;
}


@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {
  private themes: Theme[] = [];
  private currentTheme: number = 0;

  constructor(private domCtrl: DomController, @Inject(DOCUMENT) private document) { 

    this.themes = [
      {
        name: 'day',
        styles: [
          { themeVariable: '--ion-color-primary', value: '#ffffff'},
          { themeVariable: '--ion-color-primary-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-primary-contrast', value: '#000000'},
          { themeVariable: '--ion-color-primary-contrast-rgb', value: '0,0,0'},
          { themeVariable: '--ion-color-primary-shade', value: '#e0e0e0'},
          { themeVariable: '--ion-color-primary-tint', value: '#ffffff'},
          { themeVariable: '--ion-item-ios-background-color', value: '#ffffff'},
          { themeVariable: '--ion-tabbar-background-color', value: '#000000'},
          { themeVariable: '--ion-tabbar-ios-text-color-active', value: '#000000'},
          { themeVariable: '--ion-background-color', value: '#ffffff'},
          { themeVariable: '--ion-text-color', value: '#000000'},
          { themeVariable: '--custom-bg-color', value:'#000'}
  
        ]
      },
      {
        name: 'night',
        styles: [
          { themeVariable: '--ion-color-primary', value: '#428cff'},
          { themeVariable: '--ion-color-primary-rgb', value: '66,140,255'},
          { themeVariable: '--ion-color-primary-contrast', value: '#ffffff'},
          { themeVariable: '--ion-color-primary-contrast-rgb', value: '255,255,255'},
          { themeVariable: '--ion-color-primary-shade', value: '#3a7be0'},
          { themeVariable: '--ion-color-primary-tint', value: '#5598ff'},
          { themeVariable: '--ion-item-ios-background-color', value: '#262626'},
          { themeVariable: '--ion-item-md-background-color', value: '#1e1e1e'},
          { themeVariable: '--ion-tabbar-background-color', value: '#1f1f1f'},
          { themeVariable: '--ion-tabbar-ios-text-color-active', value: '#ffffff'},
          { themeVariable: '--ion-tabbar-md-text-color-active', value: '#ffffff'},
          { themeVariable: '--ion-text-color', value: '#ffffff'},
          { themeVariable: '--ion-text-color-rgb', value: '255,255,255'},
          { themeVariable: '--ion-background-color', value: '#121212'},
          { themeVariable: '--ion-placeholder-color', value: '#ffffff'},
          { themeVariable: '--ion-border-color', value: '#ffffff'},
          { themeVariable: '--ion-button-color', value:'#ffffff'},
          { themeVariable: '--custom-bg-color', value:'#ffffff'}
        ]
      }
    ]


  }
  

  cycleTheme(): void {

    if(this.themes.length > this.currentTheme + 1){
      this.currentTheme++;
    } else {
      this.currentTheme = 0;
    }

    this.setTheme(this.themes[this.currentTheme].name);

  }

  setTheme(name): void {

    let theme = this.themes.find(theme => theme.name === name);

    this.domCtrl.write(() => {

      theme.styles.forEach(style => {
        document.documentElement.style.setProperty(style.themeVariable, style.value);
      });

    });

  }

}
