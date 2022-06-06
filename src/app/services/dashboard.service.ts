import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global.service';




@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient,private curService: GlobalService) {

  }
  Filtro(s_token: string,
    url: string,
   Params : any
    ) {
let headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Licencia': GlobalService.LICENCIA,
   'Token': s_token
});



return this.http.get(GlobalService.HOST+url , { params: Params, headers: headers });
}
  All(token:string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
        'Token': token
     });
    let params = { headers: headers };
    return this.http.get(GlobalService.HOST+'dashboard', params);    
  }

  Auditores(token:string, ruta :string) {
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
        'Token': token
     });
    let params = { headers: headers };
    return this.http.get(GlobalService.HOST + ruta, params);    
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

}
