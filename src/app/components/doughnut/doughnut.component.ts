import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: []
})
export class DoughnutComponent implements OnInit {
  @Input() grafico:any;

  public doughnutChartLabels
  public doughnutChartData  
  public doughnutChartType  

  constructor() { 
    
  }
  
  ngOnInit() {
    console.log(this.grafico)
    this.doughnutChartLabels = this.grafico.labels;
    this.doughnutChartData = this.grafico.data;
    this.doughnutChartType = this.grafico.type;
  }

}
