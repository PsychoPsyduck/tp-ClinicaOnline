import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { slideInAnimation } from 'src/app/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/servicios/data.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-registro-adm',
  templateUrl: './registro-adm.component.html',
  styleUrls: ['./registro-adm.component.css']
})
export class RegistroAdmComponent implements OnInit {
  
 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  
  form: FormGroup;
  nombre = '';
  apellido = '';
  mail = '';
  clave= '';
  repitaClave= '';
  // logeando=true;

  esProfesional = false;
  esAdmin = false;

  mostrarSalida = false;

  master_checked: boolean = false;
  master_indeterminate: boolean = false;
  checkbox_list = [];
  selectedValue;

  usuarios = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'profesional', viewValue: 'Profesional'}
  ];
  
  dias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  turnoshoras: string[] = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
                          '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];

  turnoSalida: string[] = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
                          '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];

  usuario: Usuario = new Usuario(this.nombre, this.apellido, 40, this.mail, this.clave, '');

  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService,
    private fb: FormBuilder,
    private dataService: DataService) {
      this.Tiempo=5; 
      this.ocultarVerificar=false;
      
      
  }

  ngOnInit() {    
    this.checkbox_list = this.getProfesiones();

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.required],
      clave: ['', Validators.required],
      repitaClave: ['', Validators.required],
      rol: ['', Validators.required],
      especialidad: [[]],
      dia: [[]],
      entrada: [[]],
      salida: [[]],
      terminosCondiciones: ['']
    });

    this.setUserRolValidators();
  }

  setUserRolValidators() {
    const especialidadControl = this.form.get('especialidad');
    const diaControl = this.form.get('dia');
    const terminosCondicionesControl = this.form.get('terminosCondiciones');

    this.form.get('rol').valueChanges
      .subscribe(rol => {
        
        if (rol === 'profesional') {
          especialidadControl.setValidators([Validators.required]);
          diaControl.setValidators([Validators.required]);
          terminosCondicionesControl.setValidators(null);
        }

        if (rol === 'admin') {
          especialidadControl.setValidators(null);
          diaControl.setValidators(null);
          // terminosCondicionesControl.setValidators([Validators.required]);
        }

        especialidadControl.updateValueAndValidity();
        terminosCondicionesControl.updateValueAndValidity();
      });
  }

  Registrar(event) {
    const { nombre, apellido, especialidad, mail, clave, dia, rol, entrada, salida } = this.form.value;
    event.preventDefault();

    console.log("llega")

    let usuario = new Usuario(nombre, apellido, 33, mail, clave, rol);
    usuario.especialidad = especialidad;
    usuario.dia = dia;
    usuario.entrada = entrada;
    usuario.salida = salida;

    console.log(usuario.dia);

    console.log(this.form.valid)

    if (rol == "profesional" && this.form.valid) {
      this.ocultarVerificar=true;
      console.log(this.form.value);
      this.loginService.registroProfesional(usuario).then(res => {
          console.log(res)
      }).catch(err => console.log(err));

      this.repetidor = setInterval(()=>{ 
        this.Tiempo--;
        if(this.Tiempo == 0 ) {
          clearInterval(this.repetidor);
          this.ocultarVerificar=false;
          this.Tiempo=4;
          this.limpiarCampos();
            // this.msjError = "Error al iniciar sesion. Verifique los datos";
        }
      }, 900);
    } else if (rol == "admin" && nombre != "" && apellido != "" && mail != "" && clave != "" && entrada != "" && salida != "") {
      this.ocultarVerificar=true;
      console.log(this.form.value);
      this.loginService.registroProfesional(usuario).then(res => {
          console.log(res)
      }).catch(err => console.log(err));

      this.repetidor = setInterval(()=>{ 
        this.Tiempo--;
        if(this.Tiempo == 0 ) {
          clearInterval(this.repetidor);
          this.ocultarVerificar=false;
          this.Tiempo=4;
          this.limpiarCampos();
            // this.msjError = "Error al iniciar sesion. Verifique los datos";
        }
      }, 900);
    }
  }

  seleccionUsuario() {
    const { rol } = this.form.value;
    // this.setUserRolValidators();
    if (rol == "admin") {
      this.esAdmin = true;
      this.esProfesional = false;
      this.mostrarSalida = false;
    } else {
      this.esAdmin = false;
      this.esProfesional = true;
      this.mostrarSalida = false;
    }
  }

  getProfesiones() {
    return this.dataService.getAll("especialidades");
  }

  limpiarCampos(){
    this.form.setValue({
      nombre: '',
      apellido: '', 
      especialidad: null, 
      mail: '', 
      clave: '',
      repitaClave: '',
      rol: '',
      terminosCondiciones: '',
      dia: null,
      entrada: null,
      salida: null
    });

    this.form.reset();
    this.esAdmin = false;
    this.esProfesional = false;
  }

  seleccionHora(tipo: string) {
    const { entrada, salida } = this.form.value;
    let index;
    // let turnoSalidaAux = this.turnoshoras;

    if(tipo == "entrada") {
      this.turnoshoras.forEach(element => {
        if(element == entrada) {

          index = this.turnoshoras.indexOf(element);
          this.mostrarSalida = true;
          this.llenarArray();
        }
      });
    }

    this.turnoSalida.splice(0, index + 1);
  }

  llenarArray() {
    this.turnoSalida = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00',
    '13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30'];
  }
}
