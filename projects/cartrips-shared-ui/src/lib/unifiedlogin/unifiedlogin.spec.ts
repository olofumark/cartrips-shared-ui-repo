import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unifiedlogin } from './unifiedlogin';

describe('Unifiedlogin', () => {
  let component: Unifiedlogin;
  let fixture: ComponentFixture<Unifiedlogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unifiedlogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unifiedlogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
