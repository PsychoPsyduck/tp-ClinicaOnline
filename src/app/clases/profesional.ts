import { Especialidad } from './especialidad';
import { Usuario } from './usuario';

import { Dia } from './dia';

export class Profesional extends Usuario{

    public especialidades: Especialidad[];
    public aprobado: boolean;
    public diasAtencion: string[];
    public horasAtencion: string[];
    public dias:Dia[];

    
    constructor( usuario:Usuario, especialidad:Especialidad[] , aprobado :boolean, diasAtencion:string[],
        horasAtencion:string[] ){
        super(usuario.nombre,usuario.apellido,usuario.edad,usuario.mail,usuario.contraseña,usuario.tipo);
        this.especialidades=especialidad;
        this.diasAtencion = diasAtencion;
        this.horasAtencion = horasAtencion;
        if(aprobado != null)
        {
            this.aprobado = aprobado;
        }
        else
        {
            this.aprobado = false;
        }
    }

}{
}