import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppealComponent } from './create-appeal.component';

describe('CreateAppealComponent', () => {
  let component: CreateAppealComponent;
  let fixture: ComponentFixture<CreateAppealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAppealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
