import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  isValid(): boolean {

      let a = localStorage.getItem("nesdata");
      if(!a)
        return false;
      else 
        return true;
      
  }

}
