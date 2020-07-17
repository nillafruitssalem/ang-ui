import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogorderconfromComponent } from './dialogorderconfrom.component';

describe('DialogorderconfromComponent', () => {
  let component: DialogorderconfromComponent;
  let fixture: ComponentFixture<DialogorderconfromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogorderconfromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogorderconfromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
