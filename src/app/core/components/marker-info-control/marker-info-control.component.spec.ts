import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerInfoControlComponent } from './marker-info-control.component';

describe('MarkerInfoControlComponent', () => {
  let component: MarkerInfoControlComponent;
  let fixture: ComponentFixture<MarkerInfoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerInfoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerInfoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
