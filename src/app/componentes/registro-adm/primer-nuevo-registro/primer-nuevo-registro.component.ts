import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../servicios/login.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { slideInAnimation } from 'src/app/animations';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-primer-nuevo-registro',
  templateUrl: './primer-nuevo-registro.component.html',
  styleUrls: ['./primer-nuevo-registro.component.css']
})
export class PrimerNuevoRegistroComponent implements OnInit {

  selectedValue: string;
  nombre = '';
  apellido = '';
  mail = '';
  clave= '';
  repitaClave= '';
  terminosCondiciones: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  foods: Food[] = [
    {value: 'usuario', viewValue: 'Paciente'},
    {value: 'profesional', viewValue: 'Doctor'},
    {value: 'admin', viewValue: 'Administrador'}
  ];

  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  Volver() {
    this.router.navigate(['/Login']);
  }

  Registrar() {
    switch (this.selectedValue) {
      case "usuario":
        console.log("loginUsuario");
        break;
      case "profesional":
        console.log("loginProfesional");
        break;
      case "admin":
        console.log("loginAdmin");
        break;
    
      default:
        break;
    }
  }
}
