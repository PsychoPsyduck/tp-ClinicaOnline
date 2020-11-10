import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, DocumentChangeAction, DocumentReference, QueryFn } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
// import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { AuthService } from '../auth/auth.service';
import * as firebase from "firebase/app";
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public afs: AngularFireStorage,
    private authService: AuthService,
    // public toastController: ToastController
  ) {}

  getAll(path: string) {
    var lista = Array<any>();
    firebase.firestore().collection(path).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          let docum = doc.data();
          let any = docum;
          lista.push(any);
      });
    })
    return lista;
  }

  getAll2(path:string) {
    return this.db.collection(path).valueChanges();
  }

  getAll3(path: string, tipo: string, especialidad: string) {
    var lista = Array<any>();
    firebase.firestore().collection(path).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          let docum = doc.data();
          if(docum.rol == tipo) {
            docum.especialidad.forEach(element => {
              if(element == especialidad) {
                let any = docum;
                lista.push(any);
              }
            });
          }
      });
    })
    return lista;
  }

  getAll4(path: string, fecha: string) {
    var lista = Array<any>();
    firebase.firestore().collection(path).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let docum = doc.data();
        docum.fecha.forEach(element => {
          if(element == fecha) {
            let any = docum;
            lista.push(any);
          }
        });
      });
    })
    return lista;
  }

  getAll5(path: string, mail: string) {
    var lista = Array<any>();

    firebase.firestore().collection(path).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {

        let docum = doc.data();
        if(docum.medico.mail == mail) {
          docum.uid = doc.id;
          lista.push(docum);
        }
      });
    })
    return lista;
  }

  traerColeccion(path: string, query: QueryFn = null): Observable<DocumentChangeAction<unknown>[]> {
    if(query == null)
      return this.db.collection(path).snapshotChanges();
    else
      return this.db.collection(path, query).snapshotChanges();
  }

  traerUno(path: string, campo: string, valor: string) {
    return this.db
      .collection(path)
      .ref.where(campo, "==", valor)
      .get()
      .then(documento => {
        if (documento.docs.length > 0) {
          const usuario = documento.docs[0].data();
          return usuario;
        } else {
          return null;
        }
      });
  }

  public crear(path: string, objeto: any): Promise<DocumentReference> {
    console.log('Entro al crear');
    console.log('path', path);
    console.log('objeto', objeto);
    return this.db.collection(path).add(objeto);
  }

  public actualizar(path: string, doc: string, valor: any) {
    return this.db
      .collection(path)
      .doc(doc)
      .update(valor);
  }

  public setear(path: string, doc: string, valor: any) {
    return this.db
      .collection(path)
      .doc(doc)
      .set(valor);
  }

  public TraerUnoPath(path: string, doc: string){
    return this.db
      .collection(path)
      .doc(doc)
      .get();
  }

  borrar(path: string, doc: string): void {
    console.log('pah', path, "doc", doc)
    this.db
      .collection(path)
      .doc(doc)
      .delete()
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    // this.mostrarToast(error);
  }

  addUid(path, uid) {
    return this.db.collection(path).doc(uid).update({
      uid: uid,
    }) 
  }

  // subirImagenYTraerURl(path: string, imagenBase64: string): Promise<any> {
  //   let picData = ManejarDatosFoto(imagenBase64);
  //   let type = picData.type.split("/")[1];
  //   return this.afs.storage
  //     .ref(`${path}.${type}`)
  //     .putString(picData.pic, picData.base, {
  //       contentType: picData.type
  //     })
  //     .then(data => data.ref.getDownloadURL());
  // }

  // async mostrarToast(mensaje) {
  //   const toast = await this.toastController.create({
  //     message: mensaje,
  //     position: "top",
  //     color: "danger"
  //   });
  //   toast.present();
  // }
}
