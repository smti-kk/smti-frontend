import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesPage } from './features-page';

describe('FeaturesPageComponent', () => {
  let component: FeaturesPage;
  let fixture: ComponentFixture<FeaturesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
