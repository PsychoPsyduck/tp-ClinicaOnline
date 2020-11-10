import { Injectable } from '@angular/core';
import { Turno } from '../clases/turno';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  listado:any;

  constructor(public http: HttpClient,
              public db: AngularFirestore,) { }

  updateEstadoTurno(turno, estado) { 
    return  this.db.collection('turnos').doc(turno.uid.toString()).update({
      estado: estado,
    }) 
  }
}

