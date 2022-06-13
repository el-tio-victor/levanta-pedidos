import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userService : UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) {

    //window.alert(this.userService.isValid());
    if(this.userService.isValid()!=true) {
      this.router.navigate(['/']);
      //window.alert("No puedes ver esta pagina");
      return false;
    } 

    return true;
  }

}
