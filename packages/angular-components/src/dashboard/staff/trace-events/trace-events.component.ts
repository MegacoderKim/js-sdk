import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as _ from "underscore";
import {Subject} from "rxjs/Subject";
import {HtQuerySerialize} from "../../../utils/query-serializer";
import {PageService} from "../../core/page.service";
import {EventTraceService, IDebugPolylines} from "../event-trace.service";
import {BroadcastService} from "../../core/broadcast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {config} from "../../config";
import {HttpClient} from "@angular/common/http";
import {ISdkEvent, GetEventColor} from "../interfaces";
import {format} from "date-fns";

@Component({
  selector: 'app-trace-events',
  templateUrl: './trace-events.component.html',
  styleUrls: ['./trace-events.component.less']
})
export class TraceEventsComponent {
  @ViewChild('isoStart') isoStart;
  @ViewChild('isoEnd') isoEnd;
  @ViewChild('dateStart') dateStart;
  @ViewChild('dateEnd') dateEnd;
  @ViewChild('primary') input;
  inputQuery = {};
  events: string[];
  eventColor = GetEventColor;
  selectedEvents = [
    'stop.started',
    'stop.ended',
    'location.changed',
    'activity.started',
    'activity.ended'
  ];
  userId$;
  eventsFilter = new BehaviorSubject(this.selectedEvents);
  primaryQuery = new Subject();
  subs = [];
  primaryQueryType: string = 'user_id';
  primaryQueryTypes = [
    'action_id',
    'activity_id',
    'user_id',
  ];
  loading: boolean;
  showISO: boolean = false;
  noISODateStart;
  noISODateEnd;
  debugPolyline: IDebugPolylines | null = null;
  currentEvents: ISdkEvent[] | null = null;
  filteredEvents: ISdkEvent[] | null = null;
  showEvents: boolean = false;
  $dateRange;
  showDevice: boolean = false;
  constructor(
    private page: PageService,
    public eventTraceService: EventTraceService,
    private http: HttpClient,
    private broadcast: BroadcastService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.events = this.eventTraceService.events;
  }

  setUserId() {
    // // this.userId = this.primaryQueryType == 'user_id' && this.input.nativeElement ? this.input.nativeElement.value : null;
    // // console.log(this.userId);
    // setTimeout(() => {
    //   if(this.primaryQueryType == 'user_id' && this.input.nativeElement) {
    //     this.userId = this.input.nativeElement.value;
    //
    //   } else if(this.primaryQueryType == 'action_id' && this.input.nativeElement) {
    //     this.http.get(`app/actions/${this.input.nativeElement.value}/`, this.adminReqOpt()).subscribe((action: IAction) => {
    //       console.log(action);
    //       this.userId = action.user.id
    //     })
    //   }
    // }, 10)

  }

  ngOnInit() {
    this.userId$ = this.route.params.pluck('user_id');
    let sub = this.broadcast.on('reset-map').debounceTime(200).subscribe(() => {
      this.eventTraceService.setBounds();
    });

    let query$ = this.primaryQuery.filter(query => !!_.values(query)[0]).map(query => {
      this.clear();
      return this.getPrimaryQuery(query)
    }).filter(data => !!data).withLatestFrom(this.eventsFilter.map((events) => {
      return {type: events.toString()}
    })).map(([primaryQuery, eventQuery]) => {
      console.log(primaryQuery, eventQuery, "mid quer");
      return {...eventQuery, ...primaryQuery}
    });

    let sub2 = query$.switchMap((query) => {
      console.log("final", query);
      setTimeout(() => {
        this.loading = true;
      })
      this.fillRoute({...query});
      let string = HtQuerySerialize(query);
      // console.log(this.isoStart, "iso view child");
      // return Observable.of([])
      return this.page.all(`app/v1/sdk_data/?ordering=recorded_at&${string}`, () => {}, this.adminReqOpt())
    }).map((events: ISdkEvent[]) => {
      return this.eventTraceService.processEvents(events)
    })
      .subscribe((events: ISdkEvent[]) => {
      this.loading = false;
      this.currentEvents = events;
      this.filteredEvents = events;
      this.renderEvents(events);
      setTimeout(() => {
        this.eventTraceService.setBounds();
      }, 10)
    });

    let sub3 = this.eventsFilter.filter(() => !!this.currentEvents).subscribe((events: string[]) => {
      this.filteredEvents = this.getFilteredEvents(this.currentEvents);
      this.renderEvents(this.filteredEvents)
    });

    this.subs.push(sub, sub2, sub3)
  };

  setEventType(event) {
    if(this.selectedEvents.indexOf(event) > -1) {
      this.selectedEvents = _.reject(this.selectedEvents, (currentEvent) => currentEvent == event)
    } else {
      this.selectedEvents.push(event);
    }
    this.eventsFilter.next(this.selectedEvents)
  }

  setPrimaryQueryType(type) {
    this.primaryQueryType = type;
    this.setQueryFromInputQuery(type)
  }

  setQueryFromInputQuery(type) {
    let value = this.inputQuery[type];
    this.setInput(value);
  }

  setPrimaryQuery(value = "") {
    if(!value) return false;
    let query = {[this.primaryQueryType]: value};
    this.inputQuery = {...this.inputQuery, ...query};
    this.primaryQuery.next(query)
  }

  setPolyline(encodedPolyline: string, type: string) {
    if(!encodedPolyline) return false;
    this.eventTraceService.renderPolyline(encodedPolyline, type)
  }

  getPrimaryQuery(query) {
    if(this.primaryQueryType == 'action_id') {
      this.fetchActionPolyline(query)
    }
    if(this.primaryQueryType == 'activity_id' || this.primaryQueryType === 'trip_id') {
      this.fetchTripPolyline(query)
    }
    if(this.primaryQueryType == 'user_id') {
      let startEnd = this.getStartEnd();
      return {...query, min_recorded_at: startEnd.start, max_recorded_at: startEnd.end}
    } else {
      return query
    }
  };

  getStartEnd(): {start: string, end: string} | null {
    let start;
    let end;
    if(this.showISO) {
      start = this.isoStart.nativeElement.value;
      end = this.isoEnd.nativeElement.value;
    } else {
      const startString = this.dateStart.nativeElement.value;
      const endString = this.dateEnd.nativeElement.value;
      const startTimeStamps = startString.split(',')
      const endTimeStamps = endString.split(',')
      start = new Date(+startTimeStamps[0], +startTimeStamps[1] - 1, +startTimeStamps[2], +startTimeStamps[3], +startTimeStamps[4]).toISOString();
      end = new Date(+endTimeStamps[0], +endTimeStamps[1] - 1, +endTimeStamps[2], +endTimeStamps[3], +endTimeStamps[4]).toISOString();
    }
    if(!(start && end)) return null;
    return {start, end}
  }

  selectEvents(events: string[]) {
    this.selectedEvents = events;
    this.eventsFilter.next(this.selectedEvents)
  }

  ngAfterViewInit() {
    // this.$dateRange = $('input[name="daterange"]');
    // $('input[name="daterange"]').daterangepicker({
    //   timePicker: true,
    //   autoUpdateInput: false,
    //   timePickerIncrement: 30,
    // });
    //
    // $('input[name="daterange"]').on('apply.daterangepicker', (ev, picker) => {
    //   this.setDateRange(picker.startDate.toISOString(), picker.endDate.toISOString());
    //   $('input[name="daterange"]').val(picker.startDate.format('DD/MM/YYYY  h:mm A') + ' - ' + picker.endDate.format('DD/MM/YYYY  h:mm A'));
    // });

    let params = this.route.snapshot.params;
    this.fillParams(params);
    this.setUserId()
  }

  setDateRange(start, end) {
    this.noISODateEnd = end;
    this.noISODateStart = start
  }

  hoverEvent(event) {
    this.eventTraceService.focusEvent(event)
  }

  ngOnDestroy() {
    _.each(this.subs, sub => sub.unsubscribe())
  }

  private getFilteredEvents(events: ISdkEvent[]) {
    let filteredEvents = _.filter(events, (event: ISdkEvent) => {
      return this.selectedEvents.indexOf(event.type) > -1
    });
    return filteredEvents;
  }

  private renderEvents(events: ISdkEvent[]) {
    let filteredEvents = _.filter(events, (event: ISdkEvent) => {
      return !!event.location && !!event.location.geojson && !!event.location.geojson.coordinates
    });
    this.eventTraceService.traceEvents(filteredEvents)
  }

  private fetchActionPolyline(query: any) {
    let id = query['action_id'];
    this.http.get(`app/v1/actions/${id}/polyline/`, this.adminReqOpt()).subscribe((polylines: IDebugPolylines) => {
      this.setDebugPolyline(polylines)
    })
  }

  private fetchTripPolyline(query: any) {
    let id = query['activity_id'] || query['trip_id'];
    this.http.get(`app/v1/trips/${id}/polyline/`).subscribe((polylines: IDebugPolylines) => {
      this.setDebugPolyline(polylines)
    })
  }

  private clear() {
    this.eventTraceService.clear();
    this.debugPolyline = null;
    this.currentEvents = null;
    this.filteredEvents = null;
    this.showEvents = false;
  }

  private setDebugPolyline(polylines: IDebugPolylines) {
    this.debugPolyline = polylines
  }

  private adminReqOpt() {
    return {headers: {'Authorization': `token ${config.adminToken}`}}
  }

  private fillParams(params) {
    this.setInputQuery(params);
    // if(params['action_id']) {
    //   this.primaryQueryType = 'action_id'
    // } else if(params['activity_id']) {
    //
    // } else if(params['user_id'] && params['min_recorded_at'] && params['max_recorded_at']) {
    //
    // }
    if(params['min_recorded_at'] && params['max_recorded_at']) {
      // setTimeout(() => {
      //   this.showISO = true;
      // });
      const startString = params.min_recorded_at;
      const endString = params.max_recorded_at;
      this.isoStart.nativeElement.value = params.min_recorded_at;
      this.isoEnd.nativeElement.value = params.max_recorded_at;
      this.dateStart.nativeElement.value = format(startString, 'YYYY,MM,DD,HH,MM');
      this.dateEnd.nativeElement.value = format(endString, 'YYYY,MM,DD,HH,MM')
      //todo fill dateStart and end
    }
    let queryType = _.find(this.primaryQueryTypes, (type) => {
      return !!params[type]
    });
    if(queryType) {
      let primaryValue = params[queryType];
      this.setInput(primaryValue);
      this.primaryQueryType = queryType;
      this.setPrimaryQuery(primaryValue)
    }
  }

  private setInputQuery(query) {
    this.inputQuery = {...this.inputQuery, ...query}
  }

  private setInput(value) {
    this.input.nativeElement.value = value;
  }

  private fillRoute(query) {
    if(query['type']) delete query.type;
    console.log(query, "fill query");
    // this.router.navigate([query], {relativeTo: this.route})
  }
}

