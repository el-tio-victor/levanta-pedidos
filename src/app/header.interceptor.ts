import {
  HttpEvent,
  HttpHandler, HttpInterceptor,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor{
  data_user;


  intercept(httpRequest: HttpRequest<any>,next: HttpHandler)
    :Observable<HttpEvent<any>>{
    
    	let data = localStorage.getItem('nesdata');
    	let company = localStorage.getItem('company');
      const Authorization =  data ? `Bearer ${JSON.parse(data)._token}`:
        null;

      if(Authorization){
        
        let params = new HttpParams();
        params = params.append('company',company);
        return next.handle(httpRequest.clone(
          {setHeaders: {Authorization},params:params}
        ));
      }
      else{
        return next.handle(httpRequest);
      }
    }
}
