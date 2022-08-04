import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../global.service";
import {CatalogosService} from "../../../services/catalogos.service";

@Component({
  selector: "app-modulos",
  templateUrl: "./modulos.component.html",
  styleUrls: ["./modulos.component.css"],
})
export class ModulosComponent implements OnInit {
  datauser;
  modulos: any[];

  formModulo = this.fb.group({
    name: this.fb.control("", Validators.required),
    actions: this.fb.array([]),
  });

  is_loading = false;
  view_form = false;
  action_create: boolean = true;
  id: number;
  print_actions:string[];

  constructor(
    private fb: FormBuilder,
    private globalService: GlobalService,
    private catalogosService: CatalogosService,
    private toastr: ToastrService
  ) {
    this.datauser = this.globalService.getData();
  }

  ngOnInit(): void {
    this.loadModulos();
  }


  loadModulos() {
    this.is_loading = true;
    this.catalogosService.All("", "SapModules").subscribe(
      (response: any) => {
        this.is_loading = false;
        console.log(response);
        if (response.status == 200) {
          this.modulos = response.data;
        }
      },
      (error) => {
        console.log(error);
        this.is_loading = false;
        this.handleMsgErrorRequest(error);
      }
    );
  }

  get actions() {
    return this.formModulo.get("actions") as FormArray;
  }

  addAction(name: string) {
    if(this.action_create)
      this.actions.push(
        this.fb.group(
          {name:[name]}
        )
      );
    else{
      this.actions.push(
        this.fb.group(
          {actionName:[name]}
        )
      );
    }
  }
  printAction(name:string){
    this.print_actions.push(name);
  }

  removeAction(index: number) {
    this.actions.removeAt(index);
  }

  send() {
    console.log(this.formModulo.value);

    this.is_loading = true;
    if (this.action_create) {
      this.catalogosService
        .Post("", "SapModules", this.formModulo.value)
        .subscribe(
          (response: any) => {
            this.handlerActionSuccessResponse();
          },
          (error) => {
            this.handleMsgErrorRequest(error);
          }
        );
    }
    else{
      console.log(this.id);
      let jsstr = JSON.stringify(this.actions.value[0]);
      console.log(jsstr);
      let json = JSON.parse(jsstr);
      console.log(json);
      this.catalogosService.Update(
        "","SapModules",json,this.id
      ).subscribe(
        (response:any) =>{
          this.handlerActionSuccessResponse()
        },
        (error) => {
          this.handleMsgErrorRequest(error);
        }

      )
    }
  }

  private handlerActionSuccessResponse(){
    let action = this.action_create ? "Agregado" :
      "Actualizado";

    this.is_loading = false;
    this.toastr.success(`Modulo ${action} Correctamente`, 
        "SUCCESS", {
        positionClass: "toast-top-center",
    });
    window.location.reload();
  }

  private handleMsgErrorRequest(error: any): void {
    this.is_loading = false;
    let msg = this.globalService.errorToken(error);
    msg = this.globalService.errorMsg(msg, error);
    this.globalService.msgToastError(msg);
  }

  viewFormCreate(element?: any) {
    this.view_form = !this.view_form;
    this.formModulo.get("name").setValue("");
    this.actions.clear();
    this.print_actions = [];
    if (element) {
      this.action_create = false;
      this.id = element.id;
      this.formModulo.patchValue(element);
      element.actions.forEach((element) => {
        this.printAction(element.name);
      });
    } else {
      this.addAction("");
    }
  }
}
