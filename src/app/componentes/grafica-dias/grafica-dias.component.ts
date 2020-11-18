import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { DataService } from 'src/app/servicios/data.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-grafica-dias',
  templateUrl: './grafica-dias.component.html',
  styleUrls: ['./grafica-dias.component.css']
})
export class GraficaDiasComponent implements OnInit {

  listaEntradas;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
        datalabels: {
            anchor: 'end',
            align: 'end',
        }
    }
  };
  public barChartLabels: Label[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27], label: 'Series B' }
  ];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAll2("entradas").subscribe(res => {
      this.listaEntradas = res;

      this.listaEntradas.forEach(element => {
        let date = element.fecha;
        var dateParts = date.split("/");
        var dateParse = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 
        let newDate = new Date(dateParse);
        console.log(newDate);

      });
    });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
        Math.round(Math.random() * 100),
        59,
        80,
        (Math.random() * 100),
        56,
        (Math.random() * 100),
        40];
  }

  export() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

  exportExcel() {
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Listado de ingresos',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    let lista = []

    this.listaEntradas.forEach(element => {
      let data = {
        nombre: element.usuario.nombre,
        apellido: element.usuario.apellido,
        mail: element.usuario.mail,
        dias: element.usuario.dia.toString(),
        ingreso: element.fecha
      }
      lista.push(data)
    });

    const csvExporter = new ExportToCsv(options);
 
    csvExporter.generateCsv(lista);
  }
}


// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// public SavePDF2(): void {
//   const doc = new jsPDF();

//   doc.text('Hello world!', 10, 10);
//   doc.save('hello-world.pdf');
// }