import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroAdmComponent } from './componentes/registro-adm/registro-adm.component';
import { AuthGuard } from './auth/auth.guard';
import { SegundoNuevoRegistroComponent } from './componentes/registro-adm/segundo-nuevo-registro/segundo-nuevo-registro.component';
import { PrimerNuevoRegistroComponent } from './componentes/registro-adm/primer-nuevo-registro/primer-nuevo-registro.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]
  {path: 'registroAdm' , component: RegistroAdmComponent, canActivate: [AuthGuard], children: //, canActivate: [AuthGuard]
      [{path: '' , component: PrimerNuevoRegistroComponent, canActivate: [AuthGuard], data: {animation: 'Usuario'}},
      {path: 'segundo' , component: SegundoNuevoRegistroComponent, canActivate: [AuthGuard], data: {animation: 'Login'}}]
},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
