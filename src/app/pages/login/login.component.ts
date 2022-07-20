import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Elastic, TweenLite} from 'gsap/all';
import {ToastrService} from 'ngx-toastr';
import {GlobalService} from '../../global.service';
import {CatalogosService} from "../../services/catalogos.service";
import {LoginService} from '../../services/login.service';

declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
    @Output() loginEvent = new EventEmitter<any>();
    //test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    weather:string;
    is_loading= false;

    empresas:any[] =[{
      /*name:"PRUEBAS",
      value:"U_GP_TEST"*/
     name:"GP",
     value:"GP_BD"
    }];

    //empresa_selected_default="U_GP_TEST";
    empresa_selected_default="GP_BD";

    pinta : any;
    obj = {company:"", username: "", password: "" }
    options:any = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
        }
    constructor(
        private element: ElementRef,private router: Router,
        private toastr: ToastrService,
        private curService: GlobalService,
        private catalogosService: CatalogosService,
        private loginService: LoginService,
        private http: HttpClient
        ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        localStorage.removeItem('nesdata');
        localStorage.removeItem('company');
        localStorage.removeItem('weather');
        localStorage.removeItem('Comment');
        localStorage.removeItem('orden_compra');

        this.obj.company = this.empresa_selected_default;
        this.getWeather();
    }

    ngOnInit() {
        
        this.pinta = this.curService.dameColor();
        this.pintaLogin();

      this.empresa_selected_default= "U_GP_TEST";
        
    }

    getVar(variable){
      return this.curService.getData(variable);
    }
    resolveImg(){
      let pic ="";
      if(!this.weather){
        pic = "default"
      }
      else{
        if(this.weather.includes('cloud'))
          pic = 'clouds'
        else if(this.weather.includes('rain'))
          pic = 'rain';
        else if(this.weather.includes('thunderstrom'))
          pic = 'thunderstrom';
        else if(this.weather.includes('snow'))
          pic = 'snow';
        else if(this.weather.includes('clear'))
          pic = 'clear';
        else
          pic = 'default';
      }
      return `background:url('assets/img/${pic}.jpg')`;
    }
  
    getWeather(){
     let lat;
     let lng ;
      this.getPosition().then(
        pos => {
          lat = pos.lat;
          lng = pos.lng;
          console.log(
            `lat: ${pos.lat}
            long: ${pos.lng}`)
          this.catalogosService.Externo(
`https://www.7timer.info/bin/civillight.php?lon=${lng}&lat=${lat}&product=civil&ac=0&unit=metric&output=json`
          )
          .subscribe(
            (response:any) =>{
              console.log(response);
              this.curService.setData(
                'weather',response.dataseries[0].weather
              );
              this.curService.setData(
                'temp_min',response.dataseries[0].temp2m.min
              );
              this.curService.setData(
                'temp_max',response.dataseries[0].temp2m.max
              );
              this.weather = response.dataseries[0]
                .weather;
            },
            error => console.log(error)
          )
        }

      );
    }
    getPosition():Promise<any>{
      return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(resp =>{
          resolve(
            {lng: resp.coords.longitude,
              lat: resp.coords.latitude
            },
          );
        },
        err => {reject(err);console.log(err)}
        );
      } );
    }
    async pintaLogin(){

      var navbar : HTMLElement = this.element.nativeElement;
      console.log(1);
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        this.cargarCard(card);
        
    }
    async cargarCard(card){
      setTimeout(function() {
        // after 1000 ms we add the class animated to the login/register card
        card.classList.remove('card-hidden');
    }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    setDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar');
    }
    ngOnDestroy(){
      /* const body = document.getElementsByTagName('body')[0];
      body.classList.remove('login-page');
      body.classList.remove('off-canvas-sidebar'); */
    }

    logIn(event: Event) {
        event.preventDefault();
    
        
    
        function anim(el) {
          TweenLite.from(el, 1.5, {y:"6", ease:Elastic.easeOut});
          TweenLite.from(el, 1.5, {y:"0", ease:Elastic.easeOut, delay:0.25});
          TweenLite.from(el, 1.5, {y:"5", ease:Elastic.easeOut, delay:0.5});
        }
    
        // console.log("OBJETOS");
        // console.log(this.obj.username);
        if(this.obj.username.trim() == ''){
          let el = document.getElementById("usuario");
          anim(el);
          this.toastr.error('Complete el campo email o usuario por favor.', 'Error', this.options);
    
          return false;
        }
    
        else if(this.obj.password.trim() == ''){
          let el = document.getElementById("password");
          anim(el);
          this.toastr.error('Es requerido un password para continuar.', 'Error', this.options);
          return false;
        }
        else if(this.obj.company.trim() == ''){
          let el = document.getElementById("id");
          anim(el);
          this.toastr.error('Es requerida la empresa para continuar.', 'Error', this.options);
          return false;
        }
        else {
        this.is_loading = true;
        this.loginService.login(
          this.obj.username, this.obj.password,this.obj.company)
          .subscribe((response: any)=>
        { 

          this.curService.getMsgs(response);
          this.is_loading = false;
          console.log(response);
          if( response.status == 200 ){
            this.curService.setData('nesdata',JSON.stringify(response.data));
            this.curService.setData('company',this.obj.company);
            this.router.navigateByUrl(
              '/admin/'+response.data.username.toLowerCase()+'/pedido');
              
          }
          else{
            this.toastr.error('Ocurrio un error.', 'Error', this.options);
          }
    
        },error => {
          console.log(error.error)
          this.is_loading = false;
         let msg = error.error.msg ? error.error.msg : "Internal error server."
          this.toastr.error(msg, 'Error', this.options);
        }) 
    }
        //this.loginEvent.next(this.obj);
      }
    
}
