import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {IPageData} from "../../model/common";
import {UserService} from "../../users/user.service";
import {ActionService} from "../../action/action.service";
import {zip} from "rxjs/observable/zip";
import {debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  term: Subject<string> = new Subject();
  users;
  actions;
  loading: boolean = false;
  resultsCount: number = 3;
  q;
  constructor(
      private userService: UserService,
      private actionService: ActionService,
      private ref: ChangeDetectorRef
  ) {

  }

  ngAfterViewInit() {

    let inputChangesObservuer = this.term
        .pipe(debounceTime(400));

    inputChangesObservuer.subscribe(term => {
      if(term.length) {
        this.loading = true
      } else {
        this.clearDate()
      }
      this.ref.markForCheck();
    });

    let inputChanges = inputChangesObservuer.filter(term => !!term.length);

    const fetch = (term) => zip(
        this.userService.index({search: term, page_size: 3}).do((data: IPageData) => {
          this.users = data;
          this.ref.markForCheck();
        }),
        this.actionService.indexOnDate({lookup_id: term, page_size: 3}).do((data: IPageData) => {
          this.actions = data;
          this.ref.markForCheck();
        })
    )

    inputChanges.pipe(switchMap(term => fetch(term)))
        .subscribe(() => {
        this.loading = false;
      });

    // inputChanges.switchMap(term => this.actionService.index({lookup_id: term, page_size: 3}))
    //     .subscribe((data: IPageData) => {
    //       this.loading = false;
    //       this.actions = data;
    //       this.ref.markForCheck();
    //     });

  }

  ngOnInit() {

  }

  selectDriver(driver) {
    // this.driverService.selectedDriver = driver
  }

  selectFleet(fleet) {
    // this.fleetService.selectedFleet = fleet;
    // if(this.headerService.selected == 'drivers') this.broadcast.emit('range-change')
  };

  selectCustomer(customer) {
    // this.customerService.selectedCustomer = customer;


  }

  selectNeighborhood(neighborhood) {
    // this.neighborhoddService.selectedNeighborhood = neighborhood;
    // if(this.headerService.selected == 'customers') {
    //     this.broadcast.emit('range-change')
    // }
  }

  selectedTask(task) {
    // if(!this.mapService.selectedTrip || this.mapService.selectedTrip.id != trip.id) this.mapService.trace(trip, track);
  }

  clearDate() {
    this.loading = false;
    this.actions = null;
    this.users = null;
  }

  hideTitle(prop: string) {
    return !(this[prop] && this[prop].count > 0)
  }

  noResults() :boolean {
    return (this.actions && this.actions.count == 0 && this.users && this.users.count == 0)
  }

}
