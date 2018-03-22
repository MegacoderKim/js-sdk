import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {axisBottom, axisLeft} from "d3-axis";
import {select} from "d3-selection";
import {scaleBand, scaleLinear, scaleOrdinal, schemeCategory20} from "d3-scale";
import {stack, stackOrderNone} from "d3-shape";
import {max, bisect} from "d3-array";
import * as moment from "moment-mini";
import {mouse as d3Mouse} from 'd3-selection';
import * as _ from "underscore";

import {BroadcastService} from "../../core/broadcast.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarShartComponent implements OnInit {
  @Input() data: BillingGraph[];
  width;
  height;
  group;
  stack;
  xScale;
  yScale;
  color = scaleOrdinal(schemeCategory20);
  tooltip;
  host;
  subs: Subscription[] = [];
  hideFreeCredits: boolean = false;
  constructor(
    private element: ElementRef,
    private broadcast: BroadcastService,
  ) {
    this.setupMouseEventBrodcaster();
  }

  ngOnInit() {
  }

  ngOnChange() {
    this.host = select(this.element.nativeElement);
  }

  ngAfterViewInit(){
    if(this.data) {
      setTimeout(() => {
        this.draw()

      }, 200)
    }
  }

  setupMouseEventBrodcaster() {
    let sub1 = this.broadcast.on('mousemove').subscribe((xPos) => {
      this.interactiveGuideMotion(xPos)
    });
    let sub2 = this.broadcast.on('mouseover').subscribe(() => {
      this.showGuide()
    });
    let sub3 = this.broadcast.on('mouseout').subscribe(() => {
      this.hideGuide()
    });
    this.subs.push(sub1, sub2, sub3)
  }

  showGuide() {
    this.tooltip.style('display', null);
  }

  hideGuide() {
    this.tooltip.style('display', 'none');
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  draw() {
    // let svg = select('#stacked');
    let margin = {top: 20, right: 40, bottom: 30, left: 0};

    this.width = 600 - margin.left - margin.right;
    this.height = 300 - margin.top - margin.bottom;
    // console.log(this.width, this.height);
    // this.group = svg.append("g").attr("transform", );
    this.render()
  }

  appendToolTip() {
    this.host = select(this.element.nativeElement);
    this.tooltip = this.host.append('div').attr('class', 'flex-row graph-tooltip top').style("display", "none");;
    this.tooltip.append("div")
      .attr('class', 'auto text-center tooltip-text');
  }

  get gtransform() {
    let margin = {top: 20, right: 180, bottom: 30, left: 40};
    return "translate(" + margin.left + "," + margin.top + ")"
  }

  render() {
    let stackD = stack()
      .keys(["is_paid_count", "is_unpaid_count"])
      .order(stackOrderNone);
    let data = this.getData();
    let layers = stackD(data);
    this.stack = layers;
    // console.log(data, "data");
    // console.log(layers);
    let x = scaleBand()
        .rangeRound([0, this.width]).paddingInner(0.05)
        .align(0.1);

    x.domain(data.map(function (d: any) {
      return d.date;
    }));

    let y = scaleLinear().rangeRound([this.height, 0]);

    y.domain([0, max(layers[layers.length - 1], (d: any) => {
      return d[1]
    })])
        .nice();
    // console.log(x.bandwidth());
    _.each(this.stack, (s: any) => {
      // console.log(s, "stack");
      _.each(s, (bar: any) => {
        // console.log(bar, "bar");
        // console.log(y(bar[0]), y(bar[1]));
        // console.log(y(bar[0]) - y(bar[1] + bar[0]));
        // console.log(y(bar[1]));
      })
    });
    this.xScale = x;
    this.yScale = y;

    let yAxis = axisLeft(y);
    let xAxis = axisBottom(x);
    select(".y-axis").call(yAxis);
    select(".x-axis").call(xAxis);
    this.appendToolTip();
    let svg = select('#stackedContainer');
    this.appendRectOverlayToSVG(svg, this.width, this.height, x);
  }

  interactiveGuideMotion(xPos) {
    let xScale = this.xScale;
    let paddingInner = this.xScale.paddingInner();
    let leftEdges = this.xScale.range();
    let width = this.xScale.bandwidth() + (this.xScale.bandwidth() * this.xScale.paddingInner());
    let pos = Math.floor((xPos / width));
    if (pos < 0) pos = 0;
    if (pos > (xScale.domain().length - 1)) pos = (xScale.domain().length - 1);
    let xValue = xScale.domain()[pos];
    let xPosition = this.xScale(xValue);
    let xAxisNode: any = select('#y-axis').node();
    let xAxisWidth = xAxisNode ? xAxisNode.getBBox().width : 0;
    let tooltipLeftPos = xPosition;
    let tooltip = this.tooltip;
    let data = this.getData().filter((d) => {
      return (d.date === xValue)
    });
    if (data.length === 1) {
      let yData = data[0];
      let yValues = [{
        label: 'Unbilled',
        y: yData.is_paid_count,
        fill: '#1f77b4'
      },{
        label: 'Free',
        y: yData.is_unpaid_count,
        fill: '#aec7e8'
      }];
      let yDomain = yData.is_unpaid_count + yData.is_paid_count;
      let yHeight = this.yScale(yDomain) - 76;
      let tooltipTop = this.yScale;
      this.tooltip.style('top', `${tooltipTop}px`).style("left", tooltipLeftPos);
      let tooltipText = this.createToolTipText(yValues, xValue);
      this.tooltip.select('.tooltip-text').html(tooltipText);
      tooltip.style("left", `${tooltipLeftPos}px`).style("top", `${yHeight}px`);
    }
  }

  createToolTipText(yValues, xValue) {
    return `
      <div class="text-left flex-column">
        <div style="white-space: nowrap;" class="x-value">${xValue}</div>
        <div>
          ${this.createYValuesDiv(yValues)}
        </div>
      </div>`;
  }

  getNumberLocaleString(num: number) {
    return num.toLocaleString('en-US');
  }

  createYValuesDiv(yValues) {
    let divs = '';
    yValues.forEach((yValue) => {
      let yValueLabel = `${yValue.label || ''}: ${this.getNumberLocaleString(yValue.y)}`;
      let div = `
        <div class="y-value-container">
          <div class="y-value-legend" style="background: ${yValue.fill}"></div>
          <div class="y-value-label">${yValueLabel}</div>
        </div>
      `;
      if (yValue.y) {
        divs = divs + div;
      }
    });
    return divs;
  }

  appendRectOverlayToSVG(svg, width, height, xScale) {
    let rect = svg.append("rect");
    rect.attr("class", "rect")
      .attr("width", width)
      .attr("height", height)
      .attr("style", "fill: transparent");
    rect
      .on('mouseover', () => {
        this.broadcast.emit('mouseover');

      })
      .on('mouseout', () => {
        this.broadcast.emit('mouseout');

      })
      .on('mousemove', () => {
        let mouse = d3Mouse(rect.node());
        let xPos = mouse[0];
        this.broadcast.emit('mousemove', xPos);
      });
  }

  getHeightBar(bar) {
    return this.yScale(bar[0]) - this.yScale(bar[1])
  }

  get xAxisTransform() {
    return "translate(" + 0 + "," + this.height + ")"
  }

  getData(): {[key: string]: number | any}[] {
    let data = this.data;
    let totalFree = 0;
    data.forEach((d) => {
      totalFree = totalFree + (d.count - d.is_paid_count);
    });
    this.hideFreeCredits = (totalFree === 0);
    return data.map(datum => {
      return {is_paid_count: datum.is_paid_count, date: moment(datum.date).format('MMM D'), is_unpaid_count: datum.count - datum.is_paid_count}
    });
  }
}

interface BillingGraph {
  date: string,
  count: number,
  is_paid_count: number,
  is_unpaid_count?: number
}
