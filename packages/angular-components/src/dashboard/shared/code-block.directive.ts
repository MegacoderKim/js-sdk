import {AfterViewInit, Directive, ElementRef} from '@angular/core';
const HighlightJS = require('highlight.js');

@Directive({
  selector: '[appCodeBlock]'
})
export class CodeBlockDirective implements AfterViewInit {

  constructor(
    private elem: ElementRef
  ) { }

  ngAfterViewInit() {
    HighlightJS.highlightBlock(this.elem.nativeElement);
  }

}
