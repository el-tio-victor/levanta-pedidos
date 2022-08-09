import {Component, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import * as XLSX from "XLSX";
import {GlobalService} from "../../global.service";
import {CatalogosService} from "../../services/catalogos.service";
import {DetailPedidoComponent} from "./detail-pedido/detail-pedido.component";

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.component.html",
  styleUrls: ["./pedido.component.css"],
})
export class PedidoComponent implements OnInit {
  objectKeys = Object.keys;

  itemsAgrupados: any = null;
  estilo_select: any;
  status_edit_prod_detail:boolean = true;

  colors: string[] = null;
  colores_disponibles: any[] = [];
  prods_pedido: any[] = [];
  is_loading = false;
  is_saved_order:boolean=true;
  descripcion_articulo: string = "";
  descripcion_estilo: string;
  icono_articulo: string = "";
  comentario: string = "";

  AddressName: string = "";
  Addresses: any[];

  tallas: string[] = [];

  estilos: any[] = [];

  datauser;

  data_to_send: any = {};
  data_to_view: any = {};
  @ViewChild("template_detail_pedido", { static: true })
  template_dialog_detail_pedido: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    private catalogosService: CatalogosService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.datauser = this.globalService.getData();
    this.estilos = this.datauser.itemGroups;
    this.Addresses = this.datauser.Addresses;

    //Armo el objeto a enviar con los productos que se
    //seleccionarán posteriormente
    let date = new Date();
    let month = `0${date.getMonth() + 1}`;
    month = month.slice(-2);
    let day = `0${date.getDate()}`;
    day = day.slice(-2);

    this.data_to_send.CardCode = this.datauser.CardCode;
    this.data_to_send.DocDueDate = `${date.getFullYear()}-${month}-${day}`;
    this.data_to_send.Comments = this.comentario;
    this.data_to_send.U_ORDENCOMPRA = "";
    this.data_to_send.SalesPersonCode = "-1";
    //this.data_to_send.Series = "101";
    this.data_to_send.ShipToCode = "";
    this.data_to_send.DocumentLines = [];
    this.data_to_send.Company = "U_GP_TEST"
    this.data_to_send.U_IsWeb = "Y";

    if(this.globalService.getData('pedido')){
      if(this.globalService.getData('storage_user_pedido') ==
         this.datauser.username){
        this.data_to_view = JSON.parse(this.globalService.getData('pedido'));
      }
      else{
        this.globalService.removeItemData('pedido');
      }
    }

    console.log(this.data_to_send);
  }

  alertOrderNotSaved(){
    if(!this.is_saved_order){
      Swal.fire(
        'Hay un articulo sin agregar al carrito',
        '',
        'info'
      );
    }
  }

  getValueColor(key: string, codigo_color: string) {
    let index = this.colores_disponibles.findIndex(
      (item) => item.codigo == codigo_color
    );
    if (index != -1) {
      return this.colores_disponibles[index][key];
    } else return codigo_color;
  }

  setIsSavedOrder(estatus:boolean):void{
    this.is_saved_order = estatus;
  }

  removeToCart(style:string){
    delete this.data_to_view[style];
  }

  addToCart() {
    /** data_view **/
    console.log("estado de prods",this.prods_pedido)
    let estilo = this.prods_pedido[0]
      ? this.prods_pedido[0].ItemCode.split("-")[0]
      : "";
      let arr_tallas = this.prods_pedido.reduce((result,current)=>{
        if(!result.includes(current.Talla) )
        result.push(current.Talla);
        return result;
      },[]);

    let ob_aux = {
      prods: null,
      descripcion: this.descripcion_articulo,
      icono: this.icono_articulo,
      tallas: arr_tallas
    };
    if (estilo != "") {
      ob_aux.prods = this.prods_pedido;

      if( !this.data_to_view[estilo] )
        this.data_to_view[estilo] = ob_aux;
      else{
        for (const key in this.prods_pedido) {
          let search = this.prods_pedido[key].ItemCode;
          let index =this.data_to_view[estilo].prods.findIndex(
            item => item.ItemCode === search
          );
          if(index != -1){
            this.data_to_view[estilo].prods[index].Quantity =
              this.prods_pedido[key].Quantity;
          }
          else{
            this.data_to_view[estilo].prods.push(
              this.prods_pedido[key]
            );

            if(!this.data_to_view[estilo].tallas.includes(
              this.prods_pedido[key].Talla
            )){
              this.data_to_view[estilo].tallas.push(
                this.prods_pedido[key].Talla
              )
            }
            console.log(this.data_to_view[estilo])
          }
        }
      }

      /* Guardo en localstorage usuario y pedido*/
      this.globalService.setData(
        'pedido',
        JSON.stringify(
          this.data_to_view
          )
      );
      this.globalService.setData(
        'storage_user_pedido',
        this.datauser.username
      );
      //** End **//

      this.toastr.success("Producto Agregado al carrito", "SUCCESS", {
        positionClass: "toast-top-center",
      });
    } else {
      alert("Error al intentar sacar estilo");
    }
  }

  isEmptyCart() {
    return Object.keys(this.data_to_view).length > 0 ? false : true;
  }


  removeShoppingCart():void{
     this.data_to_view = {};
    this.prods_pedido = [] ;
    this.clearProds();
    this.globalService.removeItemData('pedido');
  }



  onFileChange(ev){
    console.log(ev);
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    console.log('change');
    reader.onload = (event) => {
      console.log('REDER');
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary'  });
      jsonData = workBook
      .SheetNames.reduce((initial, name) => {
          console.log('REDER');
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(jsonData);
      /*document.getElementById('output').innerHTML = 
        dataString.slice(0, 300).concat("...");
      this.setDownload(dataString);*/
    }
    reader.readAsBinaryString(file);
  }
  moveTo(section: string) {
    //console.log(section);
    let anterior_busqueda = document.querySelector(".wrapper-row.last-search");
    //console.log(anterior_busqueda);
    if (anterior_busqueda) anterior_busqueda.classList.remove("last-search");
    let el = document.getElementById(section);
    el.classList.add("last-search");
    //console.log(el);
    el.scrollIntoView({ behavior: "smooth" });
    /*window.location.hash = "";
    window.location.hash = section;*/
  }

  changeSelectEstilo(event: any) {

    this.tallas = [];
    this.descripcion_articulo = "";
    this.icono_articulo = "";
    this.prods_pedido = [];
    this.itemsAgrupados = null;
    this.is_loading = true;

    this.catalogosService
      .AllByProperty("getItems", "ItmsGrpCod", event.value)
      .subscribe(
        (response:any) => {
          this.is_loading = false;
          if (response.status == 200) {
            let index = this.estilos.findIndex(
              (item) => item.ItmsGrpCod == event.value
            );

            this.descripcion_articulo = this.estilos[index].U_DescripcionC;
            this.descripcion_estilo = this.estilos[index].U_DescripcionE;
            if(this.descripcion_estilo){
            this.descripcion_estilo = 
              this.descripcion_estilo.replace("\r","\n");
            }
            //this.descripcion_estilo = this.estilos[index].U_DescripcionE;

            this.icono_articulo = this.estilos[index].U_ICON;

            console.log(this.estilos[index]);
            let items = response.data;
            console.log("asi llega", items);

            let agruparArticulos = (array, key) => {
              return array.reduce((result, currentValue) => {
                (result[currentValue[key]] =
                  result[currentValue[key]] || []).push(currentValue);

                /** lleno array de colores **/
                if (
                  this.colores_disponibles.findIndex(
                    (item) => item.codigo == currentValue["Code_Color"]
                  ) == -1
                ) {
                  this.colores_disponibles.push({
                    codigo: currentValue["Code_Color"],
                    exadecimal: currentValue["U_HEX"],
                    espaniol: currentValue["Color"],
                  });
                }

                /** lleno array de tallas */
                if (
                  this.tallas.findIndex(
                    (item) => item == currentValue["U_Talla"]
                  ) == -1
                ) {
                  this.tallas.push(currentValue["U_Talla"]);
                }
                return result;
              }, {});
            };

            /*console.log('agrupando');
            console.log('items',items);*/

            this.itemsAgrupados = agruparArticulos(items, "Code_Color");

            this.colors = Object.keys(this.itemsAgrupados);
          }
        },
        (error) => {
          this.is_loading = false;
          let msg = this.errorToken(error);
          msg =
            msg == ""
              ? `Ocurrio un error al procesar la petición "${error.error.msg}"`
              : msg;

          this.msgToastError(msg);
        }
      );
  }

  msgToastError(msg: string): void {
    this.toastr.error(msg, "Error", {
      positionClass: "toast-top-center",
    });
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

  save() {
    let dialog = this.dialog
      .open(DetailPedidoComponent, {
        width: "620px",
        data: {
          items: this.data_to_view,
          direcciones: this.Addresses,
          direcc_select: this.AddressName,
        },
      })
      .afterClosed()
      .subscribe((response: any) => {
        if (response.confirm) {
          this.is_loading = true;
          console.log(response);

          response.data.comentario = response.data.comentario  ?
             "[*-"+response.data.comentario+"-*]" : "";
          response.data.orden_compra = response.data.orden_compra ?
            response.data.orden_compra : "";

          this.data_to_send.Comments = response.data.comentario;
          this.data_to_send.ShipToCode = 
            response.data.direccion_entrega;
          this.data_to_send.U_ORDENCOMPRA = response.data
          .orden_compra;

          let items_list = Object.values(this.data_to_view)
          .reduce(function (
            result,
            actual
          ) {
            if (Array.isArray(result)) {
              result.push(...actual["prods"]);
            }
            return result;
          },
          []);
          this.data_to_send.DocumentLines = items_list;

          console.log(items_list);
          console.log("data_send", this.data_to_send);
          console.log("pedido...", this.prods_pedido);
          this.catalogosService
          .Post("", "Orders", this.data_to_send).subscribe(
            (response: any) => {
              this.is_loading = false;
              if(response.status == 201){
                
                let url = 
                  `admin/${
                    this.datauser.username.toLowerCase()
                    }/pedidos`;
              localStorage.removeItem('Comment');
              localStorage.removeItem('orden_compra');
              this.globalService.removeItemData('pedido');
                this.toastr.success(
                  "Pedido agregado correctamente.", 
                  "SUCCESS", 
                  {
                    positionClass: "toast-top-center",
                  }
                );
                this.router.navigateByUrl(url);
              }
              console.log(response);
            },
            (error) => {
              this.is_loading = false;
              console.log(error);
              let msg = this.errorToken(error);
              msg =
                msg == ""
                  ? `Ocurrio un error al procesar la petición "${error.error.msg}"`
                  : msg;

              this.msgToastError(msg);
            }
          );
        }
        else if( response.remove_cart ){
          this.removeShoppingCart();
        }
      });
  }

  /** limpiar inputs al estar agreando un producto**/
  clearProds() {
    this.prods_pedido = [];
    let inputs = document.querySelectorAll("input.input-cantidad");
    for (let i = 0; i < inputs.length; i++) {
      (inputs[i] as HTMLInputElement).value = "";
    }
  }


  addProd(item_add: any) {
    let index = this.prods_pedido.findIndex(
      (item) => item.ItemCode == item_add.ItemCode
    );
    console.log(this.prods_pedido);
    let style = this.prods_pedido.length > 0 ?
        this.prods_pedido[0]
                .ItemCode.split('-')[0] :
                  "";
    index == -1 ?
        (
          (item_add.WarehouseCode = "CE01"),
          this.prods_pedido.push(item_add)
        ) : 
        (
          ( 
            isNaN(
              parseInt(
                item_add.Quantity
              )
            )
          ) ?
            (
 
              ( 
        
               this.prods_pedido.splice(index,1)
              ),
              (this.prods_pedido.length == 0)?
                this.removeToCart(style):
                console.log('mmmmm')
            )
            :
              this.prods_pedido[index]
              .Quantity = item_add.Quantity
        );
    console.log(
      'Consolaso para ver la edicion',
      this.prods_pedido);
      this.validEditPedDetail();
  }

  validEditPedDetail(){
    console.log('validando000')
    for (const key in this.prods_pedido) {
      if(
        !isNaN(
          this.prods_pedido[key].Quantity
        ) ||
        this.prods_pedido[key].Quantity < 1 
      ){
        this.status_edit_prod_detail = false;
      }
    }
  }

  isDisabledBtnSave() {
    if (this.prods_pedido) {
      if (this.prods_pedido.length > 0) return false;
    }
    return true;
  }

  countProds() {
    return Object.keys(this.data_to_view).length;
  }

  isDisabledBtnClear() {
    if (this.itemsAgrupados) {
      if (Object.keys(this.itemsAgrupados).length > 0) return false;
    }
    return true;
  }

  ngOnInit(): void {}
}
