import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PLsinger } from 'src/app/shared_models/singer.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {

  singerId:any;
  singer!:PLsinger[];
  singerSongs!:PLsong [];
  singers!: PLsinger[];
  songs!:PLsong[];

  constructor(private router:ActivatedRoute, private manager:DataManagerService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.singerId = params.get('id')
      this.manager.getSongs((res:PLsong[]) => {
        this.songs = res;
      });
      this.manager.getSingers((res:PLsinger[]) => {
        this.singers = res;
        this.singer = this.singers.filter(s => s.id == this.singerId);
        this.singerSongs = this.songs.filter(s => s.singer == this.singer[0].singer);
      });
    })
  }


}
