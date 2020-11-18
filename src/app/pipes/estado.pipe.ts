import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(estado: string): string {
    
    switch (estado) {
      case "0":
        return "Pendiente"
      case "1":
        return "Aprobado"
      case "2":
        return "Atendido"
      case "3":
        return "Finalizado"
      case "5":
        return "Rechazado"
    }
  }
}

// Estados: 
// 0 - pendiente
// 1 - aprobado
// 2 - atendido
// 3 - finalizado
// 5 - rechazado