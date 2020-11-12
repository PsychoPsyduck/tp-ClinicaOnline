import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-usuarios-listado',
  templateUrl: './usuarios-listado.component.html',
  styleUrls: ['./usuarios-listado.component.css']
})
export class UsuariosListadoComponent implements OnInit {

  listadoUsuarios = [];
  listaAux;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    
    this.dataService.getAll2("usuarios").subscribe(res => {
      this.listaAux = res;

      this.listaAux.forEach(element => {
        if(element.rol == "usuario") {
          
          this.listadoUsuarios.push(element);
        }
      });
    });
  }
}
