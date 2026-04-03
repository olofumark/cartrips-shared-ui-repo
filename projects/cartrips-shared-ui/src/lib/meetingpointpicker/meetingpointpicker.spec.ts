import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Meetingpointpicker } from './meetingpointpicker';

describe('Meetingpointpicker', () => {
  let component: Meetingpointpicker;
  let fixture: ComponentFixture<Meetingpointpicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Meetingpointpicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Meetingpointpicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
