import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription, BehaviorSubject} from "rxjs";

import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';

import { AuthService } from './../../auth/auth.service';

//import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  mail = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;

  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;

  recaptcha: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService, private authService: AuthService
    ) {
      this.Tiempo=5; 
      this.ocultarVerificar=false;
    }

  ngOnInit() {
  }

  Entrar() {
    
    this.ocultarVerificar=true;
    this.loginService.logIn(this.mail, this.clave);
    this.authService.login().subscribe(resp => this.router.navigate(['home']));

    this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.ocultarVerificar=false;
        console.log(this.ocultarVerificar);
        this.Tiempo=5;
      }
    }, 900);
  }

  resolved(captchaResponse: any) {
    this.recaptcha = captchaResponse;
    console.log(this.recaptcha);
  }
  
}
