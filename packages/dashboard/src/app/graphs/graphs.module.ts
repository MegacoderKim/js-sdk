import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import { BarShartComponent } from './bar-chart/bar-chart.component';
import { PieChartLabelComponent } from './pie-chart-label/pie-chart-label.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PieChartComponent,
    BarShartComponent,
    PieChartLabelComponent
  ],
  exports: [
    PieChartComponent,
    BarShartComponent,
    PieChartLabelComponent
  ]
})
export class GraphsModule { }
