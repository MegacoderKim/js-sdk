import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import * as _ from 'underscore';
import {QuickstartService} from "../../core/quickstart.service";
// require("!style-loader!css-loader!../../../../assets/css/external/dracula.css");
declare let hljs: any;
var HighlightJS = hljs;
let ClipboardJS = require('clipboard');
import * as $ from 'jquery';
@Component({
  selector: 'app-expanded-code-block',
  templateUrl: './expanded-code-block.component.html',
  styleUrls: ['./expanded-code-block.component.less']
})
export class ExpandedCodeBlockComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
  blurCode: boolean = true;
  @Input() publishableKey: string;
  isCodeUpdated: boolean = true;
  codeElement: string = '';
  codeSnippets;
  @Input() codeContent;
  constructor(
    private onboardingService: QuickstartService
  ) { }

  ngOnInit() {
    this.fetchAndUpdateCode();
  }

  ngOnChanges() {
    this.fetchAndUpdateCode();
  }

  fetchAndUpdateCode() {
    if (!this.codeContent || !this.codeContent.fileURL) return;
    this.onboardingService.getGithubFile(this.codeContent.fileURL).filter(data => !!data).subscribe((fileData) => {
      let snippets = this.createCodeSnippetsWithData(fileData.data, this.codeContent.copyLines);
      this.codeSnippets = snippets;
      this.codeElement = this.createCodeElement(snippets, this.codeContent.language);
      this.isCodeUpdated = true;
    });
  }

  createCodeSnippetsWithData(fileData, copyLines) {
    let fileDataByLine = fileData.split("\n");
    let codeRangeByType = this.createCodeLineRangeByType(fileData, copyLines);
    let snippets = [];
    codeRangeByType.forEach((range) => {
      let content = "";
      for (let i = range.start; i <= range.end; i++) {
        let line = fileDataByLine[i - 1];
        content += line + "\n";
      }
      snippets.push({
        type: range.type,
        content: content
      });
    });
    return snippets;
  }

  createCodeLineRangeByType(fileData, copyLines): any[] {
    let fileDataByLine = fileData.split("\n");
    let newLines = [];
    if (copyLines.length === 0) {
      newLines.push({
        start: 1,
        end: (fileDataByLine.length),
        type: 'spaced'
      });
    } else {
      for (let i = 0; i < copyLines.length; i++) {
        let line = copyLines[i], start = line.start;
        if (i === 0) {
          if (start !== 1) {
            newLines.push({
              start: 1,
              end: start - 1,
              type: 'spaced'
            });
          }
          newLines.push({...line, type: 'copy'});
        } else {
          if (start !== copyLines[i - 1].end + 1) {
            newLines.push({
              start: copyLines[i - 1].end + 1,
              end: start - 1,
              type: 'spaced'
            });
          }
          newLines.push({...line, type: 'copy'});
        }
      }
      if (fileDataByLine.length !== newLines[newLines.length - 1].end) {
        newLines.push({
          start: newLines[newLines.length - 1].end + 1,
          end: fileDataByLine.length,
          type: 'spaced'
        });
      }
    }
    return newLines;
  }

  updateKeysInCode(code: string, publishableKey: string = this.publishableKey): string {
    if (!publishableKey) return code;
    let pkValue = `"${publishableKey}"`;
    let pkValueWithoutQuotes = `${pkValue}`;
    if (pkValue) {
      return code
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY_WITHOUT_QUOTES', 'g'), pkValueWithoutQuotes)
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY_HERE', 'g'), pkValue)
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY', 'g'), pkValue)
    }
    return code;
  }

  toggleBlurCode() {
    this.blurCode = !this.blurCode;
    $('.spaced').toggleClass('blur');
  }

  createCodeElement(snippets, language: string, isDummy: boolean = false) {
    let codeElement = `<pre class="code-pre-container"><code class=${language}><div class="code-wrapper">`;
    snippets.forEach((code, index) => {
      if (code.type === 'spaced') {
        codeElement += this.createSpacedCodeElement(code.content, index, isDummy);
      } else {
        codeElement += this.createCopyCodeElement(code.content, index);
      }
    });
    codeElement += `</div></code></pre>`;
    return codeElement;
  }

  createCopyCodeElement(code: string, index: number): string {
    let escapedCode = this.updateKeysInCode(_.escape(code));
    return `<div aria-label="Click to Copy" class="copyMe code-content" data-snippet-index="${index}"><a>${escapedCode}</a></div>`
  }

  createSpacedCodeElement(code: string, index: number, isDummy: boolean = false): string {
    let coreClass = isDummy ? 'dummy' : '';
    let escapedCode = this.updateKeysInCode(_.escape(code));
    return `<div class="spaced code-content blur ${coreClass}" data-snippet-index="${index}">${escapedCode}</div>`
  }

  runCodeHighlighting() {
    var aCodes = document.getElementsByClassName('code-pre-container');
    for (var i=0; i < aCodes.length; i++) {
      HighlightJS.highlightBlock(aCodes[i]);
    }
    let clip = new ClipboardJS('.copyMe', {
      text: (trigger) => {
        let index = trigger.getAttribute('data-snippet-index');
        let codeSnippets = this.codeSnippets;
        return this.updateKeysInCode(_.escape(codeSnippets[index].content));
      }
    });
    clip.on('success', function(e) {
      $(e.trigger).attr('aria-label', 'Copied!');
      e.clearSelection();
    });
    $('.copyMe').mouseleave(() => {
      $('.copyMe').attr('aria-label', 'Click to Copy');
    });
  }

  ngAfterViewInit() {
    this.runCodeHighlighting();
  }

  ngAfterViewChecked() {
    if (this.isCodeUpdated) {
      this.runCodeHighlighting();
      this.isCodeUpdated = false;
    }
  }
}
