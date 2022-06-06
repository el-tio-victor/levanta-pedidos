import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVisorPedidosComponent } from './item-visor-pedidos.component';

describe('ItemVisorPedidosComponent', () => {
  let component: ItemVisorPedidosComponent;
  let fixture: ComponentFixture<ItemVisorPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemVisorPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemVisorPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
