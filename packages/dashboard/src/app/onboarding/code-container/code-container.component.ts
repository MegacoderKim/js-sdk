import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-code-container',
  templateUrl: './code-container.component.html',
  styleUrls: ['./code-container.component.less']
})
export class CodeContainerComponent implements OnInit {
  @Input() codes;
  code = "";
  constructor() { }

  ngOnInit() {
  }
}
