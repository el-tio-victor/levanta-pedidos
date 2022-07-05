import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-views',
  templateUrl: './menu-views.component.html',
  styleUrls: ['./menu-views.component.css']
})
export class MenuViewsComponent implements OnInit {

  constructor() { 
    console.log( this.option_active  );
  }

  @Input() option_active:string = 'grid';
  ngOnInit(): void {
    console.log( this.option_active  );
  }

}
