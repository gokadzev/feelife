export class PLsong {
    id: number;
    singer:string;
    songtitle: string;
    path: string;
    coverphoto:string;
  
  
    constructor(id:number,singer:string,songtitle:string,path:string,coverPhoto:string){
      this.id = id;
      this.singer = singer;
      this.songtitle = songtitle;
      this.path = path;
      this.coverphoto = coverPhoto;
    }
  }
  