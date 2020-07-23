import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsPage } from './contracts-page';

describe('ContractsPageComponent', () => {
  let component: ContractsPage;
  let fixture: ComponentFixture<ContractsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
