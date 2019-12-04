import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalCapabilitiesComparisionTableComponent } from './technical-capabilities-comparision-table.component';

describe('TechnicalCapabilitiesComparisionTableComponent', () => {
  let component: TechnicalCapabilitiesComparisionTableComponent;
  let fixture: ComponentFixture<TechnicalCapabilitiesComparisionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalCapabilitiesComparisionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalCapabilitiesComparisionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
