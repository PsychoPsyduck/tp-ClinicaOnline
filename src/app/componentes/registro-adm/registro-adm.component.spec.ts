import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAdmComponent } from './registro-adm.component';

describe('RegistroAdmComponent', () => {
  let component: RegistroAdmComponent;
  let fixture: ComponentFixture<RegistroAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
