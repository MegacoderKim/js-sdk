import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';
import {HtActionsService} from "ht-angular";
import {Page} from "ht-models";
import {config} from "../../config";

@Component({
  selector: 'app-ttd',
  templateUrl: './ttd.component.html',
  styleUrls: ['./ttd.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TtdComponent implements OnInit {
  start: string = '00:00';
  end: string = '23:59';
  isDirtry: boolean = false;
  rules: any[] = []; 
  @Output() onDelete = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();
  loading: boolean = false;
  loadingDelete: string | null = null;
  constructor(
    private atp: AmazingTimePickerService,
    private cd: ChangeDetectorRef,
    private actionsClient: HtActionsService
  ) { }

  ngOnInit() {
    this.fetchRules()
  }

  fetchRules() {
    this.actionsClient.api.rules({type: "TRACK_THROUGH_THE_DAY"}).subscribe((data: Page<any>) => {
      this.rules = data.results.filter((rule) => (!rule.user || rule.collection_id)).map(rule => this.procRule(rule));
      console.log("rules", this.rules);
      this.cd.detectChanges()
    })
  }

  openStart() {
    const amazingTimePicker = this.atp.open({
      time: this.start
    });
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time, "end");
      this.isDirtry = true;
      this.start = time;
      this.cd.detectChanges()
    });
  }
  openEnd() {
    const amazingTimePicker = this.atp.open({
      time: this.end
    });
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time, "end");
      this.isDirtry = true;
      this.end = time;
      this.cd.detectChanges()
    });
  };

  save() {
    const { minutes, hours, durationInSec} = this.getRuleData();
    this.loading = true;
    this.cd.detectChanges();
    const rule = {
      type: "TRACK_THROUGH_THE_DAY",
      "autocreate_rule": {
        "type": "crontab",
        "crontab": `${minutes} ${hours} * * * *`
      },
      "autocomplete_rule": {
        "type": "timefence",
        "at_label": "created_at",
        "after": durationInSec
      },
    };
    this.actionsClient.api.postRules(rule).subscribe((data) => {
      this.rules.push(this.procRule(data));
      this.onAdd.next(data);
      this.loading = false;
      this.cd.detectChanges()
    }, (err) => {
      console.log(err);
      this.loading = false
    })
  }

  delete(id) {
    this.loadingDelete = id;
    this.cd.detectChanges();
    this.actionsClient.api.deleteRules(id).subscribe((data) => {
      console.log("delete", data);
      this.rules = this.rules.filter((rule) => {
        return rule.id !== id
      });
      this.onDelete.next(id);
      this.cd.detectChanges()
    })
  };

  getTime(time: string): string {
    const { minutesString, hoursString, hours, minutes} = this.minHourString(time);
    let suffix;
    let hours12;
    if (hours > 11 || (hours == 12 && minutes == 0)) {
      hours12 = hours - 12;
      suffix = "pm"
    } else if (hours == 0){
      hours12 = 12;
      suffix = 'am'
    } else {
      hours12 = hours;
      suffix = 'am'
    }
    return `${hours12}:${minutesString} ${suffix}`
  };

  private getRuleData() {
    const { hours, minutes, time } = this.minHourString(this.start, true);
    const endMinHour = this.minHourString(this.end, true);
    let duration = this.getDuration(time, endMinHour.time);
    return {
      minutes,
      hours,
      durationInSec: duration * 60
    }
  }

  private getDuration(startTime: number, endTime: number): number {
    if (startTime <= endTime) {
      return endTime - startTime;
    } else {
      return 24 * 60 - (startTime - endTime);
    }
  }

  private minHourString(time: string, convertToUTC: boolean = false) {
    const timeArray = time.split(":");
    return this.procMinutesHours(timeArray[0], timeArray[1], convertToUTC ? -1 : 0)
  }

  private procRule(rule) {
    const startEnd = this.getRuleStartEnd(rule);
    return {
      id: rule.id,
      ...startEnd
    }
  };

  private getRuleStartEnd(rule) {
    const crontabMinHr = this.getCrontabMinHours(rule);
    const {hoursString, minutesString, minutes, hours, time} = crontabMinHr;
    const string = `${hoursString}:${minutesString}`;
    const durationInSec = rule.autocomplete_rule.after;
    const durationInMin = Math.floor(durationInSec/60);
    const endMinHr = this.getMinHrAfter(time, durationInMin);
    // console.log(rule, endMinHr);
    return {
      start: string,
      end: `${endMinHr.hoursString}:${endMinHr.minutesString}`
    }
  };

  private getMinHrAfter(time, durationInMin: number) {
    const endTimeInMin = (time + durationInMin) % (24 * 60);
    const minutes = endTimeInMin % 60;
    const hoursString = Math.floor(endTimeInMin / 60);
    const minutesString = minutes > 9 ? `${minutes}` : `0${minutes}`;

    return {
      hoursString,
      minutesString,
    }
  }

  private getCrontabMinHours(rule) {
    const crontab = rule.autocreate_rule.crontab;
    const crontabArray = crontab.split(" ");
    return this.procMinutesHours(crontabArray[1], crontabArray[0]);
  };

  private procMinutesHours(hoursString: string, minutesString: string, sign = 1): MinHr {
    let minutes = parseInt(minutesString);
    let hours = parseInt(hoursString);
    let time = (60 * hours + minutes);
    time = !!sign ? (time - (new Date().getTimezoneOffset() * sign)) % (24 * 60) : (time  % (24 * 60));
    time = time >= 0 ? time : (24 * 60 + time);
    minutes = time % 60;
    hours = Math.floor(time / 60);
    minutesString = minutes > 9 ? `${minutes}` : `0${minutes}`;
    return {
      minutesString,
      hoursString: `${hours}`,
      minutes,
      hours,
      time
    }
  }

  // private localToUTC(timeInMin: number) {
  //   var d = new Date(timeInMin * 60 * 1000)
  //   return {
  //     // minutes: d.getU(),
  //   }
  // }
  // private UTCToLocal(timeInMin: number) {
  //   var d = new Date(timeInMin * 60 * 1000)
  //   return {
  //     minutes: d.getU(),
  //   }
  // }

};

interface MinHr {
  minutesString: string,
  hoursString: string,
  minutes: number,
  hours: number,
  time: number
}
