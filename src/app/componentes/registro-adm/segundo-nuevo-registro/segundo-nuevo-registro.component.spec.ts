import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoNuevoRegistroComponent } from './segundo-nuevo-registro.component';

describe('SegundoNuevoRegistroComponent', () => {
  let component: SegundoNuevoRegistroComponent;
  let fixture: ComponentFixture<SegundoNuevoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegundoNuevoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundoNuevoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
