export class Playlist {
    id: number;
    name: any;
    cover:any;
    songs:any;
  
  
    constructor(id:number,name:any,cover:any,songs:any){
      this.id = id;
      this.name = name;
      this.cover = cover;
      this.songs = songs;
    }
  }
  