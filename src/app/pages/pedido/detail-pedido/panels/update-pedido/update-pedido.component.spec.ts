import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePedidoComponent } from './update-pedido.component';

describe('UpdatePedidoComponent', () => {
  let component: UpdatePedidoComponent;
  let fixture: ComponentFixture<UpdatePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
