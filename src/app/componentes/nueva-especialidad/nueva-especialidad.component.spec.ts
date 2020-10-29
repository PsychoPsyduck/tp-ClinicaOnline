import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEspecialidadComponent } from './nueva-especialidad.component';

describe('NuevaEspecialidadComponent', () => {
  let component: NuevaEspecialidadComponent;
  let fixture: ComponentFixture<NuevaEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
