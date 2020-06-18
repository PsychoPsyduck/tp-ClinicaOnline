export class Usuario{

    public nombre: string;
    public apellido: string;
    public edad: number;
    public mail: string;
    public contraseña: string;
    public id:string;
    public tipo:string;
    public img1:string;
    public img2:string;

    public rol:string; //sacar

    constructor(nombre: string,apellido: string,edad: number,mail: string,contraseña: string, tipos:string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.mail=mail;
        this.contraseña=contraseña;
        this.tipo=tipos;
        
        
    }

}
