import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
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
    this.cd.detectChanges()
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
    const procTime = this.getProcTime(time);
    return `${procTime.hours12}:${procTime.minutesString} ${procTime.suffix}`
  };

  private getRuleData() {
    const { hours, minutes, time } = this.minHourString(this.start);
    let duration;
    const endMinHour = this.minHourString(this.end);

    if (time <= endMinHour.time) {
      duration = endMinHour.time - time;
    } else {
      duration = 24 * 60 - (time - endMinHour.time);
    }
    return {
      minutes,
      hours,
      durationInSec: duration * 60
    }
  }

  private minHourString(time: string) {
    const timeArray = time.split(":");
    const hoursString = timeArray[0];
    const minutesString = timeArray[1];
    const hours = parseInt(hoursString);
    const minutes = parseInt(minutesString);
    return {
      hoursString,
      minutesString,
      hours,
      minutes,
      time: 60 * hours + minutes
    }
  }

  private getProcTime(time: string) {
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
    return {hours, minutes, hours12, suffix, minutesString}
  };

  private procRule(rule) {
    const startEnd = this.getRuleStartEnd(rule);
    return {
      id: rule.id,
      ...startEnd
    }
  };

  private getRuleStartEnd(rule) {
    const crontab = rule.autocreate_rule.crontab;
    const crontabArray = crontab.split(" ");
    const minutesString = crontabArray[0].length > 1 ? crontabArray[0] : `0${crontabArray[0]}`;
    const minutes = parseInt(minutesString);
    const hoursString = crontabArray[1];
    const hours = parseInt(hoursString);
    const string = `${hoursString}:${minutesString}`
    const durationInSec = rule.autocomplete_rule.after;
    const durationInMin = Math.floor(durationInSec/60);
    const endMinutesOffset = (durationInMin % 60);
    let endHoursOffset = Math.floor((durationInMin / 60))
    let endMinutes = endMinutesOffset + minutes;
    // let endHoursOffset = 0;
    if (endMinutes > 59) {
      endHoursOffset = 1 + endHoursOffset;
      endMinutes = endMinutes % 60;
    } else {

    }
    const endHours = (hours + endHoursOffset) % 24
    return {
      start: string,
      end: endMinutes > 9 ? `${endHours}:${endMinutes}` : `${endHours}:0${endMinutes}`
    }
  }

  private getRuleEnd(rule) {
    const crontab = rule.autocreate_rule.crontab;
    const crontabArray = crontab.split(" ");
    const minutesString = crontabArray[0].length > 1 ? crontabArray[0] : `0${crontabArray[0]}`;
    const hoursString = crontabArray[1];
    return `${hoursString}:${minutesString}`
  }

}
