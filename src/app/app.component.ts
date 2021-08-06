import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';
import { Playlist } from './shared_models/playlist.model';
import { PLsinger } from './shared_models/singer.model';
import { PLsong } from './shared_models/song.model';
import { ContentGlobalRefresherService } from './shared_services/content-global-refresher.service';
import { DataexchangerService } from './shared_services/dataexchanger.service';
import { StatusExchangerService } from './shared_services/status-exchanger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [    
        query(':enter, :leave', style({ position: 'fixed', width:'47.1%' }),{optional: true}),
        group([ 
          query(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.6s ease-in-out', style({ transform: 'translateY(0%)' }))
          ],{optional: true}),
          query(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.6s ease-in-out', style({ transform: 'translateY(-100%)' }))
          ],{optional: true}),
        ])
      ])
    ])
   ]
})

export class AppComponent {
  title = 'Feelify';

  mobileNavStatus:string = '';
  animationStatus:boolean = JSON.parse(localStorage.getItem('animations'))
  darkModeStatus:any = localStorage.getItem('dark-mode');

  currentProgress$ = new BehaviorSubject(0);
  currentTime$ = new Subject();

  @ViewChild('player', {static: true}) player!: ElementRef;

  songs:any;
  singers: PLsinger[] = [];
  playlists: Playlist[] = [];
  favoritedSongs:PLsong[] = [];
  innerWidth:any;

  audio = new Audio();
  isPlaying = false;
  activeSong:any;
  durationTime: any;
  songCoverImage:any;
  firstSongPlayer:boolean = false;

  paramsSubscription: Subscription = null;

  activedsong = false;

  language:string = localStorage.getItem('language');

  constructor(private statusExchanger:StatusExchangerService,private dataExchanger:DataexchangerService,private contentRefresher:ContentGlobalRefresherService,public router: Router,private translate: TranslateService){
    if(this.language != null || this.language != undefined){
      translate.setDefaultLang(this.language);
      translate.use(this.language);
    } else {
      translate.setDefaultLang('en');
      translate.use('en');
    }
  
  }
  
  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.dataExchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })
    this.dataExchanger.singers.subscribe((singers:any) => {
      this.singers = singers;
    })
    this.dataExchanger.playlists.subscribe((playlists:any) => {
      this.playlists = playlists;
    })

    this.contentRefresher.getData('songs&singers');
    this.contentRefresher.getData('playlists');

    if(this.language === null){
      this.language = 'en'
      localStorage.setItem("language", 'en');
    }

    this.statusExchanger.activeLanguageCode.subscribe((code:string) => {
      this.language = code;
      localStorage.setItem("language", code);
      this.translate.setDefaultLang(code);
      this.translate.use(code);
    })
    
    this.statusExchanger.activeSongId.subscribe((item:number) => {
      if(item == undefined){
        this.chooseSong(this.songs[0]);
        this.activedsong = true;
      } else {
      if(this.firstSongPlayer == true){
      if(this.activeSong.id != this.songs[item].id){
        this.playSong(this.songs[item]);
        this.activedsong = true;
      }        
      } else {
        this.playSong(this.songs[item]);
        this.firstSongPlayer = true;
        this.activedsong = true;
      }
    }
    })

    if(this.animationStatus == undefined){
      this.animationStatus = false
      localStorage.setItem('animations','false')
    }

    this.statusExchanger.animationsStatus.subscribe((status:boolean) => {
      this.animationStatus = status
      this.getState('settings')
    })

    if(this.darkModeStatus == undefined){
      this.darkModeStatus = 'false'
      localStorage.setItem('dark-mode','false')
    }

  }

  getState(outlet:any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  playSong(song:any): void {
    this.durationTime = undefined;
    this.audio.pause();

    if(song == undefined){
      this.player.nativeElement.src = this.songs[0].path;
      this.player.nativeElement.play();
      this.activeSong = this.songs[0];
    } else {
      this.player.nativeElement.src = song.path;
      this.player.nativeElement.play();
      this.activeSong = song;
    }

    this.isPlaying = true;



}

  chooseSong(song:any): void {
    this.durationTime = undefined;
    this.audio.pause();

    this.player.nativeElement.src = song.path;
    this.activeSong = song;
  }

  onTimeUpdate() {
    if (!this.durationTime) {
      this.setSongDuration();
    }

    const currentMinutes = this.generateMinutes(this.player.nativeElement.currentTime);
    const currentSeconds = this.generateSeconds(this.player.nativeElement.currentTime);
    this.currentTime$.next(this.generateTimeToDisplay(currentMinutes, currentSeconds));


    const percents = this.generatePercentage(this.player.nativeElement.currentTime, this.player.nativeElement.duration);
    if (!isNaN(percents)) {
      this.currentProgress$.next(percents);
    }

    if(this.player.nativeElement.currentTime > this.player.nativeElement.duration - 1){
      if(this.repeatStatus == true){
        this.playSong(this.activeSong);
      }else {
      this.playNextSong()
      }
    }

  }


  playNextSong(): void {
    const songId:number = parseInt(this.activeSong.id);
    if (songId === -1) {
      this.playSong(this.songs[0]);
    } else {
      this.playSong(this.songs[songId]);
    }
  }

  playPreviousSong(): void {
    const songId:number = parseInt(this.activeSong.id);
    if (songId === -1) {
      this.playSong(this.songs[this.songs.length - 1]);
    } else {
      this.playSong(this.songs[songId]);
    }
  }


  setSongDuration(): void {
    const durationInMinutes = this.generateMinutes(this.player.nativeElement.duration);
    const durationInSeconds = this.generateSeconds(this.player.nativeElement.duration);

    if (!isNaN(this.player.nativeElement.duration)) {
      this.durationTime = this.generateTimeToDisplay(durationInMinutes, durationInSeconds);
    }
  }


  generateMinutes(currentTime: number): number {
    return Math.floor(currentTime / 60);
  }


  generateSeconds(currentTime: number): number | string {
    const secsFormula = Math.floor(currentTime % 60);
    return secsFormula < 10 ? '0' + String(secsFormula) : secsFormula;
  }

  generateTimeToDisplay(currentMinutes:any, currentSeconds:any): string {
    return `${currentMinutes}:${currentSeconds}`;
  }


  generatePercentage(currentTime: number, duration: number): number {
    return Math.round((currentTime / duration) * 100);
  }

  onPause(): void {
    this.isPlaying = false;
    this.currentProgress$.next(0);
    this.currentTime$.next('0:00');
    this.durationTime = undefined;
  }
  
  singerName:any;
  songsArray:any;
  newArrayForDataSave: PLsong[] = [];

  repeatStatus:boolean=false;
  shuffleStatus:boolean=false;


  repeatChange(){
    if(this.repeatStatus == true){
      this.repeatStatus = false
    } else {
      this.repeatStatus = true
    }
  }

  shuffleChange(){
    if(this.shuffleStatus == true){
      this.shuffleStatus = false
      this.statusExchanger.shuffleStatus.emit(true);
    } else {
      this.shuffleStatus = true
      this.statusExchanger.shuffleStatus.emit(false);
    }
  }

  changeMobileNavStatus(){
    if(this.mobileNavStatus == ''){
      this.mobileNavStatus = 'openedNav'
    } else {
      this.mobileNavStatus = ''
    }
  }



}
