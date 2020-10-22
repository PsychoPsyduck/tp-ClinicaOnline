import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {

  listadoProfesionales;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    
    this.cargarProfesionales();
  }

  async cargarProfesionales() {
    this.listadoProfesionales = await this.usuarioService.get();
  }
}
