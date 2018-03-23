import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {config} from "../../config";
import * as moment from "moment-mini";
// import {IDateRangePickerOptions} from "ht-angular";
import {format, addDays} from "date-fns"
@Component({
  selector: 'app-placeline-date',
  templateUrl: './placeline-date.component.html',
  styleUrls: ['./placeline-date.component.less']
})
export class PlacelineDateComponent implements OnInit {
  @Input() date: string;
  @Input() disableNext: boolean;
  @Input() disablePrevious: boolean;
  @Output() onChangeDate: EventEmitter<string> = new EventEmitter();
  @ViewChild('datepick') datePicker;
  isMobile: boolean;
  loading: boolean = false;
  options = {
    isRight: false,
    datePicker: true
  };
  isActive
  constructor(private ref: ChangeDetectorRef) {
    this.isMobile = config.isMobile
  }

  get isoDate() {
    return new Date(this.date)
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.buildDatepicker();
    // })

  }

  changeDate(date: string, offset: number = 0) {
    if(this.disableNext && offset > 0) return false;
    if(this.disablePrevious && offset < 0) return false;

    let newDate = format(addDays(date, offset), 'YYYY-MM-DD');
    // let newDate = moment(date).add(offset, 'day').format('YYYY-MM-DD');
    // console.log(nda, date,addDays(date, offset), offset);
    this.onChangeDate.next(newDate);
    this.isActive = false;
  }
}
