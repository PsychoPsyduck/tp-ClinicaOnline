import { Pipe, PipeTransform } from '@angular/core';
import { Profesional } from '../clases/profesional';

@Pipe({
  name: 'dias'
})
export class DiasPipe implements PipeTransform {

  transform(value: Profesional, ...args: unknown[]): unknown {
    let dias="";
    let entro=false;
    value.dias.forEach(dia=>{
      if(dia.trabaja){
        if(!entro){
          dias+=dia.dia.slice(0,3);
          entro=true;
        }else{
          dias+='/'+dia.dia.slice(0,3);
        }
      }
    })
    return dias;
  }

}