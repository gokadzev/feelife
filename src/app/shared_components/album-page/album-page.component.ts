import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/shared_models/album.model';
import { PLsong } from 'src/app/shared_models/song.model';
import { DataManagerService } from 'src/app/shared_services/data-manager.service';
import { DataexchangerService } from 'src/app/shared_services/data-exchanger.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {

  songs:PLsong [];

  albumName:string;
  albumCover:string;
  albums:Album[];
  albumSongs:PLsong[];

  constructor(private router:ActivatedRoute,private dataexchanger:DataexchangerService,private manager:DataManagerService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.albumName = params.get('album')
    })

    this.dataexchanger.albums.subscribe((albums:any) => {
      this.albums = albums;
      var album = this.albums.filter(s => s.album == this.albumName)
      this.albumCover = album[0].albumCover
    })

    this.dataexchanger.songs.subscribe((songs:any) => {
      this.songs = songs;
    })

    this.manager.getSongs();
    this.manager.getAlbums();

    setTimeout( () => {
      this.albumSongs = this.songs.filter(s => s.album == this.albumName)
    }, 500 );


  }

}
