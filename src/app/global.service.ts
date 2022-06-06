import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Susutile} from './Susutile';

declare var jQuery:any;
declare var $:any;

@Injectable()
export class GlobalService {
    public cur = "off";
    private token;
    private data;

    public interval;
    public escount:number;

    //http://hostaria.sytes.net:8086/api_cubic/
    public static FOTO='http://hostaria.sytes.net:1310/api_infracciones/';
  
    
    //public static HOST='http://hostaria.sytes.net:1314/api_sca/api/';
    //public static HOST = "https://172.16.0.106:30001/b1s/v2/" ;
    public static HOST = "http://sap.playerytees.com:8089/b1s/v2/" ;

    
    public static API_UBICACION = "https://api.ipbase.com/v1/json/";

  //    public static HOST='http://fixesApi.local/api/';
    /*VARIABLES GLOBALES PARA PUSH */
    public static LICENCIA=
		'Wq5NJPumPAHQwTz33Aqti57974btDGr2CQycsDOU5YR8xwJGE48ZSpn0o1j6klvge9iH6aL29f8oy1VKe1FrFShId63BLKM2XM47';
    public static app_id='47871105-d968-4a59-ba72-a6164e156d4f';
    public static Authorization='Basic OWJmMTExOWYtMTNiMC00ZDE0LTk2NDItZjIxNGNlNWUyNDc0';

    
    optionsts:any = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-left",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "500",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
    

    constructor(private router: Router,private toastr: ToastrService) { 

    }


    

    setToken(token = ''){
  	  var tok = "Ht97bi62sr1mz5G51DB2Hp8lAQMFxhr8T3S4NLEDcV9LJFky9eAeIW5JKoQO3qndg61wMtwZGRPX20jy43qauv4f7oY8C6iPU7SK";
      var token = "";
      var i = 0;
      for(i=0; i<100; i++){
      	token +=tok.charAt(Math.floor(Math.random()*tok.length))
      }
      localStorage.setItem('token_', JSON.stringify(token));
    }
    
    getToken() {
        this.token = localStorage.getItem("token_");
        return this.token;
    }


    setData(nombre,data){
    	localStorage.setItem(nombre, data);
    }
    getData(data:string = 'nesdata') {
    	this.data = localStorage.getItem(data);
      if( data == 'nesdata' )
        return JSON.parse(this.data);
      else
        return this.data;
    }

    getSession(){
      this.cargaCss();
      if(!localStorage.getItem('nesdata')) {
        this.router.navigateByUrl('/');
      }
    }

    getSessionUP(){
      this.cargaCss();
      if(localStorage.getItem('nesdata')) {
      	let nesdata = this.getData();
        this.router.navigateByUrl('usuario/'+nesdata.s_nombre.toLowerCase());
      }
    }

    
    getChekRute(url,dir){
      this.getSession();
    	if (this.router.url !== url){
    		localStorage.removeItem('nesdata');
        this.router.navigateByUrl(dir);

    	}
    }


    irUrl(dir){
      var user = this.getData();
      this.router.navigateByUrl('admin/'+user.nombre.toLowerCase()+'/'+dir);
    }


  
    Loader(num) {
      if(num == 0){
        this.escount = 0;
        this.interval = setInterval(then=>{
          this.escount++;
          if(this.escount >= 2){
           // $("#preload").removeClass("fade_in");
            clearInterval(this.interval);
          }
        },500);   
      }
      if(num == 1){
        this.escount = 0;
        clearInterval(this.interval);
        $("#preload").addClass("fade_in");
      }
    }
    
    
    getMsgs(response){

      if (response.status == 'empty') {
        this.toastr.warning(response.message, 'Aviso', this.optionsts);
        this.Loader(1);
      }
      if (response.status == 'logout') {
        this.toastr.success(response.message,'Aviso',this.optionsts);
        this.Loader(1);
        this.router.navigateByUrl('/');
      }
      
      if (response.status == 'fail') {
        this.toastr.error(response.message, 'Error', this.optionsts);
        this.Loader(1);
      }

      if (response.status == 'warning') {
        this.toastr.error(response.message, 'Error', this.optionsts);
        this.Loader(1);
      }

      if(response.status == 'success'){
        this.toastr.success(response.message, 'Exito', this.optionsts);
        this.Loader(1);

      }


    }


    getlOgout(){
      localStorage.removeItem('nesdata');
      this.router.navigateByUrl('/');
    }


    dameRandom(num){
  	  var tok = "Ht97bi62sr1mz5G51DB2Hp8lAQMFxhr8T3S4NLEDcV9LJFky9eAeIW5JKoQO3qndg61wMtwZGRPX20jy43qauv4f7oY8C6iPU7SK";
      var token = "";
      var i = 0;
      for(i=0; i<num; i++){
      	token +=tok.charAt(Math.floor(Math.random()*tok.length));
      }
      return token;
    }
    dameColor(){
      var sus = new Susutile;
      return sus.tcolor;
    }

    cargaCss(){
      var sus = new Susutile;
      var css = sus.cssDefault;
      var style = sus.genCss(css);
      $('body').append(style);

    }
 
}
