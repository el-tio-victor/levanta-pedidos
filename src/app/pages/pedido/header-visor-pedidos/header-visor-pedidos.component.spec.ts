import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVisorPedidosComponent } from './header-visor-pedidos.component';

describe('HeaderVisorPedidosComponent', () => {
  let component: HeaderVisorPedidosComponent;
  let fixture: ComponentFixture<HeaderVisorPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderVisorPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderVisorPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
