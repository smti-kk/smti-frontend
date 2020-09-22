import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Authorization } from './authorization';

describe('AuthorizationComponent', () => {
  let component: Authorization;
  let fixture: ComponentFixture<Authorization>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Authorization ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Authorization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
