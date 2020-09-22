import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqDeclineFormComponent } from './req-decline-form.component';

describe('ReqDeclineFormComponent', () => {
  let component: ReqDeclineFormComponent;
  let fixture: ComponentFixture<ReqDeclineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqDeclineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqDeclineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
