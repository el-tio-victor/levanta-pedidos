import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../../global.service";
import {CatalogosService} from "../../../../services/catalogos.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  data_user:any;
  user:any[];
  id:string;

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
  }

  ngOnInit(): void {
    this.catalogosService.Id("","sapusers",this.id)
    .subscribe(
      (response:any) =>{
        console.log(response);
        if(response.status == 200){
          this.user = response.data;
        }
      },
      error => console.log(error)
    );
  }

}
