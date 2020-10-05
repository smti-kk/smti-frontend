import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOperatorsComponent } from './create-operators.component';

describe('CreateOperatorsComponent', () => {
  let component: CreateOperatorsComponent;
  let fixture: ComponentFixture<CreateOperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOperatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
