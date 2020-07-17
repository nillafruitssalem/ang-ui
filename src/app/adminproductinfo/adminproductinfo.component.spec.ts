import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproductinfoComponent } from './adminproductinfo.component';

describe('AdminproductinfoComponent', () => {
  let component: AdminproductinfoComponent;
  let fixture: ComponentFixture<AdminproductinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminproductinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminproductinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
