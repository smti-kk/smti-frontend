import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStationInfoBarComponent } from './base-station-info-bar.component';

describe('BaseStationInfoBarComponent', () => {
  let component: BaseStationInfoBarComponent;
  let fixture: ComponentFixture<BaseStationInfoBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseStationInfoBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseStationInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
