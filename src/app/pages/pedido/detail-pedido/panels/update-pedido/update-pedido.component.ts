import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../../../global.service";

@Component({
  selector: 'app-update-pedido',
  templateUrl: './update-pedido.component.html',
  styleUrls: ['./update-pedido.component.css']
})

export class UpdatePedidoComponent implements OnInit {

  @Input() data;
  @Output() items = new EventEmitter<any>();
  @Output() is_valid_edicion_ped_emit = new EventEmitter<boolean>();

  timer_aux:any;
  
  input_value = 0;

  constructor(
    private toastr : ToastrService,
    private globalService:GlobalService,
  ) { }

  ngOnInit(): void {
    this.isValidValues();
  }

  turnIcon(el_target:any,el_btn){
    let has_show = el_target.classList.contains('show');

    el_btn.classList.toggle('rotate') ;
  }


 updateCantidad(value:number ,estilo:string, itemcode:string,element:any){
    /** this.data.items[estilo].prods */

    if(this.timer_aux)
      clearTimeout( this.timer_aux );

    let self = this;
    this.timer_aux = setTimeout(function(){

      let index_found = self.findIndex(estilo, itemcode );

      if(index_found > -1){
        self.data.items[estilo]['prods'][index_found].Quantity =
        value;
      } 
      
      /* gUARDO en local storage el pedido */
      console.log(self.data);
      self.globalService.setData(
        'pedido',
        JSON.stringify(
          self.data.items
          )
      );

      self.isValidValues();
    },500);

  }

  isValidValues(){
    
      for (const i in this.data.items) {
        console.log(this.data.items[i].prods);
        let  result = this.data.items[i].prods.find(
          item => isNaN( parseInt(item.Quantity)) || item.Quantity < 0
        );  
        if( result ){
          
          this.is_valid_edicion_ped_emit.emit(false);
          return;
        }
      }
      this.is_valid_edicion_ped_emit.emit(true);
  }


  deleteStyle(estilo:string){
      delete this.data.items[estilo]
  }

  deleteItem(element){
    element.classList.toggle('show-confirm');
  }

  confirmDeleteItem(estilo:string,itemcode:string):void{
    let index = this.findIndex(estilo,itemcode);
    let arr_res:any;
    if(index > -1 )
      arr_res = this.data.items[estilo]['prods'].splice(index,1);

    if( this.data.items[estilo].prods.length == 0 )
      delete this.data.items[estilo]

    this.isValidValues();
  }

  private findIndex(estilo:string, itemcode:string ):number{
      return this.data.items[estilo]['prods']
        .findIndex(item => item.ItemCode === itemcode);

  }

}
