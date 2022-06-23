import {
  Component,
  ElementRef, EventEmitter, Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-filters-table',
  templateUrl: './filters-table.component.html',
  styleUrls: ['./filters-table.component.css']
})
export class FiltersTableComponent implements OnInit {

  @Input() web_service = "";

  @Input() filters_config = {
    folio: {
      param_name:'Folio',
      placeholder:'#Factura'
    },
    fecha_inicio: {
      param_name: 'startDate'
    },
    fecha_fin: {
      param_name: 'endDate'
    },
    lugar_envio:{
      param_name: 'ShipToCode'
    }
  };

  filterStatus:string = "";
  filter_status_id:string = "";

  @Output() filter_emitter = new EventEmitter<MouseEvent>();

  @ViewChild('search_num_doc',{static:false}) 
    search_num_doc:ElementRef;
  @Output() search_num_doc_emitter = new
   EventEmitter<string>();

  @ViewChild('date_1',{static:false}) 
    date_1:ElementRef;
  @Output() date_1_emitter = new
   EventEmitter<string>();

  @ViewChild('date_2',{static:false}) 
    date_2:ElementRef;
  @Output() date_2_emitter = new
   EventEmitter<string>();

  @ViewChild('btn_filter_status',{static : false}) 
    btn_filter_status:ElementRef;
  @Output() btn_filterstatus_emitter = new
   EventEmitter<string>();

  @ViewChild('search_lugar_envio',{static : false}) 
    search_lugar_envio:ElementRef;
  @Output() search_lugar_envio_emitter = new
   EventEmitter<string>();

  @Output() params_to_filter_emitter = new
   EventEmitter<string>();

  filters:any = {
    'doc_number': ()=>{
      this.clearNumDoc();
    },
    'date': () =>{
      this.clearDate();
    },
    'entrega': () => {
      this.clearEntrega();
    },
    'status': () => {
      this.clearStatus();
    },
  };

  constructor(
  ) { 
  }

  ngOnInit(): void {
  }


  getParamsToFilter(){
    let params = ""; 


    let date_start = this.date_1.nativeElement.value;
      let param_date_start = date_start =="" ?
        "" :
        `&startDate=${date_start}`;

    let ship_to_code = this.search_lugar_envio ?
    this.search_lugar_envio.nativeElement.value : "";
    let param_ship_to_code = ship_to_code == "" ?
      "" :
      `&ShipToCode=${ship_to_code}`;

    let date_end = this.date_2.nativeElement.value;
    let param_date_end = 
      date_end == "" || param_date_start == "" ?
      "" :
      `&endDate=${date_end}`;

    let param_filter_status = 
      this.filter_status_id == "" ?
      "" :
      `&DocStatus=${this.filter_status_id}`;

    let doc_num = this.search_num_doc
    .nativeElement.value;
    let param_doc_num = 
      doc_num == "" ?
      "" :
      `&${this.filters_config.folio.param_name}=${doc_num}`
    
    params = `${param_ship_to_code}${
      param_date_start
    }${
      param_date_end
    }${
      param_doc_num
    }${
      param_filter_status
    }`;

    return params;
  }

  focusInput(el: any , el_target = null) {
    el.classList.add("border-m");
  }

  blurInput(el: any) {
    if( el.querySelector('input').value == "")
      el.classList.remove("border-m");
  }
  focusInputDate( el:any ){
      el.classList.add("border-m");
  }
  blurInputDate( el:any ){
    if(el.value == "")
      el.classList.remove("border-m");
  }

  clearFilters(current_filter:string){
    for(let key in this.filters){
      if(key  != current_filter)
        this.filters[key]();
    }
    if(current_filter == "all"){
      this.handleParams();
      this.handleFilter(null);
    }
  }

  clearNumDoc(){
    this.search_num_doc.nativeElement
      .parentNode.classList.remove('border-m') ;

    this.search_num_doc.nativeElement.value= "";
  }
  clearDate(){
    this.date_1.nativeElement.parentNode
    .classList.remove('border-m');
    this.date_1.nativeElement.value= "";
    this.date_2.nativeElement.value= "";
  }
  clearEntrega(){
    this.search_lugar_envio.nativeElement
    .parentNode.classList.remove('border-m');
    this.search_lugar_envio.nativeElement.value="";
  }

  clearStatus(){
    this.btn_filter_status.nativeElement.classList
    .remove('active-filter-status');
    this.filterStatus = "";
    this.filter_status_id = "";
    this.handleParams(); 
  }

  handleFilter(event: MouseEvent){
    this.filter_emitter.emit(event);
  }

  handleParams(){
    let params = this.getParamsToFilter();
    this.params_to_filter_emitter.emit(params);

  }

  handleNumDoc(value:string){
    this.search_num_doc_emitter.emit(value);
  }
  handleDate1(value:string){
    this.date_1_emitter.emit(value);
  }
  handleDate2(value:string){
    this.date_2_emitter.emit(value);
  }
  handleStatus(value:string){
    this.btn_filterstatus_emitter.emit(value);
  }
  handleShiptToCode(value:string){
    this.search_lugar_envio_emitter.emit(value);
  }


  setFilterStatus(filtro:string,filtro_text:string, el:any):void{
    //let params = this.getParamsToFilter();
    this.filter_status_id = filtro;
    this.filterStatus = filtro_text;
    el.classList.add("active-filter-status");
   this.handleParams(); 
  }


}
