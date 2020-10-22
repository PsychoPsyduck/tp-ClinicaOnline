import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Subscription, BehaviorSubject} from "rxjs";

import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';

import { AuthService } from './../../auth/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

//import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService, 
    private authService: AuthService,
    private usuarioService: UsuarioService) {
      this.Tiempo=5; 
      this.ocultarVerificar=false;
    }

  ngOnInit() {
    this.form = this.fb.group({
      mail: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  Entrar() {
    const { mail, clave } = this.form.value;

    // this.loginService.registroUsuario(mail, clave).then( res => {
    //   console.log("Llega bien perri");
    // }).catch(err => console.log(err));

    if(mail && clave && this.recaptcha) {

      this.ocultarVerificar=true;
      this.loginService.logIn(mail, clave).then( res => {
        this.router.navigate(['/home']);
        this.authService.login().subscribe(resp => {this.router.navigate(['home'])
          console.log("Esto es resp: " + resp)
        });
      }).catch(err => console.log(err));

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
    
  }

  resolved(captchaResponse: any) {
    this.recaptcha = captchaResponse;
    console.log("captcha: " + this.recaptcha);
  }
  
  IngresoRapido() {
    this.form.setValue({
      mail: "invitado@mail.com",
      clave: "invitado"
    });
  }
}
