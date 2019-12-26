import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MarkerInfoBarComponent} from './marker-info-bar.component';

describe('MarkerInfoControlComponent', () => {
  let component: MarkerInfoBarComponent;
  let fixture: ComponentFixture<MarkerInfoBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkerInfoBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
