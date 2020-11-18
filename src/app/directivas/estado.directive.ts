import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEstado]'
})
export class EstadoDirective {

  constructor(elementRef: ElementRef, renderer: Renderer2) { 

    setTimeout(function(){ 

      switch (elementRef.nativeElement.textContent) {
        case "Pendiente":
          renderer.setStyle(elementRef.nativeElement, 'color', 'gold');
          break;
        case "Aprobado":
          renderer.setStyle(elementRef.nativeElement, 'color', 'chartreuse');
          break;
        case "Atendido":
          renderer.setStyle(elementRef.nativeElement, 'color', 'cornflowerblue');
          break;
        case "Finalizado":
          renderer.setStyle(elementRef.nativeElement, 'color', 'blue');
          break;
        case "Rechazado":
          renderer.setStyle(elementRef.nativeElement, 'color', 'red');
          break;
      }

    }, 300);
    

  }

}

// Estados: 
// 0 - pendiente
// 1 - aprobado
// 2 - atendido
// 3 - finalizado
// 5 - rechazado