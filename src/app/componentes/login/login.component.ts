import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {Subscription, BehaviorSubject} from "rxjs";

import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';

import { AuthService } from './../../auth/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
// import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/servicios/data.service';

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


  usuarios;


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
    private usuarioService: UsuarioService,
    private dataService: DataService,
    // private toastr:ToastrService
    ) {
      this.Tiempo=5; 
      this.ocultarVerificar=false;
    }

  ngOnInit() {
    this.form = this.fb.group({
      mail: ['', Validators.required],
      clave: ['', Validators.required]
    });

    this.usuarios = this.dataService.getAll("usuarios");
  }

  Entrar() {
    const { mail, clave } = this.form.value;
    let rol;

    if(mail && clave && this.recaptcha) {
      this.ocultarVerificar=true;
      
      this.usuarios.forEach(element => {
        if(element.mail == mail) {
          rol = element.rol;
        }
      });

      if(rol == "profesional") {

        this.loginService.ingresoInstitucional(mail, clave).then( res => {
          console.log("Esto es usuario: " + res);
          this.router.navigate(['/home']);
          this.authService.login().subscribe(resp => {this.router.navigate(['home'])
            console.log("Esto es prof: " + resp)
          });
        }).catch(err => console.log(err));
        
      } else if (rol == "usuario") {

        this.loginService.ingresoUsuario(mail, clave).then( res => {
          console.log("Esto es usuario: " + res);
          this.router.navigate(['/home']);
          this.authService.login().subscribe(resp => {this.router.navigate(['home'])
            console.log("Esto es usuario: " + resp)
          });
        }).catch(err => console.log(err));

      } else {
        console.log("es perri");
      }
    }
  }

  resolved(captchaResponse: any) {
    this.recaptcha = captchaResponse;
    console.log("captcha: " + this.recaptcha);
  }
  
  IngresoRapido(ingreso) {
    switch (ingreso) {
      case "admin":
        this.form.setValue({
          mail: "admin@mail.com",
          clave: "123456"
        });
        break;
      case "profesional":
        this.form.setValue({
          mail: "profesional@mail.com",
          clave: "123456"
        });
        break;
      case "usuario":
        this.form.setValue({
          mail: "usuario@mail.com",
          clave: "123456"
        });
        break;
    }
  }

  mostrarMensajeError(mensaje){
    // this.toastr.error("Ocurrio un error: "+mensaje);
  }
}
