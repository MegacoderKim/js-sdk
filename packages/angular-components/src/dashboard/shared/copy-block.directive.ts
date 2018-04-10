import {Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer2} from '@angular/core';
import {Observable} from "rxjs/Observable";
let Clipboard = require('clipboard');

@Directive({
  selector: '[appClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
  clipboard = Clipboard;
  timerSub;
  @Input() appClipboard;
  @Output() clipboardSuccess: EventEmitter<any> = new EventEmitter();
  @Output() clipboardError: EventEmitter<any> = new EventEmitter();
  constructor(private eltRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.clipboard = new Clipboard(this.eltRef.nativeElement, {
      text: () => {
        return this.appClipboard;
      }
    });

    this.clipboard.on('success', (e) => {
      this.renderer.addClass( this.eltRef.nativeElement, 'isCopied');
      this.initiateCopiedTimer();
    });

    this.clipboard.on('error', (e) => {
      this.clipboardError.emit();
    });
  }

  initiateCopiedTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    this.timerSub = Observable.timer(2000)
      .take(1)
      .subscribe(() => {
        this.renderer.removeClass( this.eltRef.nativeElement, 'isCopied');
      });
  }
  ngOnDestroy() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }
}
