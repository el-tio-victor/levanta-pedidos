import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {GlobalService} from "../../../global.service";
import {CatalogosService} from "../../../services/catalogos.service";
declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"],
})
export class UsuariosComponent implements OnInit {

  is_loading:boolean = false;
  usuarios: any[];
  user_data:any;
  constructor(
    private catalogosService: CatalogosService,
    private globalService: GlobalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user_data = this.globalService.getData();
    this.is_loading = true;
  }

  ngOnInit(): void {
    this.catalogosService.All("", "sapusers?maxpagesize=1000").subscribe(
      (response: any) => {
        this.is_loading = false;
        console.log(response);
        this.usuarios = response.data;

        let self = this;
        $("#datatable").DataTable({
          pagingType: "full_numbers",
          lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"],
          ],
          bSort: true,
          responsive: true,
          bAutoWidth: false,
          select: true,
          columnDefs: [
            {
              defaultContent: "-",
              targets: "_all",
            },
          ],
          language: {
            search: "_INPUT_",
            lengthMenu: "Mostrando  _MENU_ registros",
            searchPlaceholder: "Buscar registros",
            info: "Mostrando página _PAGE_ de _PAGES_",
            zeroRecords: "Ningun registro - sorry",
            infoEmpty: "No hay registros disponibles",
            paginate: {
              previous: "Anterior",
              next: "Siguiente",
              first: "Primero",
              last: "Último",
            },
          },
          data: this.usuarios,
          columns: [
            {
              title: "Nombre",
              align: "left",
              valign: "middle",
              clickToSelect: false,
              render: function (data, type, row, meta) {
                let first_name = row.first_name ? row.first_name :
                  "";
                let last_name = row.last_name ? row.last_name :
                  "";
                return first_name+ " "+last_name;
              },
            },
            {
              title: "Username",
              align: "left",
              valign: "middle",
              clickToSelect: false,
              render: function (data, type, row, meta) {
                return row.username;
              },
            },
            {
              title: "Email",
              align: "left",
              valign: "middle",
              clickToSelect: false,
              render: function (data, type, row, meta) {
                return row.email;
              },
            },
            {
              title: "Rol",
              align: "left",
              valign: "middle",
              clickToSelect: false,
              render: function (data, type, row, meta) {
                let rol = row.rol ? row.rol.name :
                  "";
                return row.rol.name;
              },
            },
            {
              title: "Activo",
              align: "left",
              valign: "middle",
              clickToSelect: false,
              render: function (data, type, row, meta) {
                let rol = row.active == 1 ? "Si" :
                  "No";
                return rol;
              },
            },

            
            {
              title: "Acciones",
              align: "left",
              valign: "middle",
              clickToSelect: false,
              render: function (data, type, row, meta) {
                let actions = 
                  `<a  href='#/admin/${
                      self.user_data.username
                    }/usuario/${row.id}' class=''>
                  <i class='material-icons'>visibility</i>
                  </a>`;
                return actions;
              },
            },


          ],
        });
      },
      (error) => {
        console.log(error)
        this.is_loading = false;
        let msg = this.globalService.errorToken(error);
        msg = this.globalService.errorMsg(msg,error);
        this.globalService.msgToastError(msg);
      }
    );
  }
}
