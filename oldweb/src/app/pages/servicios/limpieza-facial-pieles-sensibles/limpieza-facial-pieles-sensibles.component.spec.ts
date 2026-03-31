import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimpiezaFacialPielesSensiblesComponent } from './limpieza-facial-pieles-sensibles.component';

describe('LimpiezaFacialPielesSensiblesComponent', () => {
  let component: LimpiezaFacialPielesSensiblesComponent;
  let fixture: ComponentFixture<LimpiezaFacialPielesSensiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimpiezaFacialPielesSensiblesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LimpiezaFacialPielesSensiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
