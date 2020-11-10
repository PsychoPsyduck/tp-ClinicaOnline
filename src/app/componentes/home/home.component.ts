import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
      // case 'Salir':
      //     this.loginService.usuario = null;
      //     this.loginService.logOut();
      //     this.router.navigate([''])
      //   break;
    }
  }
}
