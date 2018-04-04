import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective {
  @HostListener('window:scroll')
  scroll(e) {
    console.log(e, "event");
  }
  constructor(el: ElementRef) {
    console.log("el", el);
    el.nativeElement.className = 'sticky'
  }

}
