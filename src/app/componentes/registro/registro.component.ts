import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/servicios/data.service';
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
  
  form: FormGroup;
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
    public loginService: LoginService,
    private dataService: DataService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.required],
      clave: ['', Validators.required],
      repitaClave: ['', Validators.required],
      // rol: ['', Validators.required],
      // especialidad: [[], Validators.required],
      terminosCondiciones: ['']
    });
  }

  Volver() {
    this.router.navigate(['/Login']);
  }

  Registrar(event) {
    const { nombre, apellido, mail, clave } = this.form.value;
    event.preventDefault();

    console.log("llega")

    let usuarioAux = {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      clave: clave
    }

    let usuario = new Usuario(nombre, apellido, 33, mail, clave, "usuario");

    if (this.form.valid) {
      console.log(this.form.value);
      this.loginService.registroUsuario(mail, clave, this.img1, this.img1, usuario).then(res => {
          console.log(res)
      }).catch(err => console.log(err));
    }


    // this.usuario.nombre = usuario.nombre;
    // this.usuario.apellido = usuario.apellido;
    // this.usuario.mail = usuario.mail;
    // this.usuario.contraseña = usuario.clave;
    // this.usuario.rol = "user";
    // this.loginService.signUp(this.usuario, this.img1, this.img1);
    
    // if (this.clave === this.repitaClave && this.terminosCondiciones == true) {
      
    // }
  }

  onFileSelected(event) {
    this.img1 = event.target.files[0];
  }
}
