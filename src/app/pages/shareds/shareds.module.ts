import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
//componentes
import {LoaderComponent} from '../shareds/loader/loader.component';




@NgModule({
  declarations: [
    LoaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderComponent
  ]
})
export class SharedsModule { }
