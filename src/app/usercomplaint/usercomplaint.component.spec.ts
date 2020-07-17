import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercomplaintComponent } from './usercomplaint.component';

describe('UsercomplaintComponent', () => {
  let component: UsercomplaintComponent;
  let fixture: ComponentFixture<UsercomplaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercomplaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
