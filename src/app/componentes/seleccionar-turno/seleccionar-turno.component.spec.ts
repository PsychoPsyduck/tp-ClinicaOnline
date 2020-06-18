import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarTurnoComponent } from './seleccionar-turno.component';

describe('SeleccionarTurnoComponent', () => {
  let component: SeleccionarTurnoComponent;
  let fixture: ComponentFixture<SeleccionarTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
