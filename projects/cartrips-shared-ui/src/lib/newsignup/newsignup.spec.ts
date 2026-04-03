import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newsignup } from './newsignup';

describe('Newsignup', () => {
  let component: Newsignup;
  let fixture: ComponentFixture<Newsignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newsignup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newsignup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
