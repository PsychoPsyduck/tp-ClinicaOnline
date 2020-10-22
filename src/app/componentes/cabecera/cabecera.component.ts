import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    private router: Router,
    public loginService: LoginService
    ) { }

  ngOnInit() {
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
      case 'Salir':
          this.loginService.logOut();
        break;
    }
  }
}
