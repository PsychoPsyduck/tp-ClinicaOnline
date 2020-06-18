import { Injectable } from '@angular/core';
import { Turno } from '../clases/turno';

import * as firebase from "firebase/app";

import {environment} from '../../environments/environment';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  listado:any;

  constructor() { }

  db = firebase.firestore();

  public crear(turno: Turno) {
    database().ref('turnos')
      .push(turno)
      .then(() => console.info("Alta exitosa"))
      .catch(() => console.info("No se pudo realizar alta"));
      // this.traerTurnos();
  }

  public turnosPorMedico(medico: string): Turno[]
  {
    let turnos = new Array;
    console.info("Fetch de todos los turnos");

    database().ref('turnos').on('value',(snapshot) => {         
        snapshot.forEach((child) =>{
          var data = child.val();
          if(data.medico == medico) {
            turnos.push(data);
          }
        });
        // localStorage.setItem('turnos', JSON.stringify(turnos));
        // console.info("Turnos");
        // console.log(turnos);   
      })
      return turnos;
  }

  async getUsers() {
    let usrsRef = await this.db.collection('turnos').where("medico", "==", "frontale@mail.com").get();

    this.listado = usrsRef.docs.map(function(x){
      return x.data();
    });
  }

  async buscarDisponibilidad(medico: string, fecha: string, hora: string) {
    let disponible = true;
    
    await this.getUsers();

    console.log("disponible");
    console.log(this.listado);

    this.listado.forEach(element => {
      if(element.fecha.toString() == fecha && element.horario == hora){
        disponible = false;
      }
    });

    return disponible;
  }
}

