import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';
import { LoginService } from 'src/app/servicios/login.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  listadoTurnos = new Array();
  turno;
  mostrarModal:boolean;

  constructor(private dataService: DataService,
    private loginService: LoginService,
    private turnoService: TurnoService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.dataService.getAll2("turnos").subscribe(res => {
      this.listadoTurnos = res;
    });
  }

  informe(turno) {
    this.turno = turno;

    this.mostrar(true);
  }

  mostrar(dato:boolean)
  {
    this.mostrarModal = dato;
  }

  cerrarOutput(tuco: boolean) {
    this.mostrarModal = tuco;
  }
}
