import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  
  nombre = '';
  apellido = '';
  mail = '';
  clave= '';
  repitaClave= '';
  terminosCondiciones: boolean;
  img1 = null;
  img2;

  esProfesional = false;
  esPaciente = true;

  master_checked: boolean = false;
  master_indeterminate: boolean = false;
  checkbox_list = [];
  checked_list = [];

  profesionales = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'profesional', viewValue: 'Profesional'}
  ];

  usuario: Usuario = new Usuario(this.nombre, this.apellido, 40, this.mail, this.clave, '');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService) {
  }

  ngOnInit() {
    this.checkbox_list = [
      {
        name: "Cardiologo",
        disabled: false,
        checked: false,
        labelPosition: "after"
      }, {
        name: "Kinesiologo",
        disabled: false,
        checked: false,
        labelPosition: "after"
      }, {
        name: "Clinico",
        disabled: false,
        checked: false,
        labelPosition: "after"
      }, {
        name: "Audiologo",
        disabled: false,
        checked: false,
        labelPosition: "after"
      }, {
        name: "Pediatra",
        disabled: false,
        checked: false,
        labelPosition: "after"
      }, {
        name: "Dentista",
        disabled: false,
        checked: false,
        labelPosition: "after"
      }, {
        name: "Cirujano",
        disabled: false,
        checked: false,
        labelPosition: "after"
      },
    ]
  }

  Volver() {
    this.router.navigate(['/Login']);
  }

  Registrar() {
    this.usuario.nombre = this.nombre;
    this.usuario.apellido = this.apellido;
    this.usuario.mail = this.mail;
    this.usuario.contraseña = this.clave;
    this.usuario.rol = "user";
    
    if (this.clave === this.repitaClave && this.terminosCondiciones == true) {
      this.loginService.signUp(this.usuario, this.img1, this.img1);
    }
  }

  onFileSelected(event) {
    this.img1 = event.target.files[0];
  }
}
