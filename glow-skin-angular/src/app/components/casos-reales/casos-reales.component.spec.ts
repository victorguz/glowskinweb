import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosRealesComponent } from './casos-reales.component';

describe('CasosRealesComponent', () => {
  let component: CasosRealesComponent;
  let fixture: ComponentFixture<CasosRealesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasosRealesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasosRealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
