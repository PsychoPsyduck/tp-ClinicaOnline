import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-turno-medico',
  templateUrl: './turno-medico.component.html',
  styleUrls: ['./turno-medico.component.css']
})
export class TurnoMedicoComponent implements OnInit {

  turnos: Turno[];
  turnoSeleccionado: Turno;
  constructor(private turnoService: TurnoService) { }

  ngOnInit(): void {
  }

  enviarTurnoSeleccionado( event ){
    this.turnoSeleccionado = event;
  }

  atender( id ){
    // this.peliculaService.eliminarPelicula(id);
    // this.peliculas=this.peliculaService.obtenerPelicula();
  }
}
