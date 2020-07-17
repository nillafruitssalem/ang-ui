import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintodayordersComponent } from './admintodayorders.component';

describe('AdmintodayordersComponent', () => {
  let component: AdmintodayordersComponent;
  let fixture: ComponentFixture<AdmintodayordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintodayordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintodayordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
