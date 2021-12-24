import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunRequestsArchiveComponent } from './mun-requests-archive.component';

describe('MunRequestsArchiveComponent', () => {
  let component: MunRequestsArchiveComponent;
  let fixture: ComponentFixture<MunRequestsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunRequestsArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunRequestsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
