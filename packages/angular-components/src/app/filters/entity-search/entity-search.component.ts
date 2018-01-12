import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {IPageData} from "ht-models";
import {Subject} from "rxjs/Subject";

@Component({
  selector: 'ht-entity-search',
  templateUrl: './entity-search.component.html',
  styleUrls: ['./entity-search.component.less']
})
export class EntitySearchComponent implements OnInit {
  query$: Subject<string> = new Subject();
  loading;
  @ViewChild('query') input;
  @Input() entity: string = "";
  @Output() onSearchQuery: EventEmitter<object> = new EventEmitter();

  @HostListener('click')
  clickSearch(e) {
    this.input.nativeElement.focus()
  }

  constructor() { }

  ngOnInit() {
    // this.watchChange()
  }

  test(string) {
    this.query$.next(string)
  }

  setSearch(el) {
    const search = el.value;
    el.value = '';
    if (search) this.onSearchQuery.next({search})
  }

}
