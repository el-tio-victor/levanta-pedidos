import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header-visor-pedidos',
  templateUrl: './header-visor-pedidos.component.html',
  styleUrls: ['./header-visor-pedidos.component.css']
})
export class HeaderVisorPedidosComponent implements OnInit {

  @Input() tallas:string[]; 
  @Input() show:boolean;
  @Input() prods_pedido:any;

  @Output() public handleClickOutput = new EventEmitter<MouseEvent>();
  @Output() public handleClickCleanOutput = new EventEmitter<MouseEvent>();


  constructor() { }

  ngOnInit(): void {
    console.log(this.show);
  }

  handleClick(event:MouseEvent){
    console.log('click en boton de header');
    this.handleClickOutput.emit(event);
  }
  isDisabledBtnSave(){
    if(this.prods_pedido){
      if(this.prods_pedido.length > 0)
        return false;
    }
    return true;
  }

  handleClickClean(event:MouseEvent){
    this.handleClickCleanOutput.emit(event);
    console.log('clean');
  }
}
