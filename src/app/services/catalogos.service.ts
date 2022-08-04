import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) { }

  All(s_token: string, url: string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
        'Token': s_token
     });
    let params = { headers: headers };
    return this.http.get(GlobalService.HOST+url, params);    
  }

  AllByProperty( url: string, property: string, value:any) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
     });
    let params = { headers: headers};
    return this.http.get(GlobalService.HOST+url+`?${property}=${value}`);    
  }

  Id(s_token: string, url: string, id: string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
        //'Authorization': 'Bearer '+s_token,

     });
    let params = { headers: headers };
    return this.http.get(GlobalService.HOST+url+"/"+id, params);    
  }

  Update(s_token:string, url: string, data: any, id: number) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
        'Token': s_token
     });
    let options = { headers: headers };
    return this.http.patch(GlobalService.HOST+url+'/'+id, data, options);
  }

  Post(s_token:string, url: string, data: any) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
        'Token': s_token
     });
    let options = { headers: headers };
    return this.http.post(GlobalService.HOST+url, data, options);            
  }

  Externo( url: string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*,*',
        'Access-Control-Allow-Headers': 'origin, x-requested-with, accept',
        'Access-Control-Allow-Methods': 'GET'
     });
    let params = { headers: headers };
    
    return this.http.get(url);    
  }
}
