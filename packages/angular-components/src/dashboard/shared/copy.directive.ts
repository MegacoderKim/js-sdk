import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
const Clipboard = require('clipboard');
import {SnackbarService} from "./snackbar/snackbar.service";

@Directive({
  selector: '[appCopy]'
})
export class CopyDirective {
  @Input() appCopy: string = '';
  @Input() successMsg: string = '';
  @Output('onSuccess') onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  clipboard;
  constructor(private element: ElementRef, private snackbarService: SnackbarService) { }

  ngAfterViewInit() {
    this.clipboard = new Clipboard(this.element.nativeElement, {
      text: () => this.appCopy
    });
    this.clipboard.on('success', () => {
      this.onSuccess.emit(true);
      if(this.successMsg) this.snackbarService.displaySuccessToast(this.successMsg)
    });
  }

  ngOnDestroy() {
    !!this.clipboard && this.clipboard.destroy();
  }

}
