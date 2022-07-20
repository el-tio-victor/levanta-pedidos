import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {GlobalService} from '../../../global.service';
import {UserService} from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

	private duser;
  private username:string;
  
  constructor(
    private userService : UserService, 
    private router: Router,
	  private curService: GlobalService,
  ) {
    this.duser = this.curService.getData();
    this.username = this.duser.username.toLowerCase();
  }

  canActivate(route: ActivatedRouteSnapshot, state : RouterStateSnapshot) {

    let path = route.routeConfig.path;
    //window.alert(this.userService.isValid());
    if(this.userService.isValid( path )!=true) {
      this.router.navigateByUrl(`/admin/${this.username}/home`);
      //window.alert("No puedes ver esta pagina");
      return false;
    } 

    return true;
  }

}
