import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunRequestComponent } from './mun-request.component';

describe('MunRequestComponent', () => {
  let component: MunRequestComponent;
  let fixture: ComponentFixture<MunRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
