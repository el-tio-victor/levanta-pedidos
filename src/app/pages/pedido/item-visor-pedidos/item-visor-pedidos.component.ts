import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../global.service";


@Component({
  selector: 'app-item-visor-pedidos',
  templateUrl: './item-visor-pedidos.component.html',
  styleUrls: ['./item-visor-pedidos.component.css']
})
export class ItemVisorPedidosComponent implements OnInit {

  @Input() item_by_color:any[];
  @Input() tallas:string[];
  @Input() clave_color:string;
  @Input() nombre_color_esp:string;
  @Input() code_exa_color:string;
  @Input() descripcion_articulo:string = "";
  @Input() icono_articulo:string = "";
  private timer_event:any;
  private modules;
  input_disabled = true;

  @Output() prod_add_emit:EventEmitter<any> =
    new EventEmitter();


  //private element_by_talla:any;

  user;
  cantidad_stock:string = "N/A";

  prods_pedido:any[] = [];

  constructor(
    private globalService:GlobalService,
    private toastr: ToastrService,
  ) {
    this.user = this.globalService.getData().username;
  }

  disabled(){
   if(this.globalService.getData() != 'FEQE6410293U2_1'){
     return false;
   }
   else
    return true;
  }

  ngOnInit(): void {
    this.modules = this.globalService.getData().modules; 
    console.log('modules,,,,', this.modules );
    let modul_ped = this.modules.filter(
      item=> item.name.toLowerCase()=='pedidos')[0];
    console.log(modul_ped);
    if(modul_ped.actions.includes('CREAR')){
      this.input_disabled = false
    }
  }


  private getByTalla(talla:string){
   return  this.item_by_color.filter(
        item => item.U_Talla == talla
      )[0];

  }
  getValueColor(){
    
  }

  getStockByTalla( talla:string ){
    let element_by_talla = this.getByTalla(talla);
    if(element_by_talla){
      this.cantidad_stock = element_by_talla.OnHand; 
      //console.log(this.cantidad_stock);
      return element_by_talla.OnHand;
    }
    this.cantidad_stock = "N/A";
    return 'N/A';
  }

  getPzasPorCajaByTalla( talla:string ){

    let element_by_talla = this.getByTalla(talla);
    //console.log(element_by_talla, talla);
    if(element_by_talla)
    return element_by_talla.SalPackUn;
    else
      return 'N/A';
  }

  getCodeByTalla( talla:string ){

    let element_by_talla = this.getByTalla(talla);

    return element_by_talla ? 
      element_by_talla.ItemCode :
      null ; 
  }

  changeValueInput(talla:string,el){
    console.log(
      el.target.value
    );
    let element_by_talla = this.getByTalla(talla);
    console.log(this.prods_pedido);
    element_by_talla = this.getByTalla(talla);
    console.log(element_by_talla);
    let ItemCode =  element_by_talla ?
      element_by_talla.ItemCode :
      null;

    console.log(
      parseInt(el.target.value)
    );
    if( 
       !isNaN(
         parseInt(
           el.target.value
         )
       ) &&
       el.target.value <= 0 
      ){
      
      this.toastr.info("Valor no permitido!!!", "INFO", {
        positionClass: "toast-top-center",
      });

      let index = this.getIndex(ItemCode);
      el.target.value =  index == -1 ?
        "" : 
        this.prods_pedido[index].Quantity;

      el.target.blur;
      return;
    } 
    let item = {
      ItemCode,
      Quantity:el.target.value,
      Color: element_by_talla.Color,
      Talla: element_by_talla.U_Talla,
      U_HEX: element_by_talla.U_HEX,
      SalPackUn: element_by_talla.SalPackUn,
    }; 

    this.prod_add_emit.emit(item);
    console.log( ItemCode );
    console.log(el.target.value);


    this.addItem(item);
    console.log(this.prods_pedido);
  }

  private getIndex(itemCode:any){
    return this.prods_pedido.findIndex(
      item => item.ItemCode == itemCode 
    ) ;

  }

  private addItem(item_add:any){
    let index = this.getIndex(item_add.ItemCode);
    if(index == -1)
      this.prods_pedido.push(item_add);
    else
      this.prods_pedido[index].Quantity =item_add.Quantity;
  }

  filterProduct(value:string){
    console.log(value);
  }


}
