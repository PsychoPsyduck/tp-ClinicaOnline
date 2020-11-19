import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/servicios/data.service';
import { LoginService } from 'src/app/servicios/login.service';
// import { DatePipe } from '@angular/common'

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
  @Input() horas: string[];
  @Input() turnos: string[];
  @Input() turno = new Turno(new Usuario("","",0,"","",""),0,"","","","","","");

  @Output() enviarEspecialidad= new EventEmitter<string>();
  @Output() enviarProfesional= new EventEmitter<string>();
  @Output() enviarDia= new EventEmitter<string>();
  @Output() enviarHora= new EventEmitter<string>();
  @Output() enviarTurno= new EventEmitter<Turno>();

  turnoshoras: string[] = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
  '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30']

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private dataService: DataService,
              private datePipe: DatePipe) { }

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

  Buscar(event){
    
  }

  seleccionProfesion(){
    const { especialidad, profesional, dia, hora} = this.form.value;

    switch (this.accion) {
      case 1:
        this.enviarEspecialidad.emit(especialidad);
        break;
      case 2:
        this.enviarProfesional.emit(profesional);
        break;
      case 3:
        let aux =  this.datePipe.transform(dia, 'dd/MM/yyyy');
        this.enviarDia.emit(aux);
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
