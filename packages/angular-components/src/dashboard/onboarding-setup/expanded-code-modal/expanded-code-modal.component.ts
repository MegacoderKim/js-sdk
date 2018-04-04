import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-expanded-code-modal',
  templateUrl: './expanded-code-modal.component.html',
  styleUrls: ['./expanded-code-modal.component.less']
})
export class ExpandedCodeModalComponent implements OnInit {
  modalId: string = 'codeModal';
  @Input() codeContent = {};
  @Input() publishableKey: string;
  constructor() { }

  ngOnInit() {
  }

}
