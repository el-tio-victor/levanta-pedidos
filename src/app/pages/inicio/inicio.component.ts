import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from '../../global.service';
import { DashboardService } from '../../services/dashboard.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})





export class InicioComponent implements OnInit {
  private duser;
  private auditores: any;
  private audit = [];
  private data: any;

  weather:string;

  @ViewChild('app-dashboard', { static: false }) button: any;
  //@ViewChild('ModalComponent',null) hijo: ModalComponent;
  //@ViewChild(ModalComponent,null) hijo: ModalComponent;


  pinta = this.curService.dameColor();
  optionsts: any = {
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


  constructor(private http: HttpClient,
    private toastr: ToastrService, private curService: GlobalService,
    private DashboardService: DashboardService,
    private router: Router,
    private _ngZone: NgZone) {
    this.weather = this.curService.getData('weather');
    console.log(this.weather);
  }

  ngOnInit() {

    this.duser = this.curService.getData();
    this.pinta = this.curService.dameColor();
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
      return `background-image:url('assets/img/${pic}.jpg')`;
    }

 
  

  ngAfterViewInit() { }


}
