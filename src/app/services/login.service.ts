import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlobalService} from '../global.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {




  constructor(private http: HttpClient) {
  }



  loginSap(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Licencia': GlobalService.LICENCIA,
      //'Token':''
   });
  let options = { headers: headers };
  

  return this.http.post(GlobalService.HOST+'auth/login', {
    
  }, options);
  }

  login(username:string, password:string, company:string) {


    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Licencia': GlobalService.LICENCIA,
        //'Token':''
     });
    let options = { headers: headers };
    

    return this.http.post(GlobalService.HOST+'auth/login',{
       username,
      password: password,
      company
    }, options);    

    
  }



}
