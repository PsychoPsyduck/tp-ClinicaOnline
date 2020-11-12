import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-cartilla',
  templateUrl: './cartilla.component.html',
  styleUrls: ['./cartilla.component.css']
})
export class CartillaComponent implements OnInit {

  listadoProfesionales = [];
  listaAux;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    
    this.dataService.getAll2("usuarios").subscribe(res => {
      this.listaAux = res;

      this.listaAux.forEach(element => {
        if(element.rol == "profesional") {
          
          this.listadoProfesionales.push(element);
        }
      });
    });
  }

}
