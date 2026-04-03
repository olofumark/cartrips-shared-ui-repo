import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supportmessagecompose } from './supportmessagecompose';

describe('Supportmessagecompose', () => {
  let component: Supportmessagecompose;
  let fixture: ComponentFixture<Supportmessagecompose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supportmessagecompose]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Supportmessagecompose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
