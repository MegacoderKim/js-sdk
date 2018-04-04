import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../../core/modal.service";

@Component({
  selector: 'app-mail-developer-modal',
  templateUrl: './mail-developer-modal.component.html',
  styleUrls: ['./mail-developer-modal.component.less']
})
export class MailDeveloperModalComponent implements OnInit {
  modalId: string = 'mailDeveloperModal';
  constructor(
    private modalService: ModalService
  ) { }

  close(checkBlocking = false): void {
    this.modalService.close(this.modalId, checkBlocking);
  }

  ngOnInit() {
  }

}
