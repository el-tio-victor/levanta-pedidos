import {
  Component,
  Inject, OnInit
} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-detail-pedido',
  templateUrl: './detail-pedido.component.html',
  styleUrls: ['./detail-pedido.component.css']
})
export class DetailPedidoComponent implements OnInit {

  index_step:number = 0;

  direccion_entrega:any = null;
  is_valid_edicion_ped = true;
  comentario :string = "";
   orden_compra:string = "";

  steps:any[]=[
    {
      current: 'update_cart',
      next: 'shipping_address',
      prev: null,
      title:'Su pedido...',
      logo: 'shopping_cart',
    },{
      current: 'shipping_address',
      next: 'confirm_cart',
      prev: null,
      title:'Entrega',
      logo: 'local_shipping',
    },{
      current: "confirm_cart",
      next: null,
      prev: "shipping_address",
      title:'Confirmar Pedido',
      logo: 'save',
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<DetailPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 

    this.comentario = localStorage.getItem('Comment');
    this.orden_compra = localStorage.getItem('orden_compra');
  }

  ngOnInit(): void {
  }
  
  changeStep( step:number ){
    this.index_step= this.index_step+ step;
  }

  countItems():any{
     let items = Object.values(this.data.items)
    .reduce(function (result,actual) {
      
      //if(Array.isArray(result)){
        let sum_prods = 0;
        if(Array.isArray(actual['prods']))
          {

           sum_prods = actual['prods'].reduce((res,act) => {
            return   parseInt(res) + parseInt(act.Quantity)
        },0)
          }
        //result.push(...actual['prods'])
      //}

      if(typeof result === "number")
      return  result + sum_prods ;

    }, 0 );

    return items  ? items : 0;
  }


  getMonto(){
     let items = Object.values(this.data.items)
    .reduce(function (result,actual) {
        let sum_prods = 0;
        if(Array.isArray(actual['prods']))
          {
           
            sum_prods = actual['prods'].reduce((res,act) => {
             let monto_total = act.Quantity * act.Price;
            return   res + monto_total
            },0)
          }

      if(typeof result === "number")
      return  result + sum_prods ;

    }, 0 );

    return items  ? items : 0;

  }

  setDireccionEntrega(value:any){
    this.direccion_entrega = value;
  }

  setComentario(value:string){
    console.log('set commenter');
    this.comentario = value;
  }

  setOrdenCompra(value:string){
    this.orden_compra = value;
  }

  imprime(el:any){
    console.log(el);
  }

  isValidUpdatePed(value:boolean){
    this.is_valid_edicion_ped = value;
    console.log('recibiendo emit',value)
    console.log(
      'products',
      this.data.items,
    );
    if(this.is_valid_edicion_ped){
      if(
        Object.keys(this.data.items).length == 0
      )
        this.is_valid_edicion_ped = false;
    }

  }

  validNext(){
    if(this.index_step == 1){
      console.log(this.direccion_entrega);
      if( this.direccion_entrega ){
        return true;
      }
      else{
        return false;
      }
    }
    else if(this.index_step == 0){
      return this.is_valid_edicion_ped;
    }
    return true;
  }


  onNoClick(confirm:boolean ,remove_cart:boolean = false):void{
    let data = confirm ? 
      {
        direccion_entrega : this.direccion_entrega
        .AddressName,
        orden_compra :  this.orden_compra,
        comentario : this.comentario,
    } : {};

    this.dialogRef.close(
      {
        confirm,
        data,
        remove_cart
      }
    );

  }
}
