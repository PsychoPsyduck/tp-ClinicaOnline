import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-atender-turno',
  templateUrl: './atender-turno.component.html',
  styleUrls: ['./atender-turno.component.css']
})
export class AtenderTurnoComponent implements OnInit {

  @Output() eliminarPelicula = new EventEmitter()
  @Input() atenderTurno:Turno

  turnoActivo: boolean;
  resenia = '';

  constructor() {
    this.turnoActivo = false;
  }

  ngOnInit(): void {

  }

  atender() {
    this.turnoActivo = true;
  }

  terminarTurno() {
    this.turnoActivo = false;
  }

  // Buscar turno para actualizar: Usar key Doctor, fecha y hora. Agregar
}
