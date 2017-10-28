import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Page} from "ht-models";
import {GetUrlParam} from "ht-utility";

@Component({
  selector: 'ht-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  @Input() pageDate: Page<any>;
  @Input() pageSize: number = 15;
  @Output() fetchPage: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  get currentPage() {
    const preUrl = this.pageDate.previous;
    let page = 1;
    if (preUrl) {
      const prevPage = GetUrlParam('page', this.pageDate.previous) || 1;
      console.log(prevPage);
      page = +prevPage + 1;
    }
    return page
  }

  get pagesCount(): number {
    const count = this.pageDate.count;
    // let rem = count % this.pageSize;
    return Math.ceil(count / this.pageSize)
  }

  get visiblePages() {
    return Array(this.pagesCount).fill(1).map((n, i) => n + i).filter((i) => {
      if (this.currentPage === 1) {
        return (this.currentPage - i >= -2 );
      } else if (this.currentPage - 1 === i) {
        return false;
      } else if (this.currentPage + 1 === i) {
        return true;
      } else if (this.currentPage === i) {
        return true;
      } else if (this.currentPage === this.pagesCount) {
        return (this.currentPage - i <= 2);
      }
      return false;
    });
  }

  onFetchPage(pageNumber: number) {
    console.log(pageNumber);
    if (pageNumber < 1 || pageNumber > this.pagesCount) return;
    this.fetchPage.next(pageNumber);
    // this.fetchPage.emit(pageNumber);
    // this.currentPage = pageNumber;
    // this.hasNextPage = (this.currentPage < this.numberOfPages);
    // this.hasPreviousPage = (this.currentPage > 1);
    // this.pages = this.getVisiblePages();
  }

}
