import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrls: ['./usuarios-listado.component.css']
})
export class UsuariosListadoComponent implements OnInit {

  listadoUsuarios;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
    
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.listadoUsuarios = await this.usuarioService.get();
  }
}
