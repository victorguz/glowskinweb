import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ServiceTemplateComponent } from './service-template.component';

describe('ServiceTemplateComponent', () => {
  let component: ServiceTemplateComponent;
  let fixture: ComponentFixture<ServiceTemplateComponent>;

  beforeEach(async () => {
    const mockActivatedRoute = {
      params: of({ id: 'test-service' }),
    };

    await TestBed.configureTestingModule({
      imports: [ServiceTemplateComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
