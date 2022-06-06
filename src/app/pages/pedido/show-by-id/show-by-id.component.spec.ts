import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowByIdComponent } from './show-by-id.component';

describe('ShowByIdComponent', () => {
  let component: ShowByIdComponent;
  let fixture: ComponentFixture<ShowByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
