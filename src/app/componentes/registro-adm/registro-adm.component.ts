import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { slideInAnimation } from 'src/app/animations';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registro-adm',
  templateUrl: './registro-adm.component.html',
  styleUrls: ['./registro-adm.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class RegistroAdmComponent implements OnInit {
  
  selectedValue: string;
  nombre = '';
  apellido = '';
  mail = '';
  clave= '';
  repitaClave= '';
  terminosCondiciones: boolean;

  usuario: Usuario = new Usuario();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService) {
  }

  foods: Food[] = [
    {value: 'usuario', viewValue: 'Paciente'},
    {value: 'profesional', viewValue: 'Doctor'},
    {value: 'admin', viewValue: 'Administrador'}
  ];

  ngOnInit(): void {
  }

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
