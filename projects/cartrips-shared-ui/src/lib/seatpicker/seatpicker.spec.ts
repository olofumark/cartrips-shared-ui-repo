import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seatpicker } from './seatpicker';

describe('Seatpicker', () => {
  let component: Seatpicker;
  let fixture: ComponentFixture<Seatpicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seatpicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seatpicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
