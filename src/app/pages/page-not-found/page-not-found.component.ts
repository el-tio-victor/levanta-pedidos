import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from '../../global.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

	private duser;
	url:string = "";

  constructor(
	private curService: GlobalService,
	private router: Router
  ) { 
    console.log(this.curService.getData())
		this.duser = this.curService.getData();
		this.url = this.duser ? `/admin/${this.duser.username.toLowerCase()}/home` :
			"/";
		
  }

  goHome(){
	this.router.navigate([this.url]);
  }

  ngOnInit(): void {
  }

}
