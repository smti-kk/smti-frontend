import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InternetClarificationComponent} from './internet-clarification.component';

describe('InternetClarificationComponent', () => {
  let component: InternetClarificationComponent;
  let fixture: ComponentFixture<InternetClarificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InternetClarificationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternetClarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
