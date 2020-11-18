import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroAdmComponent } from './componentes/registro-adm/registro-adm.component';
import { AuthGuard } from './auth/auth.guard';
import { PedirTurnoComponent } from './componentes/pedir-turno/pedir-turno.component';
import { SeleccionarTurnoComponent } from './componentes/seleccionar-turno/seleccionar-turno.component';
import { AtenderTurnoComponent } from './componentes/atender-turno/atender-turno.component';
import { TurnoMedicoComponent } from './componentes/turno-medico/turno-medico.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { UsuariosListadoComponent } from './componentes/usuarios-listado/usuarios-listado.component';
import { TurnosListadoComponent } from './componentes/turnos-listado/turnos-listado.component';
import { CartillaComponent } from './componentes/cartilla/cartilla.component';
import { NuevaEspecialidadComponent } from './componentes/nueva-especialidad/nueva-especialidad.component';
import { InformeComponent } from './componentes/informe/informe.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent, children: 
    [{path: '' , component: LoginComponent, data: {animation: 'Usuario'}}, 
    {path: 'registro' , component: RegistroComponent, data: {animation: 'Login'}}] 
  },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'registro' , component: RegistroAdmComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'pedirTurno', component: PedirTurnoComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'turnoMedico', component: TurnoMedicoComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'atencion', component: AtenderTurnoComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'verUsuarios', component: UsuariosListadoComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'verTurnos', component: TurnosListadoComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'verCartilla', component: CartillaComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'nuevaEspecialidad', component: NuevaEspecialidadComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'verTurnosAdm', component: TurnosComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'informe', component: InformeComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
