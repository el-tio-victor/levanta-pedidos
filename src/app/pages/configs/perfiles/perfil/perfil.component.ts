import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../../global.service";
import {CatalogosService} from "../../../../services/catalogos.service";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.css"],
})
export class PerfilComponent implements OnInit {
  datauser: any;
  user: any[];
  modules: any[];
  rol: any[];
  id: string;
  action: string;
  is_loading: boolean = false;
  actions_rol = [];

  form_rol = this.fb.group({
    name: this.fb.control("", Validators.required),
    actions: this.fb.array([],Validators.required),
  });

  constructor(
    private globalService: GlobalService,
    private catalogosService: CatalogosService,
    private getParamRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.datauser = this.globalService.getData();

    this.id = this.getParamRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {

    this.loadModules();
  }

  private loadRol(): void {
    this.catalogosService.All("", `SapRoles/${this.id}`).subscribe(
      (response: any) => {
        if (response.status == 200) {
          this.rol = response.data;
          this.form_rol.patchValue({
            name:this.rol['name']
          });

          this.rol['actions'].forEach(
            element => {
              let modulo = this.searchModule(element);
              this.addAction(element, modulo)
            }
          );
          console.log(this.rol);
        }
      },
      (error) => {
        this.handleMsgErrorRequest(error);
      }
    );
  }

  loadModules(): void {
    this.catalogosService.All("", "SapModules").subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == 200) {
          this.modules = response.data;
          if (parseInt(this.id) > 0) this.loadRol();
        }
      },
      error =>{
        this.handleMsgErrorRequest(error);
      }
    );
  }

  get actions() {
    return this.form_rol.get("actions") as FormArray;
  }

  printeable(id:any){
    if(parseInt(this.id) == 0){
      return true;
    }
    else{
      if(this.actions.value.find(el => el.actionId == id)){
        return false;
      }
      return true;
    }
  }

  addAction(item,modulo) {
    this.actions.push(
      this.fb.group({
        actionId: item.id,
        name: item.name,
        name_module: modulo.name,
        id_module: modulo.id,
      })
    );
  }

  removeAction(index:number):void{
    console.log(this.actions.value[index]);
    this.addToModule(this.actions.value[index]);
    this.actions.removeAt(index);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('in the same');
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let modulo = this.searchModule(
        event.previousContainer.data[event.previousIndex]
      );
      this.addAction(
        event.previousContainer.data[event.previousIndex],
        modulo
      );

      event.previousContainer.data.splice(event.previousIndex,1);
    }

  }
  addToModule(element:any){
    let index = this.modules.findIndex(
      el => el.id === element.id_module
    );
    this.modules[index].actions.push({
      id: element.actionId,
      name: element.name
    })
  }
  searchModule(element):any{
    for (let index = 0; index < this.modules.length; index++) {
      const item = this.modules[index];
      if(
        item.actions.find(
          el => el.id === element.id
        )
      ){
        return item;
      }
      
    }
  }

  send(){
    if(parseInt(this.id) === 0){
      this.catalogosService.Post(
        "",
        "SapRoles",
        this.form_rol.value
      ).subscribe(
        (response:any) =>{
          this.handlerActionSuccessResponse();
        },
        (error) => {
          console.log(error);
          this.handleMsgErrorRequest(error);
        }
      );
    }
    else{
      this.catalogosService.Update(
        "","SapRoles",this.form_rol.value,parseInt(this.id)
      )
      .subscribe(
        (response:any) =>{
          this.handlerActionSuccessResponse()
        },
        error => {
          this.handleMsgErrorRequest(error)
        }
      )
    }

  }

  private handlerActionSuccessResponse(){
    let action = parseInt(this.id) == 0 ? "Agregado" :
      "Actualizado";

    this.is_loading = false;
    this.toastr.success(`Rol ${action} Correctamente`, 
        "SUCCESS", {
        positionClass: "toast-top-center",
    });
    
    let url = `/admin/${this.datauser.username}/roles`; 
    this.router.navigateByUrl(url);
  }

  private handleMsgErrorRequest(error: any): void {
    this.is_loading = false;
    let msg = this.globalService.errorToken(error);
    msg = this.globalService.errorMsg(msg, error);
    this.globalService.msgToastError(msg);
  }

  
}
