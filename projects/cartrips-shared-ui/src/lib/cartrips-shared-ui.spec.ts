import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartripsSharedUi } from './cartrips-shared-ui';

describe('CartripsSharedUi', () => {
  let component: CartripsSharedUi;
  let fixture: ComponentFixture<CartripsSharedUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartripsSharedUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartripsSharedUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
