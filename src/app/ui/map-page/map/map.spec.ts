import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BestMap} from './BestMap';

describe('MapComponent', () => {
  let component: BestMap;
  let fixture: ComponentFixture<BestMap>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BestMap]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
