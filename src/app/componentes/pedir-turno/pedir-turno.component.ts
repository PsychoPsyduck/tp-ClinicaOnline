import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from '../../servicios/turno.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Profesional } from '../../clases/profesional'

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
  turnos: Turno[];
  turno: Turno;


  constructor(public turnoService: TurnoService,
              public usuarioService: UsuarioService) {

                this.selectedValueProf = "";
                this.selectedValueHora = "";
                this.turno = new Turno("",0,"","","","","","");
  }

  ngOnInit(): void {
    // this.consultaDisponible();
    this.cargarProfesionales();
  }

  profesionales: any;

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

  pedirTurno() {
    console.log("profesional seleccionado: " + this.selectedValueProf);

    this.turno.medico = this.selectedValueProf;
    this.turno.duracion = 0;
    this.turno.fecha = "20200616";
    this.turno.horario=this.selectedValueHora;
    this.turno.especialidad = "Clinico";
    this.turno.resenia = "";
    this.turno.paciente = "nialsande@gmail.com";
    this.turno.estado = "Pendiente";

    this.turnoService.crear(this.turno);
  }

  consultaDisponible() {
     let response = this.turnoService.buscarDisponibilidad("frontale@mail.com", "16062020", "12:00")
       if(response) {
         console.log("Disponible");
       }
       else {
         console.log("No Disponible");
       }
  }

  async cargarProfesionales() {
    this.profesionales = await this.usuarioService.get();
    console.log("this.profesionales");
    console.log(this.profesionales);
  }
}
