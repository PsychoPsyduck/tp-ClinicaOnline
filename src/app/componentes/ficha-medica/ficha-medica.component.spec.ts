import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaMedicaComponent } from './ficha-medica.component';

describe('FichaMedicaComponent', () => {
  let component: FichaMedicaComponent;
  let fixture: ComponentFixture<FichaMedicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaMedicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
