import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerNuevoRegistroComponent } from './primer-nuevo-registro.component';

describe('PrimerNuevoRegistroComponent', () => {
  let component: PrimerNuevoRegistroComponent;
  let fixture: ComponentFixture<PrimerNuevoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimerNuevoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimerNuevoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
