import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-nueva-especialidad',
  templateUrl: './nueva-especialidad.component.html',
  styleUrls: ['./nueva-especialidad.component.css']
})
export class NuevaEspecialidadComponent implements OnInit {

  form: FormGroup;
  
  constructor(private fb: FormBuilder,
              private dataService: DataService) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      repitaNombre: ['', Validators.required]
    });
   }

  Registrar() {
    const { nombre, repitaNombre } = this.form.value;

    if(nombre == repitaNombre) {
      
      let especialidad = {
        nombre: nombre,
      }

      this.dataService.crear("especialidades", especialidad).then(res => {
        console.log("llega bien perri")
      }).catch(err => console.log(err));;
    }
  }

}
