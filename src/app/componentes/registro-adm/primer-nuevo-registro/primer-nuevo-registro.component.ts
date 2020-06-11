import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-primer-nuevo-registro',
  templateUrl: './primer-nuevo-registro.component.html',
  styleUrls: ['./primer-nuevo-registro.component.css']
})
export class PrimerNuevoRegistroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }
}
