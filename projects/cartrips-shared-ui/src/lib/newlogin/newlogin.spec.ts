import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newlogin } from './newlogin';

describe('Newlogin', () => {
  let component: Newlogin;
  let fixture: ComponentFixture<Newlogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newlogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newlogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
