import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class PaginationComponent implements OnInit {
  @Input() totalCount: number = 200;
  @Input() pageSize: number = 50;
  @Input() hasNext: boolean = true;
  @Input() hasPrevious: boolean = false;
  @Input() currentPage: number;
  @Output() fetchPage: EventEmitter<number> = new EventEmitter();
  pages: number[];
  numberOfPages: number;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = false;
  constructor() {
  }

  ngOnInit() {
    this.numberOfPages = Math.ceil(this.totalCount / this.pageSize);
    this.pages = this.getVisiblePages();
    this.hasNextPage = (this.currentPage < this.numberOfPages);
    this.hasPreviousPage = (this.currentPage > 1);
  }

  /* Will Update on every @Input change */
  ngOnChanges(): void {
    this.numberOfPages = Math.ceil(this.totalCount / this.pageSize);
    this.pages = this.getVisiblePages();
    this.hasNextPage = (this.currentPage < this.numberOfPages);
    this.hasPreviousPage = (this.currentPage > 1);
  }

  onFetchPage(pageNumber: number) {
    if (pageNumber < 1 || pageNumber > this.numberOfPages) return;
    this.fetchPage.emit(pageNumber);
    this.currentPage = pageNumber;
    this.hasNextPage = (this.currentPage < this.numberOfPages);
    this.hasPreviousPage = (this.currentPage > 1);
    this.pages = this.getVisiblePages();
  }

  getVisiblePages() {
      return Array(this.numberOfPages).fill(1).map((n, i) => n + i).filter((i) => {
        if (this.currentPage === 1) {
          return (this.currentPage - i >= -2 );
        } else if (this.currentPage - 1 === i) {
          return true;
        } else if (this.currentPage + 1 === i) {
          return true;
        } else if (this.currentPage === i) {
          return true;
        } else if (this.currentPage === this.numberOfPages) {
          return (this.currentPage - i <= 2);
        }
        return false;
      });
  }
}
