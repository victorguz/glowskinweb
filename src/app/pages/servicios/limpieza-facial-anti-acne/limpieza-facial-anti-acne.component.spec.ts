import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaFacialAntiAcneComponent } from './limpieza-facial-anti-acne.component';

describe('LimpiezaFacialAntiAcneComponent', () => {
  let component: LimpiezaFacialAntiAcneComponent;
  let fixture: ComponentFixture<LimpiezaFacialAntiAcneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimpiezaFacialAntiAcneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LimpiezaFacialAntiAcneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
