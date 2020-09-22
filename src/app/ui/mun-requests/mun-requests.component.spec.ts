import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunRequestsComponent } from './mun-requests.component';

describe('MunRequestsComponent', () => {
  let component: MunRequestsComponent;
  let fixture: ComponentFixture<MunRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
