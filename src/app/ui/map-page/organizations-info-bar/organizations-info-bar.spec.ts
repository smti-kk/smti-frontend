import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsInfoBar } from './organizations-info-bar';

describe('OrganizationsInfoBarComponent', () => {
  let component: OrganizationsInfoBar;
  let fixture: ComponentFixture<OrganizationsInfoBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsInfoBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsInfoBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
