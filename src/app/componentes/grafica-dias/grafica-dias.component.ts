import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { DataService } from 'src/app/servicios/data.service';

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
}
