import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityBookPageComponent } from './locality-book.component';

describe('LocationsBookComponent', () => {
  let component: LocalityBookPageComponent;
  let fixture: ComponentFixture<LocalityBookPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalityBookPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalityBookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
