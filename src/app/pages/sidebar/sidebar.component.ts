import {HttpClient} from '@angular/common/http';
import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import PerfectScrollbar from 'perfect-scrollbar';
import {GlobalService} from '../../global.service';
import {MenuService} from '../../services/menu.service';
//import {tap,filter} from "rxjs";
declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab:'P'},
            {path: 'timeline', title: 'Timeline Page', ab:'TP'},
            {path: 'login', title: 'Login Page', ab:'LP'},
            {path: 'register', title: 'Register Page', ab:'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab:'LSP'},
            {path: 'user', title: 'User Page', ab:'UP'}
        ]
    }
];

@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

        currentRoute;
    public menuItems: any[];
    duser;
    s_foto_avatar;
    private s_nombre_completo;
    private pinta;
    All:any[] ;

    all_modules = [
        {
            id_seccion: 3,
            imagen: "shopping_cart",
            nombre_seccion: "Pedidos",
            modulos: [
              {
                s_modulo:"Nuevo",
                s_url: "pedido",
                action: "CREAR"
              },
              {
                s_modulo:"Historial",
                s_url: "pedidos",
                action: "LEER"
              },
            ],
            url: "pedidos",
        },
        {
            id_seccion: 4,
            imagen: "receipt",
            nombre_seccion: "Facturas",
            modulos: [
              {
                s_modulo:"Historial",
                s_url: "facturas",
                action: "LEER"
              },
            ],
            url: "Facturas",
        },
        {
            id_seccion: 5,
            imagen: "warehouse",
            nombre_seccion: "Backorder",
            modulos: [
              {
                s_modulo:"Historial",
                s_url: "backorder",
                action: "LEER"
              },
            ],
            url: "backorder",
        }
    ];

    id = 1;
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    constructor(private http: HttpClient,
        private toastr: ToastrService,
        private router: Router, 
        private curService: GlobalService,
        private _ngZone: NgZone,
        private Service: MenuService) {
        this.duser = this.curService.getData();

        this.s_nombre_completo = this.duser.username;
        this.s_foto_avatar = 'assets/img/default-avatar.png';    
          

          let res:any = []
          this.duser.modules.forEach(
            (element,index)=>{

              /* En el array res almaceno los modulos que el usuario
              * loggeado tien habliltados */
              res.push(this.all_modules.filter(
                (item) =>{
                  return item.nombre_seccion.toUpperCase().includes(
                    element.name.toUpperCase()
                  )
                }
              )[0]);

             //en la posición actual del array res creo una nuva llave
              //con las acciones permitidas del modo actual
              //esto para validar las acciones dentro de cada módulo
             res[index].modules = res[index].modulos.reduce(
                (result,curr)=>{
                  //agregue dentro del if el true como hack ya que la validación
                  //para crear un pedido la hago en el input de cantidad y
                  //aprovechando que crear pedido es la unica ruta de crear
                  console.log(curr.action);
                  if(element.actions.includes(
                    curr.action
                  ) || element.actions.includes('LEER')){
                    result.push(curr)
                  }

                  return result;
                },
                []
              );
            }
          );
          
          this.All = res;
        }
    aberHijo(id,elem){
        //cuando no tiene modulos la seccion
        let seccion_clickeada = this.All.filter((el) =>  el.id_seccion == id)[0];
        if(!seccion_clickeada.modulos){

            //enlace activo en menu
            let els = document.querySelectorAll('.nav-section.nav-link')
            for(let i=0; i<els.length; i++){
              console.log(els[i].id);
              if(`nav-section-${id}` == els[i].id){
                els[i].classList.add('active');
              }
              else{
                els[i].classList.remove('active')
              }
            }
            /*fin enlace activo menu*/
            
            this.router.navigate(
                [`/admin/${this.duser.username.toLowerCase()}/${seccion_clickeada.url}`]
            );
        }
        else{
            console.log(seccion_clickeada);
            var el = $('#men'+id);
            var t_span = $('*.btn-limi').find('span');
            var t_mm = $('*.submenu');
            var btn = $('#btn'+id);
            $(el).fadeToggle("fast",then=>{
              var sp = $(btn).find('span');
              $(sp).toggleClass("activeSp");
            });
        }
            
            
    }

    validateOcacional( mod ){
      if(this.duser.username.toUpperCase() == 'FEQE6410293U2_1'
        && mod == 'Historial')
        return false; 
      else
        return true;
    }
    
    getVar(variable){
        return this.curService.getData(variable);
    }

    ngAfterViewInit(){
     let actual_section =
         this.router.url.split('/')[3];
        console.log(actual_section);
          let els = document.querySelectorAll('.nav-section.nav-link')
          console.log(els);
            //enlace activo en menu
            for(let i=0; i<els.length; i++){
              console.log(els[i].getAttribute('data-section_link'));
              if( els[i].getAttribute('data-section_link') == actual_section){
                els[i].classList.add('active');
              }
              else{
                els[i].classList.remove('active')
              }
            }
    }

    ngOnInit() {
    
        let section = 
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
