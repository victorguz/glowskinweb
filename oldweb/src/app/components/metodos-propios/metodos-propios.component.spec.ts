import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodosPropiosComponent } from './metodos-propios.component';

describe('MetodosPropiosComponent', () => {
  let component: MetodosPropiosComponent;
  let fixture: ComponentFixture<MetodosPropiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetodosPropiosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetodosPropiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
