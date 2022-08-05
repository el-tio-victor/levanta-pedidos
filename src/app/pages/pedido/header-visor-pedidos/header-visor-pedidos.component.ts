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
  @Output() is_saved_order = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

  handleClick(event:MouseEvent){
    this.handleClickOutput.emit(event);
    this.handleClickCleanOutput.emit(event);
    this.is_saved_order.emit(true);
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
    this.is_saved_order.emit(true);
    console.log('clean');
  }
}
