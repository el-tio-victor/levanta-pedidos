import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  @Input() direccion_entrega:any;
  @Input() comentario:any;
  @Input() pedido:any;

  constructor() { }

  ngOnInit(): void {
    console.log( this.pedido  );
  }

  groupByKey(array,key){
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] =
        result[currentValue[key]] || []).push(currentValue);
      return result;
    }, []);
  }

  printQuantity(el, talla){
    let element_found =
        el.find(item => item.Talla == talla);
    return element_found ?
      element_found.Quantity : '-';
  }

}
