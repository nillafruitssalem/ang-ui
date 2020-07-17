import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminuserinfoComponent } from './adminuserinfo.component';

describe('AdminuserinfoComponent', () => {
  let component: AdminuserinfoComponent;
  let fixture: ComponentFixture<AdminuserinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminuserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminuserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
