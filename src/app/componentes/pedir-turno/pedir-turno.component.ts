import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from '../../servicios/turno.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Profesional } from '../../clases/profesional'
import { DataService } from 'src/app/servicios/data.service';
import { LoginService } from 'src/app/servicios/login.service';

interface turnoHora {
  value: string;
}

@Component({
  selector: 'app-pedir-turno',
  templateUrl: './pedir-turno.component.html',
  styleUrls: ['./pedir-turno.component.css']
})
export class PedirTurnoComponent implements OnInit {

  selectedValueProf: string;
  selectedValueHora: string;
  turno: Turno;

  usuario = null;
  especialidad = null;

  constructor(public turnoService: TurnoService,
              private dataService: DataService,
              public usuarioService: UsuarioService,
              private loginService: LoginService) {

                this.selectedValueProf = "";
                this.selectedValueHora = "";
                this.turno = new Turno("",0,"","","","","","");
  }

  ngOnInit(): void {
    this.usuario = this.loginService.usuario
    // this.consultaDisponible();
    // this.cargarProfesionales();
  }

  profesionales = null;
  profesional = null;
  dias = null;
  dia = null;
  turnos = null;
  hora = null;

  turnoshoras: turnoHora[] = [
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

  

  // async cargarProfesionales() {
  //   this.profesionales = await this.usuarioService.get();
  //   console.log("this.profesionales");
  //   console.log(this.profesionales);
  // }



  enviarEsp(especialidad) {
    this.especialidad = especialidad;
    this.profesionales = this.dataService.getAll3("usuarios", "profesional", especialidad);
  }
  
  enviarProfesional(usuario) {
    this.profesional = usuario;
    this.dias = usuario.dia;
    console.log(this.dias);
  }

  enviarDia(dia) {
    this.dia = dia;
    // this.turnos = this.dataService.getAll4("turnos", dia);
    console.log(this.dia);
  }

  enviarHora(hora) {
    this.hora = hora;

    console.log(this.hora);

    this.turno.especialidad = this.especialidad;
    this.turno.medico = this.profesional;
    this.turno.fecha = this.dia;
    this.turno.horario = hora;
  }

  enviarTurno(turno: Turno) {
    let turnoAux = {
      medico: turno.medico,
      duracion: turno.duracion,
      fecha: turno.fecha,
      horario: turno.horario,
      especialidad: turno.especialidad, 
      resenia: '',
      paciente: this.usuario,
      estado: '0',

    }
    
    console.log(turnoAux);
    this.dataService.crear('turnos', turnoAux);
  }
}
