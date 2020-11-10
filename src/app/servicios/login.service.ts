import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import * as firebase from "firebase/app";

import {environment} from '../../environments/environment';

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { rejects } from 'assert';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario;


  constructor(public router: Router,
              public uploadService: UploadService,
              public angularFireAuth:AngularFireAuth,
              private dataService: DataService,
              private afs: AngularFirestore) {
              this.usuario = this.angularFireAuth.authState;
               }

  user = null;
  listado:any;

  db = firebase.firestore();

  signUp(usuario: Usuario, img1, img2) {
    var router = this.router;
    var dbRef = this.db;

    // this.uploadImg(usuario, img1, img2);

    firebase.auth().createUserWithEmailAndPassword(usuario.mail, usuario.contraseña)
    .then(function(credencial) {
      this.uploadImg(usuario, img1, img2)
      .then(function (docRef) {
        // ;
        // console.log("Bien");

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
      })


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

  public logIn( mail:string, contraseña:string ){
    return this.angularFireAuth.signInWithEmailAndPassword(mail,contraseña);
  }

  async getUserOld(email) {
    
    var dbRef = this.db;

    let querySnapshot = await dbRef.collection('usuarios').where("email", "==", email).get();

    this.user = querySnapshot.docs.map(function(x){
      return x.data();
    });

    return this.user[0];
  }

  async getCurrentUser(mail) {
    let usrsRef = await this.db.collection('usuarios').where("mail", "==", mail).get();

    var listado = usrsRef.docs.map(function(x){
      return x.data();
    });  

    
    var usuario = new Usuario(listado[0].nombre, listado[0].apellido, 11, listado[0].mail, listado[0].contraseña, listado[0].rol);

    return usuario;
  }

  async getUsers() {
    let usrsRef = await this.db.collection('usuarios').where("mail", "==", "nialsande@gmail.com").get();
    return usrsRef;
  }

  public currentUser(){
    return this.angularFireAuth.currentUser;
  }

  public logueado(){
    return this.angularFireAuth.currentUser.then(resp=>{
      if(resp){
        return true;
      }else{
        return false;
      }
    })
  }

  public logOut(){
    return this.angularFireAuth.signOut();
  }


  //New Era
  SendVerificationMail() {
    return firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['inicio']);
    })
  }

  registroUsuario(email, password, img1, img2, usuario: Usuario) {
    let refImg1;
    let refImg2;

    let usuarioCrear = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      mail: usuario.mail,
      clave: usuario.contraseña,
      img1: '',
      img2: '',
      rol: "usuario"
    }

    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail(); // Sending email verification notification, when new user registers
        this.uploadService.subirArchivo(usuario.mail+"_img1",img1,{nombre:usuario.nombre,apellido:usuario.apellido}).then((img1)=>{
          this.uploadService.subirArchivo(usuario.mail+"_img2",img2,{nombre:usuario.nombre,apellido:usuario.apellido}).then(img2=>{
            img1.ref.getDownloadURL().then(data1=>{
              usuarioCrear.img1=data1;
              img2.ref.getDownloadURL().then(data2=>{
                usuarioCrear.img2=data2;
                this.dataService.crear('usuarios', usuarioCrear);
              });
            });
          });
        });
      }).catch((error) => {
        window.alert(error.message)
      });
  }

  registroAdmin() {
    
  }

  registroProfesional(usuario: Usuario) {

    let usuarioCrear = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      mail: usuario.mail,
      clave: usuario.contraseña,
      rol: usuario.tipo,
      especialidad: usuario.especialidad,
      dia: usuario.dia,
    }

    return firebase.auth().createUserWithEmailAndPassword(usuarioCrear.mail, usuarioCrear.clave).then((result) => {
      this.dataService.crear('usuarios', usuarioCrear);
    }).catch((error) => {
      window.alert(error.message)
    });
  }

  ingresoUsuario(email, password) {
    this.getUser(email);
    return new Promise((resolve, reject) => { 
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.SendVerificationMail();
          window.alert('Por favor valide su mail.');
          reject();
        } else {
          resolve(result);
        }
      }).catch((error) => {
        window.alert(error.message);
        reject();
      })
    });
  }

  ingresoInstitucional(email, password) {
    this.getUser(email);
    return new Promise((resolve, reject) => { 
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((result) => {
        resolve(result);
      }).catch((error) => {
        window.alert(error.message);
        reject();
      })
    });
  }

  getUser(email: string) {
    this.dataService.traerUno("usuarios", "mail", email).then(res => {
      this.usuario = res;
    })
  }
}
