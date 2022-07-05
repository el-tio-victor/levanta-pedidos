import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewsComponent } from './menu-views.component';

describe('MenuViewsComponent', () => {
  let component: MenuViewsComponent;
  let fixture: ComponentFixture<MenuViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
