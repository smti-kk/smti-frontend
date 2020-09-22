import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsPage } from './organizations-page';

describe('OrganizationsPageComponent', () => {
  let component: OrganizationsPage;
  let fixture: ComponentFixture<OrganizationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
