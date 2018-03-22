import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import * as _ from "underscore";
import {Subject} from "rxjs/Subject";
import {HtQuerySerialize} from "../../../utils/query-serializer";
import {PageService} from "../../core/page.service";
import {EventTraceService, GetEventColor, IDebugPolylines, ISdkEvent} from "../event-trace.service";
import {BroadcastService} from "../../core/broadcast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {config} from "../../config";
import {HttpClient} from "@angular/common/http";
import {IAction} from "ht-models";

@Component({
  selector: 'app-trace-events',
  templateUrl: './trace-events.component.html',
  styleUrls: ['./trace-events.component.less']
})
export class TraceEventsComponent implements OnInit, AfterViewInit {
  @ViewChild('isoStart') isoStart;
  @ViewChild('isoEnd') isoEnd;
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
  _primaryQueryTypes1 = [
    'action_id',
    'trip_id',
    'user_id',
  ];
  _primaryQueryTypes2 = [
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
  newData: boolean = true;
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

  get _primaryQueryTypes() {
    return this.newData ? this._primaryQueryTypes2 : this._primaryQueryTypes1;
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
      this.loading = true;
      this.fillRoute({...query});
      let string = HtQuerySerialize(query);
      // console.log(this.isoStart, "iso view child");
      // return Observable.of([])
      let api = this.newData ? "sdk_data" : "sdk_events";
      return this.page.all(`app/${api}/?ordering=recorded_at&${string}`, () => {}, this.adminReqOpt())
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
      let start;
      let end;
      if(this.showISO) {
        start = this.isoStart.nativeElement.value;
        end = this.isoEnd.nativeElement.value;
      } else {
        start = this.noISODateStart;
        end = this.noISODateEnd;
      }
      if(!(start && end)) return null;
      return {...query, min_recorded_at: start, max_recorded_at: end}
    } else {
      return query
    }
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
    this.http.get(`app/actions/${id}/polyline/`, this.adminReqOpt()).subscribe((polylines: IDebugPolylines) => {
      this.setDebugPolyline(polylines)
    })
  }

  private fetchTripPolyline(query: any) {
    let id = query['activity_id'] || query['trip_id'];
    this.http.get(`app/trips/${id}/polyline/`).subscribe((polylines: IDebugPolylines) => {
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
      setTimeout(() => {
        this.showISO = true;
      });

      this.isoStart.nativeElement.value = params.min_recorded_at;
      this.isoEnd.nativeElement.value = params.max_recorded_at;
    }
    let queryType = _.find(this._primaryQueryTypes, (type) => {
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

