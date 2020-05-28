import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';


import * as firebase from "firebase/app";

import {environment} from '../../environments/environment';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public router: Router) { }

  user = null;

  db = firebase.firestore();

  signUp(usuario: Usuario) {
    var router = this.router;
    var dbRef = this.db;

    firebase.auth().createUserWithEmailAndPassword(usuario.mail, usuario.contraseña)
    .then(function(credencial) {
      dbRef.collection('usuarios').add({
        uid: credencial.user.uid,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        mail: usuario.mail,
        contraseña: usuario.contraseña,
        rol: usuario.rol
      })
      .then(function (docRef) {
        console.log("Bien")
      });
      credencial.user.getIdToken()
        .then(function (token) {
        localStorage.setItem('token', token);
        router.navigate(['/Login']);
      });
    })
    .catch(function (error) {
      console.error("Error: ", error);
    });
  }

  logIn(email: string, pass: string) {
    var router = this.router;
    var dbRef = this.db;

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function (credential) {
      console.log(credential);
      dbRef.collection("usuarios")
      .where("uid", "==", credential.user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(doc.data());
        credential.user.getIdToken()
          .then(function (token) {
            
            console.log("Bien")
            
            localStorage.setItem('token', token);
            router.navigate(['/home']);
          });
        });
      });
    })
    .catch(function (error) {
      console.error("Error: ", error);
    });
    
  }

  logOut() {
    var router = this.router;

    localStorage.removeItem('token');
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log("Bien")
      router.navigate(['/']);
    }).catch(function (error) {
      console.error("Error: ", error);
    });
  }
}
