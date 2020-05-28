import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponent } from './componentes/material/material.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { AtenderTurnoComponent } from './componentes/atender-turno/atender-turno.component';
import { VerReseniaComponent } from './componentes/ver-resenia/ver-resenia.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { FichaMedicaComponent } from './componentes/ficha-medica/ficha-medica.component';
import { HttpClientModule  } from '@angular/common/http';


// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { environment } from '../environments/environment';
    // Initialize Cloud Firestore through Firebase
    firebase.initializeApp(environment.firebaseConfig);

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
// import { FirebaseService } from './servicios/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    CabeceraComponent,
    FooterComponent,
    HomeComponent,
    PedirTurnoComponent,
    AtenderTurnoComponent,
    VerReseniaComponent,
    EncuestaComponent,
    FichaMedicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponent,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
