export class PLsong {
    id: number;
    singer:string;
    songtitle: string;
    path: string;
    coverphoto:string;
    album:string;
    albumCover:string;
  
  
    constructor(id:number,singer:string,songtitle:string,path:string,coverPhoto:string,album:string,albumCover:string){
      this.id = id;
      this.singer = singer;
      this.songtitle = songtitle;
      this.path = path;
      this.coverphoto = coverPhoto;
      this.album = album;
      this.albumCover = albumCover;
    }
  }
  