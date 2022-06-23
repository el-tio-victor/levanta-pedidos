import {
  Component,
  OnInit
} from '@angular/core';
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
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  is_loading: boolean = false;
  all_facturas: any[];
  user: string;

  next_link:string ;
  prev_link:string ;
  current_page:number = 0;

  params_to_filter:string = "";

  constructor(
    private catalogosService: CatalogosService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.user = this.globalService.getData().username;
    this.loadAll();
  }

  ngOnInit(): void {
  }

  private loadAll():void{

    this.is_loading = true;
    this.catalogosService.All("", "Invoices")
    .subscribe(
      (response:any) => {
        console.log(response);
        this.is_loading = false;
        if(response.status == 200){
          this.all_facturas = response.data;
          this.setPaginateInfo(
            response
          );
          console.log(this.all_facturas);
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

          //let params = this.getParamsToFilter();
          let params = this.params_to_filter.substring(1);
          this.sendEmail(
              "Invoices/sendEmail?"+params,
                response.data.emails
            );
          }
        }
      }
    );
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
          this.all_facturas = response.data;
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

  setParamToFilter(value:string){
    this.params_to_filter = value;
  }
  
  filter(){
    //let params = this.getParamsToFilter();
    let params = this.params_to_filter.substring(1);
    //console.log('params',params)
    //if(params != ""){

    let url =`Invoices?${params}`;

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
          this.all_facturas = response.data;
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
