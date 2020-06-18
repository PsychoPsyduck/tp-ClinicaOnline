import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../clases/usuario';
import { database } from 'firebase';
import { Profesional } from '../clases/profesional';

import * as firebase from "firebase/app";

import {environment} from '../../environments/environment';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listado:any;

  constructor() { }

  db = firebase.firestore();

  async getUsuarios() {
    let usrsRef = await this.db.collection('usuarios').where("rol", "==", "usuario").get();
    // return usrsRef;

    this.listado = usrsRef.docs.map(function(x){
      return x.data();
    });
  }

  async getProfesionales() {
    let usrsRef = await this.db.collection('usuarios').where("rol", "==", "profesional").get();
    // return usrsRef;

    this.listado = usrsRef.docs.map(function(x){
      return x.data();
    });
  }

  async getAdmins() {
    let usrsRef = await this.db.collection('usuarios').where("rol", "==", "admin").get();
    // return usrsRef;

    this.listado = usrsRef.docs.map(function(x){
      return x.data();
    });
  }

  async get() {
    await this.getProfesionales();

    return this.listado;
  }
}
