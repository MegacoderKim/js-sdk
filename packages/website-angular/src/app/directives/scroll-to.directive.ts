import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

/**
 * add appScrollTo directive in any html tag, with a id string to add in # url
 * e.g <h1 appScrollTo="title">Title</h1>
 *
 * navigate to the the above html by creating a link
 * <a [routerLink]="[]" fragment="title">Go to title</a>
 */

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective implements OnInit, AfterViewInit {
  id: string;

  constructor(
    private el: ElementRef,
    private route: ActivatedRoute
  ) {

  }

  @Input()
  set appScrollTo(id: string) {
    this.id = id;
  }

  ngOnInit() {

  };

  ngAfterViewInit() {
    let toBring$;
    if (this.route.snapshot.fragment === this.id) {
      setTimeout(() => {
        this.bringToView()
      }, 1000);
      toBring$ = this.route.fragment.skip(1).filter((fragment) => fragment === this.id);
    } else {
      toBring$ = this.route.fragment.filter((fragment) => fragment === this.id);
    }

    toBring$.subscribe((fragment) => {
      if (fragment === this.id) {
        this.bringToView();
      }
    })
  }

  bringToView() {
    setTimeout(() => {
      this.el.nativeElement.scrollIntoView({inline: "nearest"})
    }, 10)


  }

}
