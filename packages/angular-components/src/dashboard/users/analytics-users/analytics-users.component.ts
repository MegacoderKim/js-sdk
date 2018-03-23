import {Component, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {IUserAnalytics, IUserAnalyticsPage, IUserListSummary} from "ht-models";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "underscore";
import {HMString} from "../../../utils/hm-string";
import {DistanceLocale} from "../../../utils/distance-locale";
import * as moment from "moment-mini";
import {ContainerService} from "../../container/container.service";
import * as fromRoot from "../../reducers";
import {Store} from "@ngrx/store";
import {BroadcastService} from "../../core/broadcast.service";
import * as fromUser from "../../actions/user";
import {anim} from "../../../utils/animations";
import {UsersListComponent} from "../../container/users-list/users-list.component";
import {config} from '../../config';

@Component({
  selector: 'app-analytics-users',
  templateUrl: './analytics-users.component.html',
  styleUrls: ['./analytics-users.component.less'],
  animations: [
      anim.overlay,
  ]
})
export class AnalyticsUsersComponent extends UsersListComponent implements OnInit {
  selectedUserSegmentId: string | null;
  errorMessage: string | null = null;
  activeSortColumnKey = 'total_duration';
  usersData: IUserAnalyticsPage;
  userDataResult:  FormattedUserAnalytics[];
  userSummaryResult: FormattedUserListSummary;
  dataColumns = [
    {
      label: 'User',
      sortOrder: '-',
      key: 'name'
    },
    {
      label: 'Current status',
      sortOrder: '-',
      key: 'status'
    },
    {
      label: 'Last updated',
      sortOrder: '-',
      key: 'last_heartbeat_at'
    },
    {
      label: 'Distance',
      sortOrder: '-',
      key: 'total_distance'
    },
    {
      label: 'Duration',
      sortOrder: '-',
      key: 'total_duration'
    },
    {
      label: 'Stop duration',
      sortOrder: '-',
      key: 'stop_duration'
    },
    {
      label: 'Location disabled',
      sortOrder: '-',
      key: 'location_disabled_duration'
    },
    {
      label: 'Network offline',
      sortOrder: '-',
      key: 'network_offline_duration'
    },
    // {
    //   label: 'Trips',
    //   sortOrder: '-',
    //   key: 'num_trips'
    // },
    {
      label: 'Actions',
      sortOrder: '-',
      key: 'num_actions'
    },
  ];

  constructor(
      public userService: UserService,
      private router: Router,
      public route: ActivatedRoute,
      private containerService: ContainerService,
      public store: Store<fromRoot.State>,
      public broadcast: BroadcastService,
  ) {
    super(route, broadcast, store, userService);
    //this.getData();
    //this.detailListener();
    //super(route);
  }

  // ngOnInit() {
  //   this.containerService.setEntity('users');
  //   this.containerService.setView('list');
  //   this.listenQueryParams();
  //   super.ngOnInit();
  // }

  ngOnInit() {
    this.containerService.setEntity('users');
    this.containerService.setView('list');
    super.ngOnInit();
    this.fillData();
  }

  handleSorting(key, sortOrder?) {
    if (!key || !!this.errorMessage || !this.usersData || (this.usersData.results && this.usersData.results.length === 0)) return;
    let selectedSortColumn = _.find(this.dataColumns, column => {
      return column.key == key;
    });
    let activeSortColumn = _.find(this.dataColumns, column => {
      return column.key == this.activeSortColumnKey;
    });
    let newSortOrder = '-';
    if (sortOrder) {
      newSortOrder = sortOrder;
    } else if (selectedSortColumn.key === activeSortColumn.key) {
      newSortOrder = this.getReverseSortOrder(activeSortColumn.sortOrder);
    } else {
      newSortOrder = selectedSortColumn.sortOrder;
    }
    this.activeSortColumnKey = key;
    let newOrdering = (newSortOrder === '-') ? `-${key}` : key;
    this.dataColumns = this.dataColumns.map((column) => {
      if (column.key === key) {
        return {
          ...column,
          sortOrder: newSortOrder
        }
      }
      return {...column}
    });
    //this.loading.sort = true;
    this.updatePageQuery({ordering: newOrdering})
    //this.filter.next({ordering: newOrdering, page: 1});
  }
  getReverseSortOrder(sortOrder) {
    if (sortOrder === '+') return '-';
    if (sortOrder === '-') return '+';
  }
  openUser(userId) {
    this.router.navigate(['./', {id: userId}], {relativeTo: this.route, queryParamsHandling: 'preserve'})
  }

  // getQuery() {
  //   return this.store.select(fromRoot.getQueryUserQuery)
  // }

  // getListDateQuery() {
  //   return this.store.select(fromRoot.getQueryUserListDateQuery)
  // }

  // getDateRange() {
  //   return this.store.select(fromRoot.getQueryDateRange)
  // }

  // getListApi(query) {
  //   return this.userService.getUserAnalytics(query)
  // }

  getOrdering$() {
    return this.store.select(fromRoot.getQueryUserSorting)
  }

  // getPageQuery() {
  //   return this.store.select(fromRoot.getQueryUserPageQuery)
  // }

  // updateListData(data: IUserAnalyticsPage) {
  //   this.store.dispatch(new fromUser.SetUserPageData(data))
  // }

  // updatePageQuery(query) {
  //   this.store.dispatch(new fromQuery.UpdateUserPageQueryQueryAction(query))
  // }

  // getSummaryApi(query) {
  //   return this.userService.summary(query)
  // }

  // updateSummaryData(data: IUserListSummary) {
  //   this.store.dispatch(new fromUser.SetUserSummary(data))
  // }

  // getPageData() {
  //   return this.store.select(fromRoot.getUserPageData)
  // }

  // getFirstPageData(pageData) {
  //   if (pageData) {
  //     this.userDataResult = this.formattedUserResultData(pageData.results);
  //   }
  //   super.getFirstPageData(pageData)
  // }

  private fillData() {
    let sub = this.getPageData().subscribe(data => {
      this.items = data;
      this.usersData = data;
      if (data) {
        this.userDataResult = this.formattedUserResultData(data.results);
      }

    });

    let sub2 = this.store.select(fromRoot.getUserSummary).filter(data => !!data).subscribe((data: IUserListSummary) => {
      this.summary = data;
      if (data) {
        this.userSummaryResult = this.formattedSummaryResultData(data, data.num_users);
      }
    });

    let sub3 = this.store.select(fromRoot.getQueryUserSorting).subscribe((orderingObj) => {
      this.orderingObj = orderingObj;
    });

    this.subs.push(sub, sub2, sub3)
  }

  formattedSummaryResultData(summaryData: IUserListSummary | null, totalUsers: number | null) {
    let userString = (totalUsers > 1) ? `users` : `user`;
    let totalUsersDisplay = (summaryData && totalUsers !== null && totalUsers >= 0) ? `Average for ${summaryData.num_users.toLocaleString()} ${userString}` : '—';
    let tripsPerUser = (summaryData && totalUsers !== null && totalUsers) ? this.getRoundedDecimal(summaryData.num_trips / totalUsers) : '—';
    let distancePerUser = (summaryData && summaryData.total_distance && totalUsers !== null && totalUsers) ? this.getRoundedNumber(summaryData.total_distance / totalUsers) : '—';
    let durationPerUser = (summaryData && summaryData.total_duration && totalUsers !== null && totalUsers) ? HMString(summaryData.total_duration / totalUsers, 60) : '—';
    let stopDurationPerUser = (summaryData && summaryData['stop_duration'] && totalUsers !== null && totalUsers) ? HMString(summaryData['stop_duration']  / totalUsers, 60) : '—';
    let locationDisabledPerUser = (summaryData && totalUsers !== null && totalUsers && summaryData.location_disabled_duration != null) ? HMString(summaryData.location_disabled_duration / totalUsers, 60) : '—';
    let networkOfflinePerUser = (summaryData && totalUsers !== null && totalUsers && summaryData.network_offline_duration != null) ? HMString(summaryData.network_offline_duration / totalUsers, 60) : '—';
    let placesPerUser = (summaryData && totalUsers !== null && totalUsers) ? this.getRoundedDecimal(summaryData.num_places/ totalUsers) : '—';
    let actionsPerUser = (summaryData && totalUsers !== null && totalUsers) ? this.getRoundedDecimal(summaryData.num_actions/ totalUsers) : '—';
    return {
      totalUsersDisplay,
      tripsPerUser,
      distancePerUser,
      durationPerUser,
      stopDurationPerUser,
      locationDisabledPerUser,
      networkOfflinePerUser,
      placesPerUser,
      actionsPerUser
    };
  }

  formattedUserResultData(data) {
    if (!data) return [];
    return data.map((user) => {
      let totalDistance = user.total_distance ? this.getRoundedNumber(user.total_distance) : '-';
      let network_unavailable = (user.network_offline_duration !== null && user.network_offline_duration >= 0) ? HMString(user.network_offline_duration, 60) : '—';
      let location_unavailable = (user.location_disabled_duration !== null && user.location_disabled_duration >= 0) ? HMString(user.location_disabled_duration, 60) : '—';
      return {
        ...user,
        network_unavailable_display: network_unavailable,
        location_unavailable_display: location_unavailable,
        total_distance_display: totalDistance,
        total_duration_display: user.total_duration || user.total_duration  === 0 ? HMString(user.total_duration, 60) : "-",
        status_display: {
          text: user.display.status_text,
          isWarning: user.display.is_warning
        },
        last_heartbeat_display: this.getHeartbeatDisplay(user.last_heartbeat_at)
      }
    });
  }

  // getData(query = {}) {
  //   this.currentFilter = {...this.currentFilter, ...query};
  //   return this.userService.getUserAnalytics(this.currentFilter);
  // }
  //
  // getSummaryData(query = {}) {
  //   this.currentSummaryFilter = {...this.currentSummaryFilter, ...query};
  //   return this.userService.getUserListSummary(this.currentSummaryFilter);
  // }
  // getDateRangeQueryFilter(range: IRange) {
  //   return {
  //     min_recorded_at: range.start,
  //     max_recorded_at: range.end
  //   }
  // }
  // fillData(data: IUserAnalyticsPage) {
  //   this.usersData = data;
  //   this.dataResult = data;
  //   this.userDataResult = this.formattedUserResultData(data.results);
  // }
  // fillSummaryData(data: IUserListSummary) {
  //   this.userSummaryResult = this.formattedSummaryResultData(data, data.num_users);
  // }

  getHeartbeatDisplay(heartbeat) {
    if (!heartbeat) return '—';
    let duration = moment().diff(heartbeat, 'seconds');
    return `${HMString(duration, 60)} ago`;
  }

  getRoundedDecimal(number) {
    return number.toFixed(1);
  }

  getRoundedNumber(number) {
    return DistanceLocale(number, config.timezone);
  }


  getSearchQueryFilter(query: string) {
    let _query = !query ? null : query;
    return {search: _query};
  }

  ngOnDestroy() {
    super.ngOnDestroy()
  }

  selectDetailedUser(id) {
    this.store.dispatch(new fromUser.SetUsersMapFilterAction((userMap: IUserAnalytics) => false));
  }

  unselectDetailedUser(id) {
    this.store.dispatch(new fromUser.SetUsersMapFilterAction((userMap: IUserAnalytics) => true));
  }
}

interface FormattedUserListSummary {
  totalUsersDisplay: string,
  tripsPerUser: string,
  distancePerUser: string,
  durationPerUser: string,
  stopDurationPerUser: string,
  locationDisabledPerUser: string,
  networkOfflinePerUser: string,
  placesPerUser: string,
  actionsPerUser: string
}

interface FormattedUserAnalytics extends IUserAnalytics{
  total_distance_display: string,
  total_duration_display: string,
  location_unavailable_display: string,
  network_unavailable_display: string,
  status_display: {
    text: string,
    isWarning: boolean
  },
  last_heartbeat_display: string
}
