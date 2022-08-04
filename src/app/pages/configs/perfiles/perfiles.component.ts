import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../global.service";
import {CatalogosService} from "../../../services/catalogos.service";

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  datauser;
  roles:any[];
  rol_detail:any[];
  is_loading = false;

  constructor(
    private globalService: GlobalService,
    private catalogosService: CatalogosService,
    private toastr: ToastrService,
  ) {
    this.datauser = this.globalService.getData();
  }

  ngOnInit(): void {
    this.loadRoles();
  }


  loadRoles() {
    this.is_loading = true;
    this.catalogosService.All("", "SapRoles").subscribe(
      (response: any) => {
        this.is_loading = false;
        console.log(response);
        if (response.status == 200) {
          this.roles = response.data;
          console.log(this.roles);
        }
      },
      (error) => {
        console.log(error);
        this.is_loading = false;
        this.handleMsgErrorRequest(error);
      }
    );
  }

  view(id){
    this.catalogosService.All("",`SapRoles/${id}`).subscribe(
      (response: any) => {
        this.is_loading = false;
        console.log(response);
        if (response.status == 200) {
          let index =this.roles.findIndex(
            item => item.id === id
          );
          this.roles[index].actions = response.data.actions;
          console.log(this.roles[index]);
        }
      },
      (error) => {
        console.log(error);
        this.is_loading = false;
        this.handleMsgErrorRequest(error);
      }
    );

  }



  /*private handlerActionSuccessResponse(){
    let action = this.action_create ? "Agregado" :
      "Actualizado";

    this.is_loading = false;
    this.toastr.success(`Modulo ${action} Correctamente`, 
        "SUCCESS", {
        positionClass: "toast-top-center",
    });
    window.location.reload();
  }*/

  private handleMsgErrorRequest(error: any): void {
    this.is_loading = false;
    let msg = this.globalService.errorToken(error);
    msg = this.globalService.errorMsg(msg, error);
    this.globalService.msgToastError(msg);
  }

}
