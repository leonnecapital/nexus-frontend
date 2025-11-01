import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticoFinanceiro } from './diagnostico-financeiro';

describe('DiagnosticoFinanceiro', () => {
  let component: DiagnosticoFinanceiro;
  let fixture: ComponentFixture<DiagnosticoFinanceiro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticoFinanceiro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticoFinanceiro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
