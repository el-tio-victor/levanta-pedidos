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
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab:'B'},
            {path: 'grid', title: 'Grid System', ab:'GS'},
            {path: 'panels', title: 'Panels', ab:'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab:'SA'},
            {path: 'notifications', title: 'Notifications', ab:'N'},
            {path: 'icons', title: 'Icons', ab:'I'},
            {path: 'typography', title: 'Typography', ab:'T'}
        ]
    },{
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            {path: 'regular', title: 'Regular Forms', ab:'RF'},
            {path: 'extended', title: 'Extended Forms', ab:'EF'},
            {path: 'validation', title: 'Validation Forms', ab:'VF'},
            {path: 'wizard', title: 'Wizard', ab:'W'}
        ]
    },{
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Regular Tables', ab:'RT'},
            {path: 'extended', title: 'Extended Tables', ab:'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab:'DT'}
        ]
    },{
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: 'google', title: 'Google Maps', ab:'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab:'FSM'},
            {path: 'vector', title: 'Vector Map', ab:'VM'}
        ]
    },{
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    },{
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    },{
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    },{
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
    },{
        path: '/bitacora1',
        title: 'Bitacora 1',
        type: 'link',
        icontype: 'date_range'
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
    All:any[] = [
        /*{
            id_seccion: 1,
            imagen: "assignment_ind",
            nombre_seccion: "Socio de negocios",
            modulos: null,
            url: "socios-negocios",
        },{
            id_seccion: 2,
            imagen: "developer_board",
            nombre_seccion: "Articulos",
            modulos: null,
            url: "articulos",
        },*/
        {
            id_seccion: 3,
            imagen: "shopping_cart",
            nombre_seccion: "Pedidos",
            modulos: [
              {
                s_modulo:"Nuevo",
                s_url: "pedido"
              },
              {
                s_modulo:"Historial",
                s_url: "pedidos"
              },
            ],
            url: "pedidos",
        },
        /*{
            id_seccion: 4,
            imagen: "local_shipping",
            nombre_seccion: "Entrega",
            modulos: null,
            url: "entrega",
        },
        {
            id_seccion: 5,
            imagen: "attach_money",
            nombre_seccion: "Pagos",
            modulos: null,
            url: "pagos",
        }*/
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
        // console.log("entro aqui");  
        // console.log(this.duser); 
        /*this.Service.All(this.duser.s_token).subscribe((response: any)=>{ 
    	if (response.status == 'fail') {
    		return false;
    	}else if(response.status == 'success'){
        this.All = response.data.menu;
        // console.log(this.All);
        // console.log(response.data);
        
    	}
    })*/
        
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
