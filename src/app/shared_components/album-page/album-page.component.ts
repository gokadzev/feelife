import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/shared_models/album.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {

  songs!: PLsong[];

  albumName!: string | null;
  albumCover!: string;
  albums!: Album[];
  albumSongs!: PLsong[];

  constructor(private router:ActivatedRoute,private manager:DataManagerService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.albumName = params.get('album');
      this.manager.getSongs((res:PLsong[]) => {
        this.songs = res;
        this.albumSongs = this.songs.filter(s => s.album == this.albumName)
      });
      this.manager.getAlbums((res:Album[]) => {
        this.albums = res;
        var album = this.albums.filter(s => s.album == this.albumName)
        this.albumCover = album[0].albumCover
      });
    })


  }

}
