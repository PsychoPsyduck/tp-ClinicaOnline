import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  mostrarDatos: boolean;
  user;
  usuario;
  listado:any;

  constructor(public loginService: LoginService) { 
    
    this.mostrarDatos=false;
    this.usuario = new Usuario('','',40,'','','');

  }

  ngOnInit() {
    this.TraerTodos();
  }

  async getUser() {

    var querySnapshot  = await this.loginService.getUser("nialsande@gmail.com");

    this.user = querySnapshot.docs.map(function(x){
      return x.data();
    });
    
    console.log("estado principio: " + this.mostrarDatos);
    console.log("usuario: " + this.user[0].nombre);
    console.log("rol: " + this.user[0].rol);
    console.log("img1: " + this.user[0].img1);

    this.usuario.nombre = this.user[0].nombre;
    this.usuario.apellido = this.user[0].apellido;
    this.usuario.img1 = this.user[0].img1;
    this.usuario.img2 = this.user[0].img2;

    this.mostrarDatos = !this.mostrarDatos;

    
    console.log("estado fin: " + this.mostrarDatos);
  }


  async TraerTodos(){
    var querySnapshot  = await this.loginService.getUsers();
    this.listado = querySnapshot.docs.map(function(x){
      return x.data();
    });
  }
}
