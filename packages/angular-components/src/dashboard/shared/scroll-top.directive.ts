import {Directive, ElementRef} from '@angular/core';
import {BroadcastService} from "../core/broadcast.service";

@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective {
  body;
  constructor(private el: ElementRef, private broadcast: BroadcastService) {
    this.body = el.nativeElement;
    this.broadcast.on('scroll-top').debounceTime(200).subscribe(() => {
      if(this.body.parentElement) this.body.parentElement.scrollIntoView()
    })
  }



}
