import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from '../../servicios/turno.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Profesional } from '../../clases/profesional'
import { DataService } from 'src/app/servicios/data.service';
import { LoginService } from 'src/app/servicios/login.service';
import { Usuario } from 'src/app/clases/usuario';

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

  paso = 0;

  usuario = null;
  especialidad = null;

  constructor(public turnoService: TurnoService,
              private dataService: DataService,
              public usuarioService: UsuarioService,
              private loginService: LoginService) {

                this.selectedValueProf = "";
                this.selectedValueHora = "";
                this.turno = new Turno(new Usuario("","",0,"","",""),0,"","","","","","");
  }

  ngOnInit(): void {
    this.usuario = this.loginService.usuario
    this.dataService.getAll2("turnos").subscribe(res => {

      this.turnos = res
    });
  }

  profesionales = null;
  profesional = null;
  dias = null;
  dia = null;
  turnos = null;
  hora = null;
  horas = null;

  turnoshoras: string[] = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
  '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30']
  
  enviarEsp(especialidad) {
    this.especialidad = especialidad;
    this.profesionales = this.dataService.getAll3("usuarios", "profesional", especialidad);
    this.paso = 1;
  }
  
  enviarProfesional(usuario) {
    this.profesional = usuario;
    this.dias = usuario.dia;
    this.paso = 2;

  }

  enviarDia(dia) {
    this.turnoshoras = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
    '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];

    let indexEmpieza;
    let indexTermina;
    let index;
    this.dia = dia;
    let hor = this.turnoshoras;

    hor.reverse();
    
    hor.forEach(element => {
      if(element == this.profesional.salida){
        console.log("llegue salida")
        indexTermina = hor.indexOf(this.profesional.salida);
        console.log(indexTermina)
        hor.splice(0, indexTermina );
      }
    });

    hor.reverse();

    hor.forEach(element => {
      if(element == this.profesional.entrada){
        console.log("llegue entrada")
        indexEmpieza = hor.indexOf(this.profesional.entrada);
        console.log(indexEmpieza)
        hor.splice(0, indexEmpieza);
      }
    });
    

    this.turnos.forEach(element => {
      if(element.medico.mail == this.profesional.mail && element.fecha == dia) {
        hor.forEach(hora => {
          if(element.horario == hora) {
            index = hor.indexOf(hora);
            hor.splice(index, 1);
          }
        });
      }
    });
    
    this.horas = hor;

    this.paso = 3;
  }

  enviarHora(hora) {
    this.hora = hora;

    console.log(this.hora);

    this.turno.especialidad = this.especialidad;
    this.turno.medico = this.profesional;
    this.turno.fecha = this.dia;
    this.turno.horario = hora;

    this.paso = 4;
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
    this.dataService.crear('turnos', turnoAux).then(res =>
      this.paso = 0,

    );
  }
}
