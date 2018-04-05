import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";
import {BroadcastService} from "../../../services/broadcast.service";
let ClipboardJS = require('clipboard');
@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.less']
})
export class CodeBlockComponent implements OnInit, AfterViewInit, OnChanges {
  images = {
    fileIcon: require('../../../../assets/images/onboarding/code-file.svg'),
    helpIcon: require('../../../../assets/images/onboarding/helpicon.svg')
  };
  timerSub;
  showCopiedMessage: boolean = false;
  @Input() codeContent;
  @Input() troubleshootLink: string;
  @Input() publishableKey: string;
  @Input() codeBlockKey: string;
  codeElement: string;
  constructor(
    private broadcastService: BroadcastService
  ) { }

  ngOnInit() {
    this.codeElement = this.createCodeElement(this.codeContent.code, this.codeContent.language);
  }

  ngAfterViewInit() {
    let clip = new ClipboardJS(`.${this.codeBlockKey}`, {
      text: () => {
        return this.updateKeysInCode(this.codeContent.code, this.codeContent.language);
      }
    });
    clip.on('success', (e) => {
      this.showCopiedMessage = true;
      this.initiateCopiedTimer();
    });
  }

  openExpandedCodeBlock() {
    if (this.codeContent && this.codeContent.fileURL) {
      this.broadcastService.emit('open-code-modal', this.codeContent);
    }
  }

  isCodeContentChange(previousValue, currentValue) {
    return (!previousValue || (previousValue.code !== currentValue.code) || (previousValue.language !== currentValue.language));
  }

  ngOnChanges(changes) {
    this.codeElement = this.createCodeElement(this.codeContent.code, this.codeContent.language);
  }

  initiateCopiedTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
    this.timerSub = Observable.timer(1000)
      .take(1)
      .subscribe(() => {
        this.showCopiedMessage = false;
      });
  }

  createCodeElement(code, language: string = '') {
    let updatedCode = this.updateKeysInCode(code, language);
    let codeElement = `<pre class="code-pre-container"><code class=${language}><div class="code-wrapper">`;
    codeElement += updatedCode;
    codeElement += `</div></code></pre>`;
    return codeElement;
  }

  updateKeysInCode(code: string, language?: string): string {
    if (!this.publishableKey) return code;
    let pkValue = `"${this.publishableKey}"`;
    let pkValueWithoutQuotes = `${pkValue}`;
    if (pkValue) {
      return code
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY_WITHOUT_QUOTES', 'g'), pkValueWithoutQuotes)
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY_HERE', 'g'), pkValue)
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY', 'g'), pkValue)
    }
    return code;
  }

  openDocsLink(docKey) {
    switch (docKey) {
      case 'ios-install-0':
        window.open("https://docs.hypertrack.com/sdks/ios/setup.html#step-1-install-the-sdk");
        break;
      case 'ios-install-1':
        window.open("https://docs.hypertrack.com/sdks/ios/setup.html#step-2-configure-the-sdk");
        break;
      case 'ios-permissions-0':
        window.open("https://docs.hypertrack.com/sdks/ios/setup.html#configure-location--motion-usage-permissions");
        break;
      case 'ios-tracking-0':
        window.open("https://docs.hypertrack.com/sdks/ios/setup.html#step-4-create-sdk-user");
        break;
    }
  }

}
