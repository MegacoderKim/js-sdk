import {AfterViewInit, Directive, ElementRef} from '@angular/core';
declare const hljs :any;

@Directive({
  selector: '[appCodeBlock]'
})
export class CodeBlockDirective implements AfterViewInit {

  constructor(
    private elem: ElementRef
  ) { }

  ngAfterViewInit() {
    hljs.highlightBlock(this.elem.nativeElement);
  }

}
