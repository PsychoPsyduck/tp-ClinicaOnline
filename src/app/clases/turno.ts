import { Especialidad } from './especialidad';
import { ThrowStmt } from '@angular/compiler';
import { Usuario } from './usuario';

export class Turno
{
    public medico: Usuario;
    public duracion: number;
    public fecha: string;
    public horario: string;
    public especialidad: string; 
    public resenia: string;
    public paciente: string;
    public estado: string;

    constructor(medico: Usuario, duracion: number, fecha: string, horario: string, especialidad: string, resenia: string, paciente: string, estado: string) {
        this.medico = medico;
        this.duracion = duracion;
        this.fecha = fecha;
        this.horario = horario;
        this.especialidad = especialidad;
        this.resenia = resenia;
        this.paciente = paciente;
        this.estado = estado;
    }
}