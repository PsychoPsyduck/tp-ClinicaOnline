import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    private router: Router
    //public firebaseService: FirebaseService
    ) { }

  ngOnInit() {
  }

  Router(tipo: string) {
    switch (tipo) {
      case 'Home':
          this.router.navigate(['/home']);
        break;
      case 'Salir':
          // this.firebaseService.logoutJugador();
        break;
      case 'Configuracion':
          this.router.navigate(['/Configuracion']);
        break;
      case 'Jugadores':
          this.router.navigate(['/Jugadores']);
        break;
    }
  }
}
