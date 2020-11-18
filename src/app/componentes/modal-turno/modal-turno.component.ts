import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.css']
})
export class ModalTurnoComponent implements OnInit {

  form: FormGroup;
  calificaciones = [1,2,3,4,5];
  //listaDinamicos:Array<Dinamicos> = new  Array<Dinamicos>();
  listaDinamicos = [];

  @Input() mostrar;
  @Input() turno;
  @Input() estado;

  @Output() cerrarOutput = new EventEmitter<boolean>();
  @Output() cerrarActualizarOutput = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
              private turnoService: TurnoService) { }

  ngOnInit() {
    this.form = this.fb.group({
      edad: ['', Validators.required],
      temperatura: ['', Validators.required],
      presion: ['', Validators.required],
      comentario: ['', Validators.required],
      comentarioPaciente: ['', Validators.required]
    });
  }
  
  cerrar() {
    // this.mostrar = false;
    // console.log(this.mostrar)
    this.form.setValue({
      edad: "",
      temperatura: "",
      presion: "",
      comentario: "",
      comentarioPaciente: ""
    });

    this.form.reset();

    this.cerrarOutput.emit(false);
  }

  cerrarActualizar() {
    // this.mostrar = false;
    // console.log(this.mostrar)
    this.form.setValue({
      edad: "",
      temperatura: "",
      presion: "",
      comentario: "",
      comentarioPaciente: ""
    });

    this.form.reset();

    this.cerrarActualizarOutput.emit(false);
  }

  terminarTurno() {
    const { edad, temperatura, presion, comentario } = this.form.value;

    let resenia = {
      edad: edad,
      temperatura: temperatura,
      presion: presion,
      comentario: comentario,
      adicional: this.listaDinamicos
    }

    this.turnoService.updateResenia(this.turno, resenia).then(res => {
      this.cerrarActualizar();
    }).catch(err => console.log(err));
  }

  terminarPaciente() {
    const { comentarioPaciente } = this.form.value;

    let reseniaPaciente = {
      comentario: comentarioPaciente
    }

    this.turnoService.updateReseniaPaciente(this.turno, reseniaPaciente).then(res => {
      this.cerrarActualizar();
    }).catch(err => console.log(err));
  }

  onAgregarDatos(){
    this.listaDinamicos.push({propiedad:"",valor:""});    
    
  }
}
