import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaDiasComponent } from './grafica-dias.component';

describe('GraficaDiasComponent', () => {
  let component: GraficaDiasComponent;
  let fixture: ComponentFixture<GraficaDiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaDiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficaDiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
