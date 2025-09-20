import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaFacialComponent } from './limpieza-facial.component';

describe('LimpiezaFacialComponent', () => {
  let component: LimpiezaFacialComponent;
  let fixture: ComponentFixture<LimpiezaFacialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimpiezaFacialComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LimpiezaFacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
