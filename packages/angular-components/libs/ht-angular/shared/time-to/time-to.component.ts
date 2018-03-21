import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {timer} from "rxjs/observable/timer";
import {map, tap} from "rxjs/operators";
import {HMString} from "ht-utility";

@Component({
  selector: 'ht-time-to',
  templateUrl: './time-to.component.html',
  styleUrls: ['./time-to.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeToComponent implements OnInit, AfterViewInit {
  @Input() time: string;
  timeTo$;
  constructor(
    public cd: ChangeDetectorRef
  ) {
    // this.cd.detach()
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.timeTo$ = timer(0, 20000).pipe(
      map((_) => {
        if (this.time) {
          const minutes = (new Date(this.time).getTime() - new Date().getTime()) / (60 * 1000);
          return HMString(minutes)
        } else {
          return "--"
        }

      }),
      tap(() => {
        this.cd.detectChanges()
      })
    )
  }

}
