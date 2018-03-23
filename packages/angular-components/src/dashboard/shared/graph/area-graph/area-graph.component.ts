import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {area, line} from "d3-shape";
import {scaleTime, scaleLinear} from "d3-scale";
import {select} from "d3-selection";
import {axisBottom, axisLeft} from 'd3-axis';
import {mouse as d3Mouse} from 'd3-selection';
import {BroadcastService} from "../../../core/broadcast.service";
import {Subscription} from "rxjs/Subscription";
import {DateString} from "../../../../utils/date-string";

@Component({
  selector: 'area-graph',
  templateUrl: 'area-graph.component.html',
  styleUrls: ['area-graph.component.less']
})
export class AreaGraphComponent implements OnInit {
  @Input() graphData: any;

  @Input() dataset: Array<any>;
  @Input() areaFill: string;

  private host;
  private svg;
  private width;
  private height;
  private graphLoaded: boolean;
  private dimensions: any = {};
  private guide: any;
  private scale: any;
  private tooltip: any;
  private focus: any;
  subs: Subscription[] = [];
  constructor(
    private element: ElementRef,
    private broadcast: BroadcastService,
  ) {
    this.setupMouseEventBrodcaster();
  }

  ngOnInit() {
    this.host = select(this.element.nativeElement);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  setupMouseEventBrodcaster() {
    let sub1 = this.broadcast.on('mousemove').subscribe((point) => {
      this.interactiveGuideMotion(point)
    });
    let sub2 = this.broadcast.on('mouseover').subscribe(() => {
      this.showGuide()
    });
    let sub3 = this.broadcast.on('mouseout').subscribe(() => {
      this.hideGuide()
    });
    this.subs.push(sub1, sub2, sub3)
  }

  ngAfterViewInit() {
    if (!this.graphLoaded) {
      this.buildGraph();
    }
  }

  /* Will Update on every @Input change */
  ngOnChanges(): void {
    if (!this.graphData || !this.element.nativeElement) return;
    if(!this.host) this.host = select(this.element.nativeElement);
    this.buildGraph();
  }

  sortDescending(a, b) {
    return b - a;
  }

  interactiveGuideMotion(mouseX) {
    let index = this.graphData.getIndexPosition(mouseX);
    if (index < 0) index = 0;
    let xAxis = this.graphData.xAxis;
    let xValue = xAxis[index];
    let xPos = this.scale.x(xValue);

    let yValues = this.graphData.getDataSetYValues(xValue, this.graphData.dataSets);
    let maxYValue = yValues.map(v => v.y).sort(this.sortDescending)[0];
    this.guide
      .attr("x1", xPos)
      .attr("x2", xPos)
      .attr("y1", this.scale.y(maxYValue))
      .attr("y2", this.dimensions.height);
    let leftPos = (xPos + this.dimensions.margin.left + 9);
    if (leftPos > (this.dimensions.width / 2)) {
      leftPos = leftPos - 160;
      this.tooltip.attr('class', 'flex-row graph-tooltip left');
    } else {
      this.tooltip.attr('class', 'flex-row graph-tooltip right');
    }
    leftPos = leftPos + "px";
    let tooltipTop = (this.scale.y(maxYValue) + this.dimensions.margin.top - 9);
    tooltipTop = Math.min(tooltipTop, 158);
    this.tooltip.style('top', `${tooltipTop}px`).style("left", leftPos);
    let tooltipText = this.createToolTipText(yValues, xValue);
    this.tooltip.select('.tooltip-text').html(tooltipText);
  }

  createToolTipText(yValues, xValue) {
    return `
      <div class="text-left flex-column">
        <div style="white-space: nowrap;" class="x-value">${DateString(xValue.toISOString(), 'short')}</div>
        <div>
          ${this.createYValuesDiv(yValues)}
        </div>
      </div>`;
  }

  createYValuesDiv(yValues) {
    let divs = '';
    yValues.forEach((yValue) => {
      let computedY = (yValue.labelY === 0 || yValue.labelY > 0) ? yValue.labelY : yValue.y;
      let yValueLabel = `${yValue.label || ''}: ${computedY}`;
      let div = `
        <div class="y-value-container">
          <div class="y-value-legend" style="background: ${yValue.fill}"></div>
          <div class="y-value-label">${yValueLabel}</div>
        </div>
      `;
      divs = divs + div;
    });
    return divs;
  }

  buildGraph() {
    if (!this.graphData) return;
    this.graphLoaded = true;
    // let parseTime = timeParse("%d-%b-%y");
    // this.dataset.forEach(function(d) {
    //   d.date = parseTime(d.date);
    //   d.close = +d.close;
    // });
    // let otherDataset = this.dataset.map((d) => {
    //   let dClose = d.close;
    //   let close = dClose > 300 ? dClose - 220 : dClose - 50;
    //   return {
    //     date: d.date,
    //     close: close
    //   }
    // });
    // Set dimensions for graph
    let dimensions = this.setGraphDimensions();
    this.dimensions = dimensions;
    // set the ranges
    let scale = this.setScale(this.dimensions, this.graphData.domainX, this.graphData.domainY);
    this.scale = scale;
    // define the area
    let d3Area= this.defineArea(this.scale, this.dimensions);
    // append the svg object to the body of the page
    let svg = this.appendSVGToBody(dimensions);
    this.appendAreaToSvg(svg, this.graphData.dataSets, d3Area);
    // Append Axis to SVG
    this.appendAxisToSVG(svg, dimensions, scale);
    this.appendFocusDotsToSVG(svg);
    this.appendGuideToSVG(svg);
    this.appendRectOverlayToSVG(svg);
    this.appendToolTip();
  }

  appendFocusDotsToSVG(svg) {
    this.focus = [];
    this.graphData.dataSets.forEach(() => {
      let focusDot = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");
      focusDot.append("circle")
        .attr("r", 4.5);
      this.focus.push(focusDot);
    });

  }

  appendRectOverlayToSVG(svg) {
    let rect = svg.append("rect");
      rect.attr("class", "rect")
      .attr("width", this.dimensions.width)
      .attr("height", this.dimensions.height)
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
        let mouseX = this.scale.x.invert(mouse[0]);
        this.broadcast.emit('mousemove', mouseX);
      });
  }

  appendAxisToSVG(svg, dimensions, scale) {
    // x Axis
    svg.append("g")
      .attr("transform", "translate(0," + dimensions.height + ")")
      .attr("id", "xAxis")
      .call(axisBottom(scale.x));

    svg.append("g")
      .attr("transform", "translate(0, 0)")
      .attr("id", "yAxis")
      .call(axisLeft(scale.y))
      .style("display", "none");
  }

  appendToolTip() {
    this.tooltip = this.host.append('div').attr('class', 'flex-row graph-tooltip right').style("display", "none");
    this.tooltip.append("div")
      .attr('class', 'auto text-center tooltip-text');
  }

  appendSVGToBody(dimensions) {
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    this.host.html('');
    return this.host.append('svg')
      .attr("width", this.getContainerDimensions(dimensions).width)
      .attr("height", this.getContainerDimensions(dimensions).height)
      .append("g")
      .attr("transform",
        "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");
  }

  appendGuideToSVG(svg) {
    this.guide = svg.append('line').attr('class', 'guide');
    this.guide
      .attr("x1", 20)
      .attr("x2", 20)
      .attr("y1",0)
      .attr("y2", this.dimensions.height)
      .style("display", "none");
  }

  appendAreaToSvg(svg, dataSets, area) {
    // add the area
    dataSets.forEach((dataSet) => {
      svg.append("path")
        .data([dataSet.data])
        .attr("class", "area")
        .attr("style", `fill: ${dataSet.fill}`)
        .attr("d", area);
    });
  }

  setGraphDimensions() {
    let margin = {top: 20, right: 40, bottom: 10, left: 40};
    return {
      margin: margin,
      width: this.element.nativeElement.clientWidth - margin.left - margin.right,
      height: 230 - margin.top - margin.bottom
    };
  }

  setScale(dimensions, domainX, domainY) {
    // scale the range and domain of the data
    return {
      x: scaleTime()
        .domain(domainX)
        .range([0, dimensions.width]),
      y: scaleLinear()
        .domain(domainY)
        .range([dimensions.height, 0])
    }
  }

  defineArea(range, dimensions) {
    return area()
      .x(function(data: any) {
        return range.x(data.x);
      })
      .y0(dimensions.height)
      .y1(function(data: any) {
        return range.y(data.y);
      });
  }

  showGuide() {
    this.guide.style('display', null);
    this.tooltip.style('display', null);
    //this.focus.style('display', null);
  }

  hideGuide() {
    this.guide.style('display', 'none');
    this.tooltip.style('display', 'none');
    //this.focus.style('display', 'none');
  }

  getContainerDimensions(dimensions) {
    // Calculate container dimension with axis dimensions
    let yAxisHeight = 20;
    let xAxisHeight = 0;
    return {
      width: dimensions.width + dimensions.margin.left + dimensions.margin.right + xAxisHeight,
      height: dimensions.height + dimensions.margin.top + dimensions.margin.bottom + yAxisHeight
    }
  }
}
