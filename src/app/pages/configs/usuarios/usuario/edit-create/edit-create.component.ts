import {Component, Input, OnInit} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../../../global.service";
import {CatalogosService} from "../../../../../services/catalogos.service";

@Component({
  selector: 'app-edit-create',
  templateUrl: './edit-create.component.html',
  styleUrls: ['./edit-create.component.css']
})
export class EditCreateComponent implements OnInit {

  @Input() user;
  datauser;
  is_loading:boolean = false;
  userForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl( '',Validators.email ),
    rolId: new FormControl('',Validators.required),
    FederalTaxID: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    password: new FormControl( '', Validators.required ),
    branches: new FormArray([],Validators.required),
    active:new FormControl(  )
  });

  direcciones_entrega:any[];
  roles:any[];

  constructor(
    private globalService:GlobalService,
    private catalogosService:CatalogosService,
    private router: Router,
    private toastr:ToastrService
             ) {
    this.datauser = this.globalService.getData();
  }

  ngOnInit(): void {
    if(this.user){
      this.userForm.get('password').clearValidators();
    }
    this.catalogosService.All("","SapRoles")
    .subscribe(
      (response:any) =>{
        console.log(response);
        if(response.status == 200){
          this.roles = response.data;
        }
      },
      error =>{
        console.log(error);
        this.handleMsgErrorRequest(error)
      }
    );

    if(this.user){
      /*this.userForm.controls['username'].setValue(
        this.user.username
      );*/
      this.userForm.patchValue({
        'username': this.user.username,
        'password': this.user.password,
        'first_name': this.user.first_name,
        'last_name': this.user.last_name,
        'email': this.user.email,
        'rolId': this.user.rolId,
        'FederalTaxID': this.user.FederalTaxID,
        'active': this.user.active,
      });
      
      this.user.branches.forEach(element => {
        this.addBranch(element.ShipToCode);
      });
      this.loadDirecciones();
    }

  }

  changeSelectDireccion(e){
    console.log(e.srcElement.checked);
    console.log(e.srcElement.dataset.branch);
    if(e.srcElement.checked){
      this.addBranch(
        e.srcElement.dataset.branch
      );
    }
    else{
      this.deleteBranch(
        e.srcElement.dataset.branch
      );
    }
  }

  loadDirecciones(){
    let rfc = this.userForm.get('FederalTaxID').value;
    if(!this.userForm.get('FederalTaxID').invalid){
      this.is_loading = true;
      this.catalogosService.All("",`BusinessPartners/${rfc}/Addresses`)
      .subscribe(
        (response:any)=>{
          console.log(response);
          this.is_loading = false;
          if(response.status == 200){
            this.direcciones_entrega = response.data;
          console.log(this.direcciones_entrega);
          }
        },
        error => {
          this.is_loading = false;
          console.log(error);
          this.handleMsgErrorRequest(error);
       }
      );
    }
    else{
      alert('Agregue un RFC válido')
    }
  }

  get branches(){
    return this.userForm.get('branches') as FormArray;
  }

  get rolId(){
    return this.userForm.get('rolId') ;
  }
  addBranch(name:string):void{
    this.branches.push( new FormControl({
      "ShipToCode":name}) )
  }

  deleteBranch(name:string):void{
    this.branches.removeAt(
      this.branches.value.findIndex(item =>
        item.ShipToCode === name
      )
    );
  }

  isChecked(ShipToCode:string){
    if(this.branches.value.filter(
      item => item.ShipToCode === ShipToCode).length > 0)
    return true;
    else 
      return false;
  }

  changeActive( e ){
    console.log('plox',e.srcElement.checked);
    if( e.srcElement.checked ){
      console.log('1');
      this.userForm.get('active').patchValue('1' )
      //return true;
    }
    else{
      console.log('0')
      this.userForm.get('active').patchValue('0' )
      //return false;
    }
  }

  send(){
    console.log(this.userForm.value);
    this.is_loading = true;
    if(!this.user){
      this.catalogosService.Post("","sapusers",this.userForm.value)
      .subscribe(
        (response:any) => {
          console.log(response);
          this.is_loading = false;
          this.handleResponseRequest(response);
        },
        (error) => {
          console.log(error)
          this.is_loading = false;
          this.handleMsgErrorRequest(error);
        }
      );
    }
    else{
      this.catalogosService.Update(
        "","sapusers",this.userForm.value,this.user.id)
      .subscribe(
        (response:any) => {
          console.log(response);
          this.is_loading = false;
          this.handleResponseRequest(response);
        },
        (error) => {
          console.log(error)
          this.is_loading = false;
          this.handleMsgErrorRequest(error);
        }
      );
    }
  }
  private handleMsgErrorRequest(error:any):void{
    let msg = this.globalService.errorToken(error);
    msg = this.globalService.errorMsg(msg,error);
    this.globalService.msgToastError(msg);
  }
  private handleResponseRequest(response:any){
    //if(response.status == 201 || response.status == 200 || 
      //action == 'update'){
      let url = `admin/${
        this.datauser.username.toLowerCase()
        }/usuarios`;
        this.toastr.success(
          "Usuario Agregado Correctamente.", 
          "SUCCESS", 
          {
            positionClass: "toast-top-center",
          }
        );
        this.router.navigateByUrl(url);
    //}
  }

}
