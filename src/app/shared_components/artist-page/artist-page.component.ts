import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PLsinger } from 'src/app/shared_models/singer.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {

  singerId:any;
  singer:PLsinger[];
  singerSongs:PLsong [];
  singers:PLsinger[];
  songs:PLsong[];

  constructor(private router:ActivatedRoute,private dataexchanger:DataexchangerService, private manager:DataManagerService) { }

  ngOnInit(): void {
    this.dataexchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.dataexchanger.singers.subscribe((singers:any) => {
      this.singers = singers;
    })

    this.manager.getSongs();
    this.manager.getSingers();


    this.router.paramMap.subscribe(params => {
      this.singerId = params.get('id')
      setTimeout( () => {
        this.singer = this.singers.filter(s => s.id == this.singerId);
        this.singerSongs = this.songs.filter(s => s.singer == this.singer[0].singer);
      }, 500 );
    })
  }


}
