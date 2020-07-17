import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmailadminoffermailComponent } from './sendmailadminoffermail.component';

describe('SendmailadminoffermailComponent', () => {
  let component: SendmailadminoffermailComponent;
  let fixture: ComponentFixture<SendmailadminoffermailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendmailadminoffermailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmailadminoffermailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
