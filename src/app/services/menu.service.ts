import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global.service';




@Injectable({
  providedIn: 'root'
})
export class MenuService {


  constructor(private http: HttpClient,private curService: GlobalService) {

  }

  All(token:string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
        'Token': token
     });
    let params = { headers: headers };
    return this.http.get(GlobalService.HOST+'menu', params);    
  }



}
