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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home/home.component';
import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { AtenderTurnoComponent } from './componentes/atender-turno/atender-turno.component';
import { VerReseniaComponent } from './componentes/ver-resenia/ver-resenia.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { FichaMedicaComponent } from './componentes/ficha-medica/ficha-medica.component';
import { HttpClientModule  } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';


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
import { RegistroAdmComponent } from './componentes/registro-adm/registro-adm.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { PrimerNuevoRegistroComponent } from './componentes/registro-adm/primer-nuevo-registro/primer-nuevo-registro.component';
import { SegundoNuevoRegistroComponent } from './componentes/registro-adm/segundo-nuevo-registro/segundo-nuevo-registro.component';
import { SeleccionarTurnoComponent } from './componentes/seleccionar-turno/seleccionar-turno.component';
import { DiasPipe } from './pipes/dias.pipe';
import { NombrePipe } from './pipes/nombre.pipe';
// import { FirebaseService } from './servicios/firebase.service';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { TurnoMedicoComponent } from './componentes/turno-medico/turno-medico.component';


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
    FichaMedicaComponent,
    RegistroAdmComponent,
    CuentaComponent,
    PrimerNuevoRegistroComponent,
    SegundoNuevoRegistroComponent,
    SeleccionarTurnoComponent,
    DiasPipe,
    NombrePipe,
    TurnoMedicoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponent,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
