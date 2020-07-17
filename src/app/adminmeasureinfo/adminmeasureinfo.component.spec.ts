import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmeasureinfoComponent } from './adminmeasureinfo.component';

describe('AdminmeasureinfoComponent', () => {
  let component: AdminmeasureinfoComponent;
  let fixture: ComponentFixture<AdminmeasureinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmeasureinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmeasureinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
