import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  isValid( path:string ): boolean {

      let a = JSON.parse(localStorage.getItem("nesdata"));
      let rol = a.rol;
      let modules = a.modules;
      console.log(rol,modules);
      if( rol == 'admin' || path.includes('admin')){
        console.log(  );
        return true;
      }
      else {
        let output = false
        console.log('else');
        modules.forEach(element => {
          console.log(element, path);
          if(element.toLowerCase().includes(
            path.toLowerCase()
          )){
            output =  true;
          }
        });
        return output;
      }
      
  }

}
