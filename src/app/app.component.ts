import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Playlist } from './shared_models/playlist.model';
import { PLsinger } from './shared_models/singer.model';
import { PLsong } from './shared_models/song.model';
import { DataManagerService } from './shared_services/data-manager.service';
import { StatusExchangerService } from './shared_services/status-exchanger.service';
import { DarkModeService } from './shared_services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Feelife';

  mobileNavStatus:string = '';

  currentProgress$ = new BehaviorSubject(0);
  currentTime$ = new Subject();

  @ViewChild('player', {static: true}) player!: ElementRef;
  @ViewChild('volumeSlider', {static: true}) volumeSlider!: ElementRef;

  songs:PLsong [];
  singers: PLsinger[] = [];
  playlists: Playlist[] = [];
  favoritedSongs:PLsong[] = [];
  innerWidth:any;

  audio = new Audio();
  isPlaying = false;
  activeSong:any = undefined;
  durationTime: any;
  songCoverImage:any;

  paramsSubscription: Subscription = null;

  activedsong = false;

  language:string = localStorage.getItem('language');

  constructor(
    private statusExchanger:StatusExchangerService,
    private dataManager:DataManagerService,
    public router: Router,
    private translate: TranslateService,
    private darkMode:DarkModeService
    ){
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

    this.dataManager.getSongs((res:PLsong[]) => {
      this.songs = res;
      this.chooseSong(this.songs[0]);
    });
    this.dataManager.getSingers((res:PLsinger[]) => {
      this.singers = res;
    });
    this.dataManager.getPlaylists((res:Playlist[]) => {
      this.playlists = res;
    });



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

    
    this.statusExchanger.activeSongId.subscribe((songId:number) => {
      if(songId == undefined || songId <= 0){
        this.play(this.songs[0]);
        this.activedsong = true;
        this.dataManager.addRecentSong(this.songs[0]);
      } else {
        this.play(this.songs[songId - 1]);
        this.activedsong = true;
        this.dataManager.addRecentSong(this.songs[songId - 1]);
      }
      
    })
  }

  ngAfterViewInit(){
    this.changeVolume()
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  play(song:PLsong): void {
    this.durationTime = undefined;
    this.audio.pause();

    if(song == undefined){
      this.player.nativeElement.src = this.songs[0].path;
      this.player.nativeElement.play();
      this.activeSong = this.songs[0];
    } else if(this.activeSong != undefined && this.activeSong.id == song.id) {
      this.player.nativeElement.play();
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

  playSong(songId:number): void{
    this.statusExchanger.activeSongId.emit(songId);
  }

  playNextSong(): void {
    const songId:number = parseInt(this.activeSong.id);
    if (songId + 1 > this.songs.length) {
      this.statusExchanger.activeSongId.emit(0);
    } else {
      this.statusExchanger.activeSongId.emit(songId + 1);
    }
  }

  playPreviousSong(): void {
    const songId:number = parseInt(this.activeSong.id);
    if (songId - 1 < 0) {
      this.statusExchanger.activeSongId.emit(this.songs.length - 1)
    } else {
      this.statusExchanger.activeSongId.emit(songId - 1);
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

  vol:number = 100;

  changeVolume(){
    this.player.nativeElement.volume = this.vol / 100;
    this.volumeSlider.nativeElement.style.background = "linear-gradient(to right, #82CFD0 0%, #82CFD0 " + this.vol + "%, #fff " + this.vol + "%, #fff 100%)"
  }

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




}
