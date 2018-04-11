import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy} from '@angular/core';
import {format, addDays, isToday, startOfDay, endOfDay} from "date-fns"
import {UsersPlaceline} from "ht-client";
import {IUserPlaceline} from "ht-models";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'ht-placeline-date',
  templateUrl: './placeline-date.component.html',
  styleUrls: ['./placeline-date.component.scss']
})
export class PlacelineDateComponent implements OnInit, OnDestroy {
  @Input() placelineClient: UsersPlaceline;
  date: string;
  @Input() disableNext: boolean;
  @Input() disablePrevious: boolean;
  @Output() onChangeDate: EventEmitter<string> = new EventEmitter();
  @ViewChild('datepick') datePicker;
  @Input() isMobile: boolean;
  loading: boolean = false;
  options = {
    isRight: false,
    datePicker: true
  };
  isActive;
  sub: Subscription;
  constructor(private ref: ChangeDetectorRef) {

  }

  get isoDate() {
    return new Date(this.date)
  }

  ngOnInit() {
    if (this.placelineClient) {
      this.sub = this.placelineClient.data$.subscribe((user: IUserPlaceline) => {
        if (user) {
          this.date = this.getDate(user);
          this.disableNext = this.date ? isToday(this.date) : false;
        }

      })
    }
  };

  private getDate(user: IUserPlaceline): string | null {
    if (user.min_recorded_at) {
      return new Date(user.min_recorded_at).toISOString()
    } else {
      return null
    }
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.buildDatepicker();
    // })

  }

  changeDate(date: string, offset: number = 0) {
    if(this.disableNext && offset > 0) return false;
    if(this.disablePrevious && offset < 0) return false;

    let newDate = addDays(date, offset);
    // let newDate = moment(date).add(offset, 'day').format('YYYY-MM-DD');
    // console.log(nda, date,addDays(date, offset), offset);
    const query = {
      "min_recorded_at": startOfDay(newDate).toISOString(),
      "max_recorded_at": endOfDay(newDate).toISOString()
    };
    this.placelineClient.setQuery(query);
    // this.onChangeDate.next(newDate);
    this.isActive = false;
  }

  ngOnDestroy() {
    this.placelineClient.setQuery({});
    if (this.sub) this.sub.unsubscribe();
  }
}
