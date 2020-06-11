import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';


import * as firebase from "firebase/app";

import {environment} from '../../environments/environment';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public router: Router,
              public uploadService: UploadService) { }

  user = null;

  db = firebase.firestore();

  signUp(usuario: Usuario, img1, img2) {
    var router = this.router;
    var dbRef = this.db;

    this.uploadImg(usuario, img1, img2);

    firebase.auth().createUserWithEmailAndPassword(usuario.mail, usuario.contraseña)
    .then(function(credencial) {
      dbRef.collection('usuarios').add({
        uid: credencial.user.uid,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        mail: usuario.mail,
        contraseña: usuario.contraseña,
        rol: usuario.rol,
        img1: usuario.img1,
        img2: usuario.img2
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

  public uploadImg( usuario: Usuario, imagen1, imagen2){
    this.uploadService.subirArchivo(usuario.mail+"_img1",imagen1,{nombre:usuario.nombre,apellido:usuario.apellido}).then((img)=>{
      this.uploadService.subirArchivo(usuario.mail+"_img2",imagen2,{nombre:usuario.nombre,apellido:usuario.apellido}).then(img2=>{
       img.ref.getDownloadURL().then(data=>{
        usuario.img1=data;
        console.log(data);
        img2.ref.getDownloadURL().then(data2=>{
          usuario.img2=data2;
         });
       });  
      });
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

  async getUser() {
    ;
    var dbRef = this.db;

    let user = await dbRef.collection('usuarios').where("uid", "==", 'qJVnYq64TnaUnELf5oVV6dtxQqC2').get();
    // .then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {

    //     user = doc.data();

    //     console.log("userService");
    //     console.log(user.rol);
    //   })
    //});

    return user;
  }

  async getCurrentUser() {
    firebase.auth().onAuthStateChanged(async user => {
      return user;
    });
  }

  async getUsers() {
    let usrsRef = await this.db.collection('usuarios').get();
    return usrsRef;
  }
}
