import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { PLsinger } from './shared_models/singer.model';
import { PLsong } from './shared_models/song.model';
import { ContentGlobalRefresherService } from './shared_services/content-global-refresher.service';
import { DataexchangerService } from './shared_services/dataexchanger.service';
import { HttpserviceService } from './shared_services/httpservice.service';
import { StatusExchangerService } from './shared_services/status-exchanger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Feelify';





  // player 

  currentProgress$ = new BehaviorSubject(0);
  currentTime$ = new Subject();

  @ViewChild('player', {static: true}) player!: ElementRef;

  songs:PLsong [] = [];

  singers: PLsinger[] = [];


  favoritedSongs:PLsong[] = [];

  audio = new Audio();
  isPlaying = false;
  activeSong:any;
  durationTime: any;
  songCoverImage:any;
  firstSongPlayer:boolean = false;

  paramsSubscription!: Subscription;


  activedsong = false;




  constructor(private statusExchanger:StatusExchangerService,public router: Router, private dataexchanger:DataexchangerService,private refresher:ContentGlobalRefresherService, private webRequest:HttpserviceService){
    
  }
  
  

  ngOnInit() {


    this.dataexchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
      this.newArrayForDataSave = songs;
      console.log(this.songs)
    })


    this.dataexchanger.singers.subscribe((singers:any) => {
      this.singers = singers;
    })


    this.refresher.getSongs();
    this.refresher.getSingers();


 
    
    this.statusExchanger.activeSongId.subscribe((item:number) => {
      if(item == undefined){
        this.chooseSong(this.songs[0]);
        this.activedsong = true;
      } else {
      if(this.firstSongPlayer == true){
      if(this.activeSong.id != this.songs[item - 1].id){
        this.playSong(this.songs[item - 1]);
        this.activedsong = true;
      }        
      } else {
        this.playSong(this.songs[item - 1]);
        this.firstSongPlayer = true;
        this.activedsong = true;
      }
    }
    })

  }



  ngOnDestroy() {
    this.dataexchanger.songs.unsubscribe();
    this.dataexchanger.singers.unsubscribe();
  }



  lyrics!: string;

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

    var singer = this.activeSong.singer.replace(/ /g,"_");
    var song = this.activeSong.songtitle.replace(/ /g,"_");
    song = song.replace(/'/g, '');

    
    var apiUrl:string = 'https://api.lyrics.ovh/v1/'+singer+'/'+song;
    this.lyrics='';

    this.webRequest.getDataFromApi(apiUrl).subscribe((response:any) => {
      this.lyrics = response.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>');
    })


}

  chooseSong(song:any): void {
    this.durationTime = undefined;
    this.audio.pause();

    // this.checkFavoriteSongs();
    this.player.nativeElement.src = song.path;
    this.activeSong = song;
  }

  onTimeUpdate() {

    // Set song duration time
    if (!this.durationTime) {
      this.setSongDuration();
    }

    // Emit converted audio currenttime in user friendly ex. 01:15
    const currentMinutes = this.generateMinutes(this.player.nativeElement.currentTime);
    const currentSeconds = this.generateSeconds(this.player.nativeElement.currentTime);
    this.currentTime$.next(this.generateTimeToDisplay(currentMinutes, currentSeconds));


    // Emit amount of song played percents
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

  // Play song that comes after active song
  playNextSong(): void {
    const songId:number = parseInt(this.activeSong.id);
    if (songId === -1) {
      this.playSong(this.songs[0]);
    } else {
      this.playSong(this.songs[songId]);
    }
  }

  // Play song that comes before active song
  playPreviousSong(): void {
    const songId:number = parseInt(this.activeSong.id);
    if (songId === -1) {
      this.playSong(this.songs[this.songs.length - 1]);
    } else {
      this.playSong(this.songs[songId]);
    }
  }

  // Calculate song duration and set it to user friendly format, ex. 01:15
  setSongDuration(): void {
    const durationInMinutes = this.generateMinutes(this.player.nativeElement.duration);
    const durationInSeconds = this.generateSeconds(this.player.nativeElement.duration);

    if (!isNaN(this.player.nativeElement.duration)) {
      this.durationTime = this.generateTimeToDisplay(durationInMinutes, durationInSeconds);
    }
  }

  // Generate minutes from audio time
  generateMinutes(currentTime: number): number {
    return Math.floor(currentTime / 60);
  }

  // Generate seconds from audio time
  generateSeconds(currentTime: number): number | string {
    const secsFormula = Math.floor(currentTime % 60);
    return secsFormula < 10 ? '0' + String(secsFormula) : secsFormula;
  }

  generateTimeToDisplay(currentMinutes:any, currentSeconds:any): string {
    return `${currentMinutes}:${currentSeconds}`;
  }

  // Generate percentage of current song
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
  lyricsStatus:boolean=false;
  repeatButton:string="light";
  shuffleButton:string="light";
  lyricsButton:string="light";


  lyricsStatusChange(){
    if(this.lyricsStatus == true){
      this.lyricsStatus = false
      this.lyricsButton="light"
    } else {
      this.lyricsStatus = true
      this.lyricsButton="success"
    }
  }

  repeatChange(){
    if(this.repeatStatus == true){
      this.repeatStatus = false
      this.repeatButton="light"
    } else {
      this.repeatStatus = true
      this.repeatButton="success"
    }
  }

  shuffleChange(){
    if(this.shuffleStatus == true){
      this.shuffleStatus = false
      this.shuffleButton="light"
      this.statusExchanger.shuffleStatus.emit(true);
    } else {
      this.shuffleStatus = true
      this.shuffleButton="success"
      this.statusExchanger.shuffleStatus.emit(false);
    }
  }



}
