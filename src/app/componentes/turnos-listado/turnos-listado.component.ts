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

  constructor(private dataService: DataService,
              private loginService: LoginService,
              private turnoService: TurnoService) { 
    this.usuario = this.loginService.usuario; 
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.listadoTurnos = this.dataService.getAll5("turnos", this.usuario.mail);
  }

  cancelar(turno) {
    this.listadoTurnos = new Array();
    this.getData();
    this.turnoService.updateEstadoTurno(turno, "5");
  }

  confirmar(turno) {
    this.listadoTurnos = new Array();
    this.getData();
    this.turnoService.updateEstadoTurno(turno, "1");
  }
  
  atender(turno) {
    this.mostrar(true);
  }

  informe(turno) {

  }

  mostrar(dato:boolean)
  {
    this.mostrarModal = dato;
  }
}
