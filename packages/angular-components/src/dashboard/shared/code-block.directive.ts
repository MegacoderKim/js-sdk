import {AfterViewInit, Directive, ElementRef} from '@angular/core';
const HighlightJS = require('../../assets/highlight/highlight.pack.js');

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
