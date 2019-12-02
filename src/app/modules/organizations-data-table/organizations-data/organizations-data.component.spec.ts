import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsDataComponent } from './organizations-data.component';

describe('OrganizationsDataComponent', () => {
  let component: OrganizationsDataComponent;
  let fixture: ComponentFixture<OrganizationsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
