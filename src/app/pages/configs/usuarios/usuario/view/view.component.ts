import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() user;
  @Input() modules;
  constructor() { }

  ngOnInit(): void {
  }

}
