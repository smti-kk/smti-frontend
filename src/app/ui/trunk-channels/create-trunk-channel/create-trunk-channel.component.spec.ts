import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrunkChannelComponent } from './create-trunk-channel.component';

describe('CreateTrunkChannelComponent', () => {
  let component: CreateTrunkChannelComponent;
  let fixture: ComponentFixture<CreateTrunkChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTrunkChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTrunkChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
