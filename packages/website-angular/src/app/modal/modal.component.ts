import {Component, HostListener, Input, OnInit} from '@angular/core';
import {ModalService} from "../services/modal.service";
import {ActivatedRoute, Router} from "@angular/router";

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
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.modalService.registerModal(this);
  }

  close(checkBlocking = false): void {
    this.router.navigate(['./'], {queryParams: {plan: null}, relativeTo: this.route});
    this.modalService.close(this.modalId, checkBlocking);
  }

  private keyup(event: KeyboardEvent): void {
    if (event && event.keyCode === 27) {
      this.modalService.close(this.modalId, true);
    }
  }

}
