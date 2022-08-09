import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import * as moment from "moment";
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../global.service";
import {CatalogosService} from "../../services/catalogos.service";


@Component({
  selector: 'app-backorder',
  templateUrl: './backorder.component.html',
  styleUrls: ['./backorder.component.css']
})
export class BackorderComponent implements OnInit {


    cliente:string = "";

   filters_config = {
    folio: {
      param_name:'FolioR1',
      placeholder: '#Folio R1'
    },
    fecha_inicio: {
      param_name: 'startDate'
    },
    fecha_fin: {
      param_name: 'endDate'
    },
    lugar_envio:{
      param_name: 'ShipToCode'
    },
    style:{
      param_name: 'ItemCode'
    }
  };
  params_to_filter:string = "";


    is_loading: boolean = false;
    all_docs: any[];
    user: string;
  
  
    next_link:string ;
    prev_link:string ;
    current_page:number = 0;

    all_by_style:any;
    tallas_by_estilo:any;
  

  constructor(
    private catalogosService: CatalogosService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private router: Router,
  ) { 
    this.user = this.globalService.getData().username;
    this.loadAll();
  }

  ngOnInit(): void {
  }

  private loadAll():void{

    this.is_loading = true;
    this.catalogosService.All("", "Backorder?maxpagesize=0")
    .subscribe(
      (response:any) => {
        console.log(response);
        this.is_loading = false;
        if(response.status == 200){
          this.all_docs = response.data;
          this.setPaginateInfo(
            response
          );
          if(this.all_docs.length > 0){
            console.log('Entro',this.cliente);
            this.cliente = 
                `${
                  this.all_docs[0].CardCode
                } - ${
                  this.all_docs[0].CardName
                }`;
          }


          this.all_by_style = this.orderByKey(
            this.all_docs, "ItmsGrpNam"
          );
          if(this.all_by_style['SERVICIO'])
            delete this.all_by_style['SERVICIO'];

          console.log('por estilo',this.all_by_style);
        }
      },
      (error)=> {
        console.log(error);
        this.is_loading = false;
        let msg = this.errorToken(error);
        msg = this.errorMsg(msg, error);
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


  getTallas( convert ){
    //console.log(object);
    /*let tallas = object.reduce((result,current) => { 
      if(Array.isArray(result)){
        if(!result.includes(current['Talla'])){
          let item_push = current['Talla'] ?
            current['Talla'] :
            current['ItemCode']
          result.push( item_push );
        }
      }
      return result;
    },[]);
    //console.log('tallaaaa', tallas)
    this.tallas_by_estilo = tallas;*/
   let tallas =convert ? convert.split(',') : [];
    return tallas;
  }

  getQuantity(el:any, talla:string){
    let element_found =
        el.find(item => item.Talla == talla);

    //se agrega caso para mostrar cuando ingresan
    //un servicio al pedido
    if(!element_found){
      element_found =
        el.find(item => item.ItemCode == talla);
    }
    return element_found ?
      element_found.Quantity : '-';
  }

  errorMsg(msg:any,error:any){
    return msg =
      msg == "" ? 
        `Ocurrio un error al procesar la petición "${error.error.msg}"`
            : msg;
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
      positionClass: "toast-top-center",
    });
  }

  readDate(date: string): string {
    return moment(date).locale("es").format("DD/MMMM/YYYY");
  }

  clearPaginate(){
    this.next_link = null;
    this.prev_link = null;
    this.current_page = null;
  }

  setPaginateInfo(response:any){
    this.next_link = response.nextLink;
    this.prev_link = response.previousLink;
    this.current_page = response.currentPage;
  }

  handlePaginate(element:any){
    let action = element.dataset.target;
    let url = "";
    if(action == 'prev'){
      url = this.prev_link;
    }
    else if(action == 'next'){
     url = this.next_link; 
    }
   
    this.is_loading = true;
    this.catalogosService.All('',url)
    .subscribe(
      (response:any) =>{
        this.is_loading = false;
        if(response.status == 200){
          console.log(response);
          this.all_docs = response.data;
          this.setPaginateInfo(response);
        }
      },
      (error) =>{
        this.is_loading = false;
        let msg = this.errorToken(error);
        msg = this.errorMsg(msg, error);
        this.msgToastError(msg);
      }
    );
  }


  /*focusInput(el: any , el_target = null) {
    el.classList.add("border-m");
  }

  blurInput(el: any) {
    console.log('valor', el.querySelector('input').value);
    if( el.querySelector('input').value == "")
      el.classList.remove("border-m");
  }
  focusInputDate( el:any ){
      el.classList.add("border-m");
  }
  blurInputDate( el:any ){
    if(el.value == "")
      el.classList.remove("border-m");
  }

  clearFilters(current_filter:string){
    for(let key in this.filters){
      if(key  != current_filter)
        this.filters[key]();
    }
    if(current_filter == "all"){
      this.loadAll()
    }
  }
  clearNumDoc(){
    this.search_num_doc.nativeElement
      .parentNode.classList.remove('border-m') ;

    this.search_num_doc.nativeElement.value= "";
  }
  clearDate(){
    console.log('clear date');
    this.date_1.nativeElement.parentNode
    .classList.remove('border-m');
    this.date_1.nativeElement.value= "";
    this.date_2.nativeElement.value= "";
  }
  clearEntrega(){
    this.search_lugar_envio .nativeElement
    .parentNode.classList.remove('border-m');
    this.search_lugar_envio.nativeElement.value="";
  }


  getParamsToFilter(){
    let params = ""; 

    let ship_to_code = this.
      search_lugar_envio.nativeElement.value;
    let param_ship_to_code = ship_to_code == "" ?
      "" :
      `&ShipToCode=${ship_to_code}`;

    let date_start = this.date_1.nativeElement.value;
      let param_date_start = date_start =="" ?
        "" :
        `&startDate=${date_start}`;

    let date_end = this.date_2.nativeElement.value;
    let param_date_end = 
      date_end == "" || param_date_start == "" ?
      "" :
      `&endDate=${date_end}`;


    let doc_num = this.search_num_doc.nativeElement.value;
    let param_doc_num = 
      doc_num == "" ?
      "" :
      `&DocNum=${doc_num}`
    
    params = `${param_ship_to_code}${
      param_date_start
    }${
      param_date_end
    }${
      param_doc_num
    }`;

    return params;
  }*/
  setParamToFilter(value:string){
    console.log('set',value)
    this.params_to_filter = value;
  }
  filter(){
    //let params = this.getParamsToFilter();
    let params = this.params_to_filter.substring(1);
    //if(params != ""){

    let url = params != "" ?`Backorder?${params}` :
      `Backorder?maxpagesize=0` ;

   this.is_loading = true;
    //this.clearFilters('status');
   this.catalogosService.All(
      "",
      url,
    )
    .subscribe(
      (response:any)=>{
        this.is_loading = false;
        if(response.status == 200){
          console.log('Alls',response)
          this.all_docs = response.data;
          this.setPaginateInfo(
                  response
          );
        }
      },
      (error)=>{
        this.is_loading = false;
        let msg = this.errorToken(error);
        msg = this.errorMsg(msg, error);
        this.msgToastError(msg);
      }
    );
    //}
  }

}
