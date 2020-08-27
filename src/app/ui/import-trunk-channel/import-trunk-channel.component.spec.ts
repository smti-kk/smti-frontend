import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTrunkChannelComponent } from './import-trunk-channel.component';

describe('ImportLocationsComponent', () => {
  let component: ImportTrunkChannelComponent;
  let fixture: ComponentFixture<ImportTrunkChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTrunkChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTrunkChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
