import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoMedicoComponent } from './turno-medico.component';

describe('TurnoMedicoComponent', () => {
  let component: TurnoMedicoComponent;
  let fixture: ComponentFixture<TurnoMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
