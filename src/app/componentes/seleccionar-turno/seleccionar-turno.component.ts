import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TurnoService } from '../../servicios/turno.service';
import { Turno } from 'src/app/clases/turno';
@Component({
  selector: 'app-seleccionar-turno',
  templateUrl: './seleccionar-turno.component.html',
  styleUrls: ['./seleccionar-turno.component.css']
})
export class SeleccionarTurnoComponent implements OnInit {

  @Output() turnoSeleccionado = new EventEmitter();
  @Input() turnos; 
  listado: any;

  constructor(private turnoService: TurnoService) { }

  ngOnInit(): void {
  
    this.traerTurnosMedico("arya@gmail.com");
  }

  traerTurnosMedico(medico: string) {
    this.listado = this.turnoService.turnosPorMedico(medico);
    // this.turnos = JSON.parse(localStorage.getItem("turnos"));
    console.log("this.turnos");
    console.log(this.listado);

  }

  atender( turno ){
    this.turnoSeleccionado.emit(turno);
  }
}
