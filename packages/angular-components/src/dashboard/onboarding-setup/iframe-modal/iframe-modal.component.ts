import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-iframe-modal',
  templateUrl: './iframe-modal.component.html',
  styleUrls: ['./iframe-modal.component.less']
})
export class IframeModalComponent implements OnInit {
  modalId: string = 'iframeModal';
  @Input() pageSrc: string = '';
  constructor() { }

  ngOnInit() {
  }

}
