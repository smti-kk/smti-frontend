import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommunicationContractsComponent} from './communication-contracts.component';

describe('CommunicationContractsComponent', () => {
  let component: CommunicationContractsComponent;
  let fixture: ComponentFixture<CommunicationContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommunicationContractsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
