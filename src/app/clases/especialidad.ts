export class Especialidad {
    public codigo:string;
    public descripcion:string;
    public duracion:number;
    public activo:boolean;

    constructor(  descripcion:string,activo:boolean,duracion:number,codigo?:string){
        this.descripcion = descripcion;
        this.activo=activo;
        if(codigo){
            this.codigo = codigo;
        }
        if(duracion){
            this.duracion=duracion;
        }else{
            this.duracion=30;
        }
    }
}
