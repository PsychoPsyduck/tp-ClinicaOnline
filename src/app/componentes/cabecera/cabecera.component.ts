import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  usuario = null;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;

  esAdmin = false;
  esProfesional = false;
  esUsuario = false;

  constructor(
    private router: Router,
    public loginService: LoginService) {
      this.Tiempo=1; 
      this.ocultarVerificar=false; }

  ngOnInit() {
    
    // this.repetidor = setInterval(()=>{ 
        
    //   this.Tiempo--;
    //   if(this.Tiempo==0 ) {
    //     clearInterval(this.repetidor);
        
        this.usuario = this.loginService.usuario;
        this.tipoUsuario();
    //   }
    // }, 900);
  }

  tipoUsuario() {
    // console.log("es: ", this.usuario.rol)
    if(this.usuario.rol == "usuario") {
      this.esUsuario = true;
      this.esAdmin = false;
      this.esProfesional = false;
      console.log("es usuario");
    } else if (this.usuario.rol == "profesional") {
      this.esAdmin = false;
      this.esProfesional = true;
      this.esUsuario = false;
      console.log("es profesional");
    } else if (this.usuario.rol == "admin") {
      this.esAdmin = true;
      this.esProfesional = false;
      this.esUsuario = false;
      console.log("es admin");
    }
  }

  Router(tipo: string) {
    switch (tipo) {
      case 'Home':
          this.router.navigate(['/home']);
        break;
      case 'registro':
          this.router.navigate(['/registro']);
        break;
      case 'pedir':
          this.router.navigate(['/pedirTurno']);
        break;
      case 'listadoUsuarios':
          this.router.navigate(['/verUsuarios']);
        break;
      case 'listadoTurnos':
          this.router.navigate(['/verTurnos']);
        break;
      case 'listadoCartilla':
          this.router.navigate(['/verCartilla']);
        break;
      case 'nuevaEspecialidad':
          this.router.navigate(['/nuevaEspecialidad']);
        break;
      case 'informe':
          this.router.navigate(['/informe']);
        break;
      case 'verTurnosAdm':
          this.router.navigate(['/verTurnosAdm']);
        break;
      case 'Salir':
          this.loginService.usuario = null;
          this.loginService.logOut();
          this.router.navigate([''])
        break;
    }
  }
}
