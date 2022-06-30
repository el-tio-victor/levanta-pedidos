import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import * as moment from "moment";
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../global.service";
import {CatalogosService} from "../../services/catalogos.service";
import {
  SendEmailComponent
} from "../shared/send-email/send-email.component";

@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.component.html",
  styleUrls: ["./pedidos.component.css"],
})

export class PedidosComponent implements OnInit {

  next_link:string ;
  prev_link:string ;
  current_page:number = 0;

  is_loading: boolean = false;
  all_pedidos: any[];
  user: string;

   filters_config = {
    folio: {
      param_name:'DocNum',
      placeholder: '#Pedido'
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
    status:{
      param_name: ""
    }
  };

  params_to_filter:string = "";

  constructor(
    private catalogosService: CatalogosService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.user = this.globalService.getData().username;
    console.log(this.user);
    this.loadAll();
  }

  readDate(date: string): string {
    return moment(date).locale("es").format("DD/MMMM/YYYY");
  }

setParamToFilter(value:string){
  console.log('param.prod',value);
  this.params_to_filter = value;
}

loadViewSendMail():void{
  let emails = this.globalService.getData().EmailAddress
    .split(";");
  //console.log(emails);
  let view = this.dialog.open(
    SendEmailComponent,
    {
      data: {
        emails
      },
      width: '610px'
    }
  )
  .afterClosed()
  .subscribe(
    (response:any) =>{
      console.log(response);
      if(response){
        if(response.confirm){

        let params = this.params_to_filter.substring(1);
        this.sendEmail(
            "Orders/sendEmail?"+params,
              response.data.emails
          );
        }
      }
    }
  )
}

sendEmail(url:string, email:string){
  this.is_loading = true;
  this.catalogosService.Post("",url,{email} )
  .subscribe(
    (response:any) => {
      if(response.status == 200){
        this.is_loading = false;
        this.toastr.success( "Email enviado!", "SUCCESS", {
        positionClass: "toast-top-center",
        } ) ;
      }
    },
    error =>{
      console.log(error);
      this.is_loading = false;
      let msg = this.errorToken(error);
      msg = this.errorMsg(msg, error);
      this.msgToastError(msg);
    }
  );
}


loadAll() {
  this.is_loading = true;
  this.catalogosService.All("", "Orders").subscribe(
    (response: any) => {
      this.is_loading = false;
      console.log(response);
      if (response.status == 200) {
        this.all_pedidos = response.data;
        this.setPaginateInfo(
          response
        );
      }
    },
    (error) => {
      this.is_loading = false;
      let msg = this.errorToken(error);
      msg = this.errorMsg(msg, error);
      this.msgToastError(msg);
    }
  );
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
  console.log(element.dataset.target);
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
        this.all_pedidos = response.data;
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

show(id: number) {
  let url = `admin/${this.user.toLowerCase()}/pedido/${id}`;
  this.router.navigateByUrl(url);
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
}*/
getValue( element:any ){
  return element.srcElement ?
    element.srcElement.value :
    element.value;
}

/*getData(element:any){
  return element.srcElement ?
    element.srcElement.dataset.param_url :
    element.dataset.param_url;
}*/

/*search(event: any) {
  
  let value = this.getValue(event);

  let param =  this.getData(event);
  if(value == "" ||
    (isNaN(value) && param == 'DocNum'))
      return ;

    let current_filter = param == "DocNum" ?
      "doc_number" : "entrega"
    //this.clearFilters(current_filter);
    this.is_loading = true;
    this.catalogosService.AllByProperty(
      "Orders", param, value
    ).subscribe(
      (response: any) => {
        this.is_loading = false;
        console.log(response);
        if (response.status == 200) {
          
            this.all_pedidos = response.data;
            this.setPaginateInfo(
              response
            );
        }
      },
      (error) => {
        this.is_loading = false;
        let msg = this.errorToken(error);
        msg = this.errorMsg(msg, error);
        this.msgToastError(msg);
      }
    );
  }*/


  /*getParamsToFilter(){
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

    let param_filter_status = 
      this.filter_status_id == "" ?
      "" :
      `&DocStatus=${this.filter_status_id}`;

    let doc_num = this.search_num_ped.nativeElement.value;
    let param_doc_num = 
      doc_num == "" ?
      "" :
      `&DocNum=${doc_num}`
    
    params = `${param_ship_to_code}${
      param_date_start
    }${
      param_date_end
    }${
      param_filter_status
    }${
      param_doc_num
    }`;

    return params;
  }*/

  filter(){
    /*let params = this.getParamsToFilter();
    params = params.substring(1);
    console.log(params)*/
    let params = this.params_to_filter.substring(1);
    //if(params != ""){

    let url =`Orders?${params}`;

    console.log(params);
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
          this.all_pedidos = response.data;
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

  /*searchDate(date_1: any, date_2: string = null) {
    if (date_1 != "") {
      //this.clearFilters('date');
      if (date_2 == "") {
        this.is_loading = true;
        this.catalogosService
          .AllByProperty("Orders", "startDate", date_1)
          .subscribe(
            (response: any) => {
              this.is_loading = false;
              console.log(response);
              if (response.status == 200) {
                this.all_pedidos = response.data;
                this.setPaginateInfo(
                  response
                );
              }
            },
            (error) => {
              this.is_loading = false;
              let msg = this.errorToken(error);
              msg = this.errorMsg(msg, error);
              this.msgToastError(msg);
            }
          );
      } else {
        this.is_loading = true;
        let url = `Orders?startDate=${date_1}&endDate=${date_2}`;
        console.log(url);
        this.catalogosService.All("", url).subscribe(
          (response: any) => {
            this.is_loading = false;
            console.log(response);
            if(response.status == 200){
              this.all_pedidos = response.data;
              this.setPaginateInfo(
                response
              );
            }
          },
          (error) => {
            this.is_loading = false;
            let msg = this.errorToken(error);
            msg = this.errorMsg(msg, error);
            this.msgToastError(msg);
          }
        );
      }
    }
  }

  setFilterStatus(filtro:string,filtro_text:string, el:any):void{
    //let params = this.getParamsToFilter();
    this.filter_status_id = filtro;
    this.filterStatus = filtro_text;
    console.log(el);
    el.classList.add("active-filter-status");
  }

  clearNumDoc(){
    this.search_num_ped.nativeElement
      .parentNode.classList.remove('border-m') ;

    this.search_num_ped.nativeElement.value= "";
  }
  clearDate(){
    console.log('clear date');
    this.date_1.nativeElement.parentNode
    .classList.remove('border-m');
    this.date_1.nativeElement.value= "";
    this.date_2.nativeElement.value= "";
  }
  clearStatus(){
    console.log('clear status');
    this.btn_filter_status.nativeElement.classList
    .remove('active-filter-status');
    this.filterStatus = "";
  }
  clearEntrega(){
    this.search_lugar_envio .nativeElement
    .parentNode.classList.remove('border-m');
    this.search_lugar_envio.nativeElement.value="";
  }
  clearFilters(current_filter:string){
    for(let key in this.filters){
      if(key  != current_filter)
        this.filters[key]();
    }
    if(current_filter == "all"){
      this.loadAll()
    }
  }*/

  ngOnInit(): void {}
}
