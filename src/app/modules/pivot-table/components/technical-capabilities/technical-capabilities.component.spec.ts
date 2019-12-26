import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TechnicalCapabilitiesComponent} from './technical-capabilities.component';

describe('TechnicalCapabilitiesComponent', () => {
  let component: TechnicalCapabilitiesComponent;
  let fixture: ComponentFixture<TechnicalCapabilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalCapabilitiesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalCapabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
