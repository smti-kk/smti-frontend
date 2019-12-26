import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConnectionPointsComponent} from './connection-points.component';

describe('ConnectionPointsComponent', () => {
  let component: ConnectionPointsComponent;
  let fixture: ComponentFixture<ConnectionPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionPointsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
