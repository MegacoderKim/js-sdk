import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
// import "rxjs/add/observable/timer";
import {BroadcastService} from "../../core/broadcast.service";
import {OnboardingService} from "../../core/onboarding.service";
import {InnerSharedModule} from "../../shared/shared.module";
import {AccountUsersService} from "../../account/account-users.service";
import {filter, take} from "rxjs/operators";
import {ISubAccount} from "ht-models";

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.less']
})
export class CodeBlockComponent implements OnInit, OnChanges {
  isCodeUpdated: boolean = false;
  @Input() codeContent;
  @Input() troubleshootLink: string;
  @Input() publishableKey: string;
  @Input() codeBlockKey: string;
  codeSnippets;
  constructor(
    private broadcastService: BroadcastService,
    private onboardingService: OnboardingService,
    private accountsService: AccountUsersService
  ) { }

  ngOnInit() {
    this.fetchAndUpdateCode();
  }

  ngOnChanges() {
    this.fetchAndUpdateCode();
  }

  /**
   * Main driver function to fetch file from GitHub and update the code
   */
  fetchAndUpdateCode() {
    if (!this.codeContent || !this.codeContent.fileURL) return;
    this.onboardingService.getGithubFile(this.codeContent.fileURL).pipe(filter(data => !!data)).subscribe((fileData) => {
      // fileData = JSON.parse( fileData );
      // console.log(fileData);
      let snippets = this.createCodeSnippetsWithData(fileData, this.codeContent.lines);
      this.codeSnippets = snippets;
      this.isCodeUpdated = true;
    });
  }

  /**
   * Splits the code imported from file by line.
   *
   * @param fileData
   * @param lines
   * @returns {any[]}
   */
  createCodeSnippetsWithData(fileData, lines) {
    let fileDataByLine = fileData.split("\n");
    let codeRangeByType = this.createCodeLineRangeByType(fileData, lines);
    let snippets = [];
    codeRangeByType.forEach((range) => {
      let content = "";
      for (let i = range.start; i <= range.end; i++) {
        let line = fileDataByLine[i - 1];
        content += line + "\n";
      }
      snippets.push({
        type: range.type,
        content: this.updateKeysInCode(content)
      });
    });
    return snippets;
  }

  /**
   * Makes folded, copy and code blocks
   * @param fileData
   * @param lines
   * @returns {any[]}
   */
  createCodeLineRangeByType(fileData, lines): any[] {
    let fileDataByLine = fileData.split("\n");
    let newLines = [];
    if (lines.length === 0) {
      newLines.push({
        start: 1,
        end: (fileDataByLine.length),
        type: 'copy'
      });
    } else {
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i], start = line.start;
        if (i === 0) {
          if (start !== 1) {
            newLines.push({
              start: 1,
              end: start - 1,
              type: 'copy'
            });
          }
          newLines.push({...line, type: 'spaced'});
        } else {
          if (start !== lines[i - 1].end + 1) {
            newLines.push({
              start: lines[i - 1].end + 1,
              end: start - 1,
              type: 'copy'
            });
          }
          newLines.push({...line, type: 'spaced'});
        }
      }
      if (fileDataByLine.length !== newLines[newLines.length - 1].end) {
        newLines.push({
          start: newLines[newLines.length - 1].end + 1,
          end: fileDataByLine.length,
          type: 'copy'
        });
      }
    }
    return newLines;
  }

  /**
   * Update TOKENS and KEYS in code
   * @param {string} code
   * @param {string} language
   * @returns {string}
   */
  updateKeysInCode(code: string, language?: string): string {
    let pk = "";
    this.accountsService.getSubAccount().pipe(
      take(1)
    ).subscribe((data: ISubAccount) => {
      if (data) {
        const publicToken = data.tokens.find((token) => {
          return token.scope == 'publishable'
        });
        pk = publicToken.key
      }
    });
    if (!pk) return code;
    let pkValue = `"${pk}"`;
    let pkValueWithoutQuotes = `${pkValue}`;
    if (pkValue) {
      return code
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY_WITHOUT_QUOTES', 'g'), pkValueWithoutQuotes)
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY_HERE', 'g'), pkValue)
        .replace(new RegExp('YOUR_PUBLISHABLE_KEY', 'g'), pkValue)
    }
    return code;
  }

}
