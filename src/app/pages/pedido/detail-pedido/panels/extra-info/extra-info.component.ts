import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.css']
})
export class ExtraInfoComponent implements OnInit {

  @Input() direcciones:any;
  @Input() direcciones_select:any;

  @Output() direcc_select_emitter = new EventEmitter<any>() ;

  comentario:string  = "";
  @Output() comentario_emitter = new EventEmitter<string>();

  orden_compra:string  = "";
  @Output() orden_compra_emitter = new EventEmitter<string>();

  constructor() { }

  selectDireccion(element:any, element_HTML){
    
    /**Agrego y quito clase activo a elemento clickeado y se lo
    * quito al otro en caso de haberlo*/
    this.direcciones_select = element.AddressName;
    let el:any;
    if( el = element_HTML.parentElement.querySelector('.active')){
      el.classList.remove('active'); 
    }
    element_HTML.classList.add('active');

    /* Emitter*/
    this.direcc_select_emitter.emit(element);
  }

  changeComentario(value){
    this.comentario_emitter.emit(this.comentario);
  }

  changeOrdenCompra(value){
    this.orden_compra_emitter.emit(
      this.orden_compra
    );
  }

  expand(el, el_click){
    el.classList.toggle('active')
  }

  ngOnInit(): void {
  }

}
