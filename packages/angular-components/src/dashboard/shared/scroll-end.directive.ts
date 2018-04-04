import {Directive, ElementRef, Input, HostListener} from '@angular/core';
import {BroadcastService} from "../core/broadcast.service";

@Directive({
  selector: '[appScrollEnd]'
})
export class ScrollEndDirective {

  @HostListener('scroll') onScoll() {
    this.onScroll()
  }
  @Input() offset: number = 600;

  body;
  scrollEnd: boolean = false;
  constructor(private el: ElementRef, private broadcast: BroadcastService) {
    this.body = el.nativeElement;
    this.offset = this.offset || 0
  }
  onScroll() {
    let offset = this.body.scrollHeight - this.body.scrollTop - this.body.offsetHeight;
    // console.log(offset);
    let scrollEnd = offset <= this.offset;
    this.broadcast.emit('scroll-end', scrollEnd);
  }

}
