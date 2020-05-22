import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionPointsPlayComponent } from './connection-points-play.component';

describe('ConnectionPointsPlayComponent', () => {
  let component: ConnectionPointsPlayComponent;
  let fixture: ComponentFixture<ConnectionPointsPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionPointsPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionPointsPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
