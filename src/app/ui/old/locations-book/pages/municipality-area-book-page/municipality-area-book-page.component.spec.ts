import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityAreaBookPageComponent } from './municipality-area-book-page.component';

describe('MunicipalityAreaBookPageComponent', () => {
  let component: MunicipalityAreaBookPageComponent;
  let fixture: ComponentFixture<MunicipalityAreaBookPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipalityAreaBookPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalityAreaBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
