import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/clases/turno';
import { DataService } from 'src/app/servicios/data.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  form: FormGroup;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;

  especialidades;
  profesionales;

  esProfesion = false;
  esProfesional = false;
  esDia = false;
  esHora = false;
  esConfirmar = false;

  today = new Date();
  boton = "Buscar";

  @Input() titulo: string;

  @Input() accion: number;
  @Input() especialidad: string;
  @Input() profesionalesInp;
  @Input() dia: string[];
  @Input() turnos: string[];
  @Input() turno = new Turno("",0,"","","","","","",);

  @Output() enviarEspecialidad= new EventEmitter<string>();
  @Output() enviarProfesional= new EventEmitter<string>();
  @Output() enviarDia= new EventEmitter<string>();
  @Output() enviarHora= new EventEmitter<string>();
  @Output() enviarTurno= new EventEmitter<Turno>();

  turnoshoras = [
    {value: '8:00'},
    {value: '8:30'},
    {value: '9:00'},
    {value: '9:30'},
    {value: '10:00'},
    {value: '10:30'},
    {value: '11:00'},
    {value: '11:30'},
    {value: '12:00'},
    {value: '12:30'},
    {value: '13:00'},
    {value: '13:30'},
    {value: '14:00'},
    {value: '14:30'},
    {value: '15:00'},
    {value: '15:30'},
    {value: '16:00'},
    {value: '16:30'},
    {value: '17:00'},
    {value: '17:30'},
    {value: '18:00'},
    {value: '18:30'}];

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private dataService: DataService) { }

  ngOnInit() {
    
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      hora: ['', Validators.required],
      dia: ['', Validators.required],
      profesional: ['', Validators.required],
      especialidad: ['', Validators.required],
      terminosCondiciones: ['']
    });

    switch (this.accion) {
      case 1:
        this.esProfesion = true;
        this.dataService.getAll2("especialidades").subscribe(res => {
          this.especialidades = res
        });
        break;
      case 2:
        this.esProfesional = true;
        break;
      case 3:
        this.esDia = true;
        break;
      case 4:
        this.esHora = true;
        break;
      case 5:
        this.boton = "Solicitar"
        this.esConfirmar = true;
        break;
    }
  }

  seleccionProfesion(){
    
  }

  Buscar(event){
    const { especialidad, profesional, dia, hora} = this.form.value;

    switch (this.accion) {
      case 1:
        this.enviarEspecialidad.emit(especialidad);
        break;
      case 2:
        this.enviarProfesional.emit(profesional);
        break;
      case 3:
        this.enviarDia.emit(dia);
        break;
      case 4:
        this.enviarHora.emit(hora);
        break;
      case 5:
        this.enviarTurno.emit(this.turno);
        break;
    }
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    let valid: boolean;
    
    this.dia.forEach(res => {
      if(this.mapFecha(res) == day) {
        valid = true;
      }
    })

    return valid && day !== 0;
  }

  mapFecha(fecha: string) {
    
    switch (fecha) {
      case "Lunes":
        return 1;
      case "Martes":
        return 2;
      case "Miercoles":
        return 3;
      case "Jueves":
        return 4;
      case "Viernes":
        return 5;
      case "Sabado":
        return 6;
    }
  }
}
