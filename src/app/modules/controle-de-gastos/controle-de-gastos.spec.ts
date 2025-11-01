import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleDeGastos } from './controle-de-gastos';

describe('ControleDeGastos', () => {
  let component: ControleDeGastos;
  let fixture: ComponentFixture<ControleDeGastos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleDeGastos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleDeGastos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
