import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-segundo-nuevo-registro',
  templateUrl: './segundo-nuevo-registro.component.html',
  styleUrls: ['./segundo-nuevo-registro.component.css']
})
export class SegundoNuevoRegistroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }
}
