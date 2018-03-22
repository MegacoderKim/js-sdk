import {Component, OnInit, Input, ChangeDetectionStrategy} from "@angular/core";
import {pie, arc} from "d3-shape";
import * as _ from "underscore";
import {scaleOrdinal} from "d3-scale";
import {schemeSet2} from "d3-scale-chromatic";
import {Color} from "../../../utils/color";
import {Output} from "@angular/core";
import {EventEmitter} from "@angular/core";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartComponent implements OnInit {
  @Input() radius: number = 70;
  @Input() centerText: string = "test";
  @Input() labelText: string = "";
  @Input() data;
  @Input() thickness: number = 16;
  @Input() isHalf: boolean = false;
  @Output() hoverItem = new EventEmitter();
  @Input() color = scaleOrdinal(schemeSet2);
  zeroColor = Color.grey3;
  isZero: boolean = false;
  paths;

  constructor() { }

  ngOnInit() {
    // this.setPath()
  }

  setPath() {
    if(this.data) {
      var data = _.map(this.data, (item: any) => item.value);
      // var data = [6, 6];
      var count = data.reduce((acc, datum) => acc + datum, 0);
      if(count == 0 ){
        this.isZero = true;
        data = data.map(() => 1)
      } else {
        this.isZero = false;
      }
      var arcs;
      if(this.isHalf) {
        arcs = pie().sort(() => null).startAngle(-Math.PI/2).endAngle( Math.PI/2)(data);
      } else {
        arcs = pie().sort(() => null)(data);
      }

      var d3arc = arc()
          .innerRadius(this.radius - this.thickness)
          .outerRadius(this.radius)
          // .startAngle(Math.PI/2)
          // .endAngle(3 * Math.PI/2)
          .padAngle(Math.PI / 180);


      this.paths = arcs.map(current => {
        // let arcData = {...current, startAngle: current.startAngle/2 - Math.PI/2, endAngle: current.endAngle/2 - Math.PI/2}
        let arcData = {...current}
        return d3arc({
          innerRadius: 3,
          outerRadius: this.radius,
          ...arcData,
        });
      });
    }
  }

  hoverPath(index: number) {
    let item = this.data[index];
    this.hoverItem.next(item)
  }

  hoverOut() {
    this.hoverItem.next(null)
  }

  ngOnChanges() {
    this.setPath()
  }

}
