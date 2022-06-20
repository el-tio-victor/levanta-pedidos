import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import * as moment from "moment";
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../global.service";
import {CatalogosService} from "../../../services/catalogos.service";

@Component({
  selector: 'app-show-by-id',
  templateUrl: './show-by-id.component.html',
  styleUrls: ['./show-by-id.component.css']
})
export class ShowByIdComponent implements OnInit {

  user:string;
  pedido:any[];
  tallas_by_estilo:any[];
  id:string;
  is_loading:boolean = false;
  products:any[];
  productsList: any[]
  quantity_total_prods:number = 0;

  current_prod:string = "";

  constructor(
    private catalogosService: CatalogosService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private router: Router,
    private getParamRoute: ActivatedRoute,
  ) {
    console.log('construct');
    this.user = this.globalService.getData().username;
    this.id = this.getParamRoute.snapshot.paramMap
    .get('id');

      this.getPedido();
    
  }


  setCurrentProd(value:any):void{
    this.current_prod = value;
  }

  readDate(date:string):string{
    return moment(date).locale('es').format("DD/MMMM/YYYY");
  }

  getPedido(){
    this.is_loading = true;
     this.catalogosService.Id('','Orders',this.id)
    .subscribe(
       ( response:any) => {
         this.is_loading = false;
        if(response.status == 200){
          
          this.pedido = response.data;
          this.products = this.pedido['DocumentLines'];
          this.productsList = this.pedido['DocumentLines'];

          console.log( this.pedido );
          console.log( this.products );

           

          let itemsAgrupados = this.orderByKey(
            this.products, "ItmsGrpNam"
          );

          console.log(itemsAgrupados);
          this.products = itemsAgrupados;

        }
      },
      error => {
        console.log(error);
         this.is_loading = false;
        let msg = this.errorToken(error);
        msg =
          msg == "" ? 
          `Ocurrio un error al procesar la petición "${
            error.error.msg
          }"` : msg;

          this.msgToastError(msg);
      }
    );
  }

  orderByKey(array,key){
    //console.log('arr',array);
    return array.reduce(
      (result, currentValue) => {
        //console.log('currentValue ', currentValue);
        
        //este valor se agraga para prevenir que se
        //agrupe por un valor nulo (caso en que agre
        //gan un serevicio en el pedido cuando lo 
        //pasan de sap a retail)
        
        let key_not_null = currentValue[key] ?
          key : 'ItemCode';

        (result[currentValue[key_not_null]] =
          result[currentValue[key_not_null]] || [])
        .push(currentValue);
       // console.log('res',result);
        return result;
      }, {});
  }

  getTotalProds():number{
    return this.productsList.reduce(
        (result,current) =>{
          return result +=current.Quantity
        }
    ,0);
  }
 
  getTallas(object:any){
    let tallas = object.reduce((result,current) => { 
      if(Array.isArray(result)){
        if(!result.includes(current['U_Talla'])){
          let item_push = current['U_Talla'] ?
            current['U_Talla'] :
            current['ItemCode']
          result.push( item_push );
        }
      }
      return result;
    },[]);
    //console.log('tallaaaa', tallas)
    this.tallas_by_estilo = tallas;
    return tallas;
  }

  errorToken(error: any) {
    let msg = "";
    if (error.error) {
      if (error.error.status == 409) {
        msg = "Token expirado!";
        this.router.navigateByUrl("/");
      }
    }
    return msg;
  }

  msgToastError(msg: string): void {
    this.toastr.error(msg, "Error", {
      positionClass: "toast-bottom-left",
    });
  }

  getQuantity(el:any, talla:string){
    console.log('cantidades',el,'talla ', talla);
    let element_found =
        el.find(item => item.U_Talla == talla);

    //se agrega caso para mostrar cuando ingresan
    //un servicio al pedido
    if(!element_found){
      element_found =
        el.find(item => item.ItemCode == talla);
    }
    return element_found ?
      element_found.Quantity : '-';
  }

  getDescription(el:any){

    let salida = el[0] ? el[0].ItemDetails : "";
    return salida;
  }


  ngOnInit(): void {
  }

  ngDoCheck(){
    console.log()
    console.log('changessss');
  }

}
