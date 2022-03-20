export class Playlist {
    id: number;
    name: string;
    cover:string;
    songs:any;
  
  
    constructor(id:number,name:string,cover:string,songs:any){
      this.id = id;
      this.name = name;
      this.cover = cover;
      this.songs = songs;
    }
  }
  