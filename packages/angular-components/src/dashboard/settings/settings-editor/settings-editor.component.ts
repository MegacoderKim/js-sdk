import {Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-settings-editor',
  templateUrl: './settings-editor.component.html',
  styleUrls: ['./settings-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsEditorComponent implements OnInit {
  @Input() placeholder: string = 'Enter your email';
  @Input() value: string;
  @Output() onSubmit: EventEmitter<string> = new EventEmitter();
  @Input() inputType: string = 'text';
  @Input() label: string;
  editable: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  edit(input, isEditable: boolean = true) {
    this.editable = isEditable;
    if(isEditable) {
      input.focus()
    } else {
      input.blur();
      input.value = this.value;
    }
  }

  submit(input) {
    this.editable = false;
    this.onSubmit.next(input.value);
    input.blur();
  }

}
