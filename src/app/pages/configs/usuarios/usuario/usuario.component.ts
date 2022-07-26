import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { GlobalService } from "../../../../global.service";
import { CatalogosService } from "../../../../services/catalogos.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  data_user:any;
  user:any[];
  modules:any[];
  id:string;
  is_loading:boolean = false;

  constructor(
    private catalogosService: CatalogosService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private router: Router,
    private getParamRoute:ActivatedRoute,
  ) {
    this.data_user = this.globalService.getData();
    this.id = this.getParamRoute.snapshot
    .paramMap.get('id');
    this.is_loading = true;
  }

  ngOnInit(): void {
    this.catalogosService.Id("","sapusers",this.id)
    .subscribe(
      (response:any) =>{
        console.log(response);
        this.is_loading = false;
        if(response.status == 200){
          this.user = response.data;
          this.modules = response.data.modules;
        }
      },
      error => {
        this.is_loading = false;
        console.log(error)
        let msg = this.globalService.errorToken(error);
        msg = this.globalService.errorMsg(msg,error);
        this.globalService.msgToastError(msg);
      }
    );
  }

}
