import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { LoginService } from 'src/app/servicios/login.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-turnos-listado',
  templateUrl: './turnos-listado.component.html',
  styleUrls: ['./turnos-listado.component.css']
})
export class TurnosListadoComponent implements OnInit {

  usuario = null;
  listadoTurnos = new Array();
  listado;
  mostrarModal:boolean;
  turno;
  estado;

  constructor(private dataService: DataService,
              private loginService: LoginService,
              private turnoService: TurnoService) { 
    this.usuario = this.loginService.usuario; 
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    if(this.usuario.rol == "profesional") {
      this.getDataProfesional();
    } else if (this.usuario.rol == "usuario") {
      this.getDataPaciente();
    }
  }

  getDataProfesional() {
    this.listadoTurnos = this.dataService.getAll5("turnos", this.usuario.mail);
  }
  getDataPaciente() {
    this.listadoTurnos = this.dataService.getAll6("turnos", this.usuario.mail);
  }

  cancelar(turno) {
    this.turnoService.updateEstadoTurno(turno, "5");
    this.actualizar();
  }

  confirmar(turno) {
    this.turnoService.updateEstadoTurno(turno, "1");
    this.actualizar();
  }
  
  atender(turno) {
    this.turno = turno;
    this.estado = "1";
    this.mostrar(true);
  }

  informe(turno) {
    this.turno = turno;
    if(this.usuario.rol == "profesional") {
      this.estado = turno.estado;
    } else {
      this.estado = 6;
    }
    this.mostrar(true);
  }

  reseniar(turno) {
    this.turno = turno;
    this.estado = 7;
    this.mostrar(true);
  }

  actualizar() {
    this.listadoTurnos = new Array();
    this.getData();
  }

  //MODAL

  mostrar(dato:boolean)
  {
    this.mostrarModal = dato;
  }

  cerrarOutput(tuco: boolean) {
    this.mostrarModal = tuco;
  }

  cerrarActualizarOutput(tuco: boolean) {
    this.mostrarModal = tuco;
    this.actualizar();
  }
}
