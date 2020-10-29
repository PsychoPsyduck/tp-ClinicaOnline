import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { slideInAnimation } from 'src/app/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  // terminosCondiciones: boolean;
  img1 = null;
  img2;

  esProfesional = false;
  esAdmin = false;

  master_checked: boolean = false;
  master_indeterminate: boolean = false;
  checkbox_list = [];
  checked_list = [];
  selectedValue;

  usuarios = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'profesional', viewValue: 'Profesional'}
  ];

  usuario: Usuario = new Usuario(this.nombre, this.apellido, 40, this.mail, this.clave, '');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public loginService: LoginService,
    private fb: FormBuilder) {
  }

  

  ngOnInit() {    
    this.checkbox_list = [
      {
        name: "Cardiologo",
        disabled: false,
        checked: false,
        labelPosition: "after"
      }
    ]

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.required],
      clave: ['', Validators.required],
      repitaClave: ['', Validators.required],
      rol: ['', Validators.required],
      especialidad: ['', Validators.required],
      terminosCondiciones: ['']
    });

    this.setUserRolValidators();
  }

  setUserRolValidators() {
    const especialidadControl = this.form.get('especialidad');
    const terminosCondicionesControl = this.form.get('terminosCondiciones');

    this.form.get('rol').valueChanges
      .subscribe(rol => {

        if (rol === 'profesional') {
          especialidadControl.setValidators([Validators.required]);
          terminosCondicionesControl.setValidators(null);
        }

        if (rol === 'admin') {
          especialidadControl.setValidators(null);
          terminosCondicionesControl.setValidators([Validators.required]);
        }

        especialidadControl.updateValueAndValidity();
        terminosCondicionesControl.updateValueAndValidity();
      });
  }

  Volver() {
    this.router.navigate(['/Login']);
  }

  Registrar(event) {
    event.preventDefault();

    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  onFileSelected(event) {
    this.img1 = event.target.files[0];
  }

  seleccionUsuario() {
    const { rol } = this.form.value;

    if (rol == "admin") {
      this.esAdmin = true;
      this.esProfesional = false
    } else {
      this.esAdmin = false;
      this.esProfesional = true
    }
  }

  list_change(){
    let checked_count = 0;
    //Get total checked items
    for (let value of Object.values(this.checkbox_list)) {
      if(value.checked) {
        checked_count++;
        this.checked_list.push(value);
        console.log(checked_count);
      }
    }

    if(checked_count>0 && checked_count<this.checkbox_list.length){
      // If some checkboxes are checked but not all; then set Indeterminate state of the master to true.
      this.master_indeterminate = true;
    }else if(checked_count == this.checkbox_list.length){
      //If checked count is equal to total items; then check the master checkbox and also set Indeterminate state to false.
      this.master_indeterminate = false;
      this.master_checked = true;
    }else{
      //If none of the checkboxes in the list is checked then uncheck master also set Indeterminate to false.
      this.master_indeterminate = false;
      this.master_checked = false;
    }
  }
}
