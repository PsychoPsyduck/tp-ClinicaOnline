import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.css']
})
export class ModalTurnoComponent implements OnInit {

  opinion:string;
  calificaciones = [1,2,3,4,5];
  calif:number;
  edad:number;
  temperatura:number;
  presion:number;
  //listaDinamicos:Array<Dinamicos> = new  Array<Dinamicos>();
  listaDinamicos = [];

  @Input() mostrar;

  constructor() { }

  ngOnInit(): void {
  }
  
  cerrar() {
    // this.mostrar = "false";
    console.log(this.mostrar)
  }

}
