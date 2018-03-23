import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from "../core/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit {
  @Input() modalId: string;
  @Input() blocking = false;
  @Input() modalType: string = 'default';
  isOpen = false;

  @HostListener('keyup', ['$event']) onMouseEnter(event) {
    this.keyup(event);
  }
  @HostListener('document:keyup.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.keyup(event);
  }
  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
  }

  private keyup(event: KeyboardEvent): void {
    if (event && event.keyCode === 27) {
      this.modalService.close(this.modalId, true);
    }
  }

}
