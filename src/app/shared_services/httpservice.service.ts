import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http:HttpClient) { }


  public getDataFromApi(url:string):any{
    return this.http.get(url).pipe(map(response => {
      var data = response;
      return data;
    }));
  }


}
