import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-integration-overview',
  templateUrl: './integration-overview.component.html',
  styleUrls: ['./integration-overview.component.less']
})
export class IntegrationOverviewComponent implements OnInit {
  @Input() steps = [];
  @Input() currentState;
  @Input() platform;
  @Input() showPlatformPicker: boolean = false;
  @Input() overviewImage;
  @Output() startIntegration: EventEmitter<null> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }

  openMailToDeveloper() {
    $("#mail-to-developer").modal();
  }

  onStartIntegration() {
    this.startIntegration.emit();
  }

}
